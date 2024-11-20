interface Options {
  /**
   * Minimum size in MB.
   */
  min?: number
  /**
   * Maximum size in MB.
   */
  max?: number
}

export function filterSize(tr: HTMLTableRowElement, options: Options) {
  const td = tr.querySelector<HTMLTableCellElement>('td:nth-child(4)')
  if (!td) return
  const size = td.textContent?.trim()
  if (!size) return

  const parsedSize = parseSize(size)

  return (
    (options.min === undefined || parsedSize >= options.min) &&
    (options.max === undefined || parsedSize <= options.max)
  )
}

/**
 * Parse size from in format `value unit`.
 * @example
 * ```ts
 * parseSize('1.2 GiB') // 1.2 * 1024
 * parseSize('392.8 MiB	') // 392.8
 * ```
 */
function parseSize(str: string) {
  const [value, unit] = str.split(' ')
  return parseFloat(value) * (unit === 'GiB' ? 1024 : 1)
}
