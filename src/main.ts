import { parse } from 'anitomy'

const trs = document.querySelectorAll<HTMLTableRowElement>(
  'table.torrent-list tr',
)

trs.forEach((tr) => {
  const a = tr.querySelector<HTMLAnchorElement>('td:nth-child(2) a:last-child')
  if (!a) return
  const title = a.title
  if (!title) return

  const result = parse(title)
  console.log(result)
  if (result && result.episode.number !== undefined) {
    tr.style.opacity = '0.5'
  }
})
