import type { BlockElement, BlockLocation, BlockType } from '../types'

const BLOCK_TAGS = new Set([
  'div', 'section', 'article', 'header', 'footer', 'main', 'aside', 'nav',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'blockquote', 'pre',
  'ul', 'ol', 'li', 'dl', 'dt', 'dd', 'table', 'thead', 'tbody', 'tr', 'td', 'th',
  'form', 'fieldset', 'legend', 'button', 'img', 'figure', 'figcaption'
])

export function parseSourceLocation(locAttr: string | null): BlockLocation | null {
  if (!locAttr) return null
  
  const parts = locAttr.split(',').map(s => parseInt(s.trim(), 10))
  if (parts.length !== 4 || parts.some(isNaN)) return null
  
  return {
    startLine: parts[0],
    startCol: parts[1],
    endLine: parts[2],
    endCol: parts[3]
  }
}

export function injectSourceCoordinates(html: string): string {
  const lines = html.split('\n')
  let result = ''
  let lineNumber = 1
  
  for (const line of lines) {
    let modifiedLine = line
    let columnOffset = 0
    
    // Find all opening tags in this line
    const tagRegex = /<(\w+)([^>]*)>/g
    let match
    
    while ((match = tagRegex.exec(line)) !== null) {
      const tagName = match[1].toLowerCase()
      if (BLOCK_TAGS.has(tagName)) {
        const startCol = match.index + 1 + columnOffset
        const endCol = startCol + match[0].length - 1
        
        // Inject data-source-loc attribute
        const locAttr = `data-source-loc="${lineNumber},${startCol},${lineNumber},${endCol}"`
        const insertPos = match.index + match[1].length + 1 + columnOffset
        
        modifiedLine = 
          modifiedLine.slice(0, insertPos) + 
          ` ${locAttr}` + 
          modifiedLine.slice(insertPos)
        
        columnOffset += locAttr.length + 1
      }
    }
    
    result += modifiedLine + '\n'
    lineNumber++
  }
  
  return result.slice(0, -1) // Remove last newline
}

export function extractBlockElements(html: string): BlockElement[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const blocks: BlockElement[] = []
  
  function traverseElement(element: Element): void {
    const tagName = element.tagName.toLowerCase()
    
    if (BLOCK_TAGS.has(tagName)) {
      const locAttr = element.getAttribute('data-source-loc')
      const location = parseSourceLocation(locAttr)
      
      if (location) {
        const blockType = getBlockType(tagName)
        const attributes: Record<string, string> = {}
        const styles: Record<string, string> = {}
        
        // Extract attributes
        for (let i = 0; i < element.attributes.length; i++) {
          const attr = element.attributes[i]
          if (attr.name !== 'data-source-loc') {
            attributes[attr.name] = attr.value
          }
        }
        
        // Extract inline styles
        if (element.getAttribute('style')) {
          const styleText = element.getAttribute('style') || ''
          const styleRules = styleText.split(';').filter(rule => rule.trim())
          
          for (const rule of styleRules) {
            const [property, value] = rule.split(':').map(s => s.trim())
            if (property && value) {
              styles[property] = value
            }
          }
        }
        
        blocks.push({
          id: `block-${blocks.length}-${Date.now()}`,
          type: blockType,
          tagName,
          content: element.innerHTML,
          attributes,
          styles,
          location
        })
      }
    }
    
    // Traverse child elements
    for (let i = 0; i < element.children.length; i++) {
      traverseElement(element.children[i])
    }
  }
  
  traverseElement(doc.body)
  return blocks
}

function getBlockType(tagName: string): BlockType {
  switch (tagName) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return 'heading'
    case 'p':
      return 'paragraph'
    case 'img':
      return 'image'
    case 'button':
      return 'button'
    case 'a':
      return 'link'
    case 'ul':
    case 'ol':
    case 'li':
      return 'list'
    case 'table':
    case 'tr':
    case 'td':
    case 'th':
      return 'table'
    case 'span':
      return 'span'
    case 'section':
      return 'section'
    case 'article':
      return 'article'
    default:
      return 'div'
  }
}

export function getContentRangeAtLocation(
  html: string, 
  location: BlockLocation
): { content: string; startLine: number; endLine: number; startCol: number; endCol: number } | null {
  const lines = html.split('\n')
  
  if (location.startLine > lines.length || location.endLine > lines.length) {
    return null
  }
  
  let content = ''
  
  if (location.startLine === location.endLine) {
    const line = lines[location.startLine - 1]
    content = line.slice(location.startCol - 1, location.endCol)
  } else {
    for (let i = location.startLine - 1; i <= location.endLine - 1; i++) {
      const line = lines[i]
      
      if (i === location.startLine - 1) {
        content += line.slice(location.startCol - 1) + '\n'
      } else if (i === location.endLine - 1) {
        content += line.slice(0, location.endCol)
      } else {
        content += line + '\n'
      }
    }
  }
  
  return {
    content: content.trim(),
    startLine: location.startLine,
    endLine: location.endLine,
    startCol: location.startCol,
    endCol: location.endCol
  }
}

export function replaceContentAtLocation(
  html: string,
  location: BlockLocation,
  newContent: string
): string {
  const lines = html.split('\n')
  
  if (location.startLine > lines.length || location.endLine > lines.length) {
    return html
  }
  
  const result = [...lines]
  
  if (location.startLine === location.endLine) {
    const line = result[location.startLine - 1]
    result[location.startLine - 1] = 
      line.slice(0, location.startCol - 1) + 
      newContent + 
      line.slice(location.endCol)
  } else {
    const firstLine = result[location.startLine - 1]
    const lastLine = result[location.endLine - 1]
    
    result[location.startLine - 1] = 
      firstLine.slice(0, location.startCol - 1) + 
      newContent + 
      lastLine.slice(location.endCol)
    
    // Remove lines in between
    result.splice(location.startLine, location.endLine - location.startLine)
  }
  
  return result.join('\n')
}
