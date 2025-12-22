import type { BlockLocation } from '../types'
import { parseSourceLocation, replaceContentAtLocation } from './htmlParser'

export function findBlockByLocation(html: string, location: BlockLocation): HTMLElement | null {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  
  const elements = doc.querySelectorAll('[data-source-loc]')
  
  for (const element of elements) {
    const locAttr = element.getAttribute('data-source-loc')
    const elementLocation = parseSourceLocation(locAttr)
    
    if (elementLocation && 
        elementLocation.startLine === location.startLine &&
        elementLocation.startCol === location.startCol &&
        elementLocation.endLine === location.endLine &&
        elementLocation.endCol === location.endCol) {
      return element as HTMLElement
    }
  }
  
  return null
}

export function getOuterHtmlRangeAtLocation(
  html: string,
  location: BlockLocation
): { outerHtml: string; tagName: string; startLine: number; endLine: number; startCol: number; endCol: number } | null {
  const lines = html.split('\n')
  
  if (location.startLine > lines.length) {
    return null
  }
  
  const startLine = lines[location.startLine - 1]
  const tagMatch = startLine.slice(location.startCol - 1).match(/^<(\w+)[^>]*>/)
  
  if (!tagMatch) return null
  
  const tagName = tagMatch[1].toLowerCase()
  const openTag = tagMatch[0]
  
  // Find the matching closing tag
  let depth = 1
  let currentLine = location.startLine - 1
  let currentPos = location.startCol - 1 + openTag.length
  let content = openTag
  
  while (depth > 0 && currentLine < lines.length) {
    const line = lines[currentLine]
    
    while (currentPos < line.length && depth > 0) {
      const remaining = line.slice(currentPos)
      
      // Look for opening tags
      const openMatch = remaining.match(/^<(\w+)[^>]*>/)
      if (openMatch && openMatch[1].toLowerCase() === tagName) {
        depth++
        content += openMatch[0]
        currentPos += openMatch[0].length
        continue
      }
      
      // Look for closing tags
      const closeMatch = remaining.match(/^<\/(\w+)>/)
      if (closeMatch && closeMatch[1].toLowerCase() === tagName) {
        depth--
        content += closeMatch[0]
        currentPos += closeMatch[0].length
        
        if (depth === 0) {
          return {
            outerHtml: content,
            tagName,
            startLine: location.startLine,
            endLine: currentLine + 1,
            startCol: location.startCol,
            endCol: currentPos
          }
        }
        continue
      }
      
      content += remaining[0]
      currentPos++
    }
    
    if (depth > 0) {
      currentLine++
      currentPos = 0
      if (currentLine < lines.length) {
        content += '\n'
      }
    }
  }
  
  return null
}

export function replaceOuterHtmlAtLocation(
  html: string,
  location: BlockLocation,
  newHtml: string
): string {
  const outerRange = getOuterHtmlRangeAtLocation(html, location)
  if (!outerRange) return html
  
  return replaceContentAtLocation(html, {
    startLine: outerRange.startLine,
    startCol: outerRange.startCol,
    endLine: outerRange.endLine,
    endCol: outerRange.endCol
  }, newHtml)
}

export function insertOuterHtmlAfterLocation(
  html: string,
  location: BlockLocation,
  newHtml: string
): string {
  const outerRange = getOuterHtmlRangeAtLocation(html, location)
  if (!outerRange) return html
  
  const lines = html.split('\n')
  const result = [...lines]
  
  const insertLine = outerRange.endLine - 1
  const insertCol = outerRange.endCol
  
  if (insertLine < result.length) {
    const line = result[insertLine]
    result[insertLine] = line.slice(0, insertCol) + newHtml + line.slice(insertCol)
  }
  
  return result.join('\n')
}

export function removeOuterHtmlAtLocation(
  html: string,
  location: BlockLocation
): string {
  const outerRange = getOuterHtmlRangeAtLocation(html, location)
  if (!outerRange) return html
  
  return replaceContentAtLocation(html, {
    startLine: outerRange.startLine,
    startCol: outerRange.startCol,
    endLine: outerRange.endLine,
    endCol: outerRange.endCol
  }, '')
}

export function setTagStylePropertyAtLocation(
  html: string,
  location: BlockLocation,
  options: { propertyName: string; propertyValue: string }
): string {
  const outerRange = getOuterHtmlRangeAtLocation(html, location)
  if (!outerRange) return html
  
  const { propertyName, propertyValue } = options
  
  // Parse the opening tag
  const openTagMatch = outerRange.outerHtml.match(/^<(\w+)([^>]*)>/)
  if (!openTagMatch) return html
  
  const tagName = openTagMatch[1]
  const attributes = openTagMatch[2]
  
  // Extract existing style attribute
  const styleMatch = attributes.match(/\s+style\s*=\s*["']([^"']*)["']/)
  let existingStyles = styleMatch ? styleMatch[1] : ''
  
  // Parse existing styles
  const styleRules = new Map<string, string>()
  if (existingStyles) {
    const rules = existingStyles.split(';').filter(rule => rule.trim())
    for (const rule of rules) {
      const [prop, value] = rule.split(':').map(s => s.trim())
      if (prop && value) {
        styleRules.set(prop, value)
      }
    }
  }
  
  // Update the property
  styleRules.set(propertyName, propertyValue)
  
  // Rebuild style string
  const newStyleValue = Array.from(styleRules.entries())
    .map(([prop, value]) => `${prop}: ${value}`)
    .join('; ')
  
  // Rebuild the opening tag
  let newAttributes = attributes
  if (styleMatch) {
    newAttributes = attributes.replace(styleMatch[0], ` style="${newStyleValue}"`)
  } else {
    newAttributes += ` style="${newStyleValue}"`
  }
  
  const newOpenTag = `<${tagName}${newAttributes}>`
  const newOuterHtml = outerRange.outerHtml.replace(openTagMatch[0], newOpenTag)
  
  return replaceOuterHtmlAtLocation(html, location, newOuterHtml)
}

export function setImageSrcAtLocation(
  html: string,
  location: BlockLocation,
  newSrc: string
): string {
  const outerRange = getOuterHtmlRangeAtLocation(html, location)
  if (!outerRange) return html
  
  const imgMatch = outerRange.outerHtml.match(/^<img([^>]*)>/)
  if (!imgMatch) return html
  
  const attributes = imgMatch[1]
  const srcMatch = attributes.match(/\s+src\s*=\s*["']([^"']*)["']/)
  
  let newAttributes = attributes
  if (srcMatch) {
    newAttributes = attributes.replace(srcMatch[0], ` src="${newSrc}"`)
  } else {
    newAttributes += ` src="${newSrc}"`
  }
  
  const newImgTag = `<img${newAttributes}>`
  
  return replaceOuterHtmlAtLocation(html, location, newImgTag)
}

export function duplicateBlockAtLocation(
  html: string,
  location: BlockLocation
): string {
  const outerRange = getOuterHtmlRangeAtLocation(html, location)
  if (!outerRange) return html
  
  return insertOuterHtmlAfterLocation(html, location, outerRange.outerHtml)
}

export function moveBlockUp(
  html: string,
  location: BlockLocation
): string {
  // Implementation for moving block up in the DOM structure
  // This is a simplified version - in a real implementation you'd need more sophisticated logic
  const outerRange = getOuterHtmlRangeAtLocation(html, location)
  if (!outerRange) return html
  
  // Find the previous sibling block and swap positions
  // This is a placeholder implementation
  return html
}

export function moveBlockDown(
  html: string,
  location: BlockLocation
): string {
  // Implementation for moving block down in the DOM structure
  // This is a simplified version - in a real implementation you'd need more sophisticated logic
  const outerRange = getOuterHtmlRangeAtLocation(html, location)
  if (!outerRange) return html
  
  // Find the next sibling block and swap positions
  // This is a placeholder implementation
  return html
}
