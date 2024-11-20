export type FileSize = number | undefined

interface Options {
  /**
   * Minimum file size in MB.
   */
  min?: FileSize
  /**
   * Maximum file size in MB.
   */
  max?: FileSize
}

export function filterFileSize(tr: HTMLTableRowElement, options: Options) {
  const td = tr.querySelector<HTMLTableCellElement>('td:nth-child(4)')
  if (!td) return
  const filesize = td.textContent?.trim()
  if (!filesize) return

  const parsedFileSize = parseFileSize(filesize)

  return (
    (options.min === undefined || parsedFileSize >= options.min) &&
    (options.max === undefined || parsedFileSize <= options.max)
  )
}

/**
 * Parse file size from in format `value unit`.
 * @example
 * ```ts
 * parseFileSize('1.2 GiB') // 1.2 * 1024
 * parseFileSize('392.8 MiB') // 392.8
 * ```
 */
function parseFileSize(str: string) {
  const [value, unit] = str.split(' ')
  return parseFloat(value) * (unit === 'GiB' ? 1024 : 1)
}
