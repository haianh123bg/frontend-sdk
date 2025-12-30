export type FileMeta = {
  name: string
  size: number
  type: string
  lastModified: number
}

export function toFileMeta(file: File): FileMeta {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
  }
}
