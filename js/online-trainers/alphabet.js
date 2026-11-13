const topLetters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й',
	'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф',
	'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я']
const bottomLetters = ['Л', 'П', 'О']

const alphabetEl = document.querySelector('.alphabet')
const lettersEl = document.querySelector('.letters')
const firstEl = document.querySelector('.letters .first')
const secondEl = document.querySelector('.letters .second')
const speedEl = document.getElementById('speed');

let timer = null
let speed = 0.5
start()

speedEl.addEventListener('input', e => {
	speed = +e.target.value || 0
	start()
})

function start() {
	clearInterval(timer)
	timer = null

	if (speed != 0) {
		timer = setInterval(() => {
			firstEl.innerHTML = topLetters[Math.round(Math.random() * (topLetters.length - 1))]
			secondEl.innerHTML = bottomLetters[Math.round(Math.random() * (bottomLetters.length - 1))]
			const w = alphabetEl.clientWidth - 25
			const h = alphabetEl.clientHeight - 75
			lettersEl.style.left = Math.random() * w + 'px'
			lettersEl.style.top = Math.random() * h + 'px'

		}, speed * 1000)
	}
}