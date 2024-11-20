import { filterSize } from './filters/size'

const trs = document.querySelectorAll<HTMLTableRowElement>(
  'table.torrent-list tr',
)

Array.from(trs)
  .filter((tr) => !filterSize(tr, { min: 1024 }))
  .forEach((tr) => {
    tr.style.opacity = '0.5'
  })
