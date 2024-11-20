import { filterFileSize } from './filters/file-size'
import './main.css'

const trs = document.querySelectorAll<HTMLTableRowElement>(
  'table.torrent-list tr',
)

const container = document.querySelector<HTMLDivElement>('body > div.container')

if (container) {
  const root = document.createElement('div')
  root.id = 'nyaa-filters'
  container.prepend(root)

  const label = document.createElement('label')
  label.textContent = 'File Size:'
  root.appendChild(label)

  const minInput = document.createElement('input')
  minInput.type = 'number'
  minInput.placeholder = 'min'
  root.appendChild(minInput)

  const maxInput = document.createElement('input')
  maxInput.type = 'number'
  maxInput.placeholder = 'max'
  root.appendChild(maxInput)

  const onInput = () => {
    const min = parseFloat(minInput.value) || undefined
    const max = parseFloat(maxInput.value) || undefined

    Array.from(trs)
      .filter((tr) => !filterFileSize(tr, { min, max }))
      .forEach((tr) => {
        tr.style.opacity = '0.5'
      })
  }

  minInput.addEventListener('input', onInput)
  maxInput.addEventListener('input', onInput)
}
