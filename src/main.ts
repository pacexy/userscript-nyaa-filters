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

  const minInput = document.createElement('input')
  minInput.type = 'number'
  minInput.placeholder = 'min'
  minInput.value = GM_getValue('filesize.min', '')
  root.appendChild(minInput)

  const maxInput = document.createElement('input')
  maxInput.type = 'number'
  maxInput.placeholder = 'max'
  maxInput.value = GM_getValue('filesize.max', '')
  root.appendChild(maxInput)

  const onInput = () => {
    const min = parseFloat(minInput.value) || undefined
    const max = parseFloat(maxInput.value) || undefined

    GM_setValue('filesize.min', minInput.value)
    GM_setValue('filesize.max', maxInput.value)

    Array.from(trs).forEach((tr) => {
      if (filterFileSize(tr, { min, max })) {
        tr.style.opacity = ''
      } else {
        tr.style.opacity = '0.5'
      }
    })
  }

  minInput.addEventListener('input', onInput)
  maxInput.addEventListener('input', onInput)

  // Initial filter on load
  onInput()
}
