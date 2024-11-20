import { GM_getValue, GM_setValue } from '$'
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

  const minInput = createFileSizeInput('min')
  root.appendChild(minInput)

  const maxInput = createFileSizeInput('max')
  root.appendChild(maxInput)

  // init update on load
  update()
}

function update() {
  const min = GM_getValue('filesize.min') as any
  const max = GM_getValue('filesize.max') as any

  Array.from(trs).forEach((tr) => {
    if (filterFileSize(tr, { min, max })) {
      tr.style.opacity = ''
    } else {
      tr.style.opacity = '0.5'
    }
  })
}

function createFileSizeInput(key: 'min' | 'max') {
  const input = document.createElement('input')
  input.type = 'number'
  input.placeholder = key
  input.value = GM_getValue(`filesize.${key}`)
  input.addEventListener('input', () => {
    GM_setValue(`filesize.${key}`, parseFloat(input.value))
    update()
  })
  return input
}
