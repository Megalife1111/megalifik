const words = [
	['кот', 'кит', 'ток', 'рот'],
	['Под окном растут цветы.', 'Собака грызёт кость.', 'Завтра будет сильный ветер.', 'Лена читает книгу.']
]

const lavelEl = document.getElementById('lavel')
const wordEl = document.querySelector('.word')
const randomEl = document.getElementById('random')
const speedEl = document.getElementById('speed');

let timer = null

let random = 0

let wordsNum = 0
let currentWords = words[0]
wordEl.innerHTML = currentWords[0]
let i = 0
let speed = 0.5
start()

lavelEl.addEventListener('change', e => {
	wordsNum = +e.target.value
	currentWords = words[wordsNum]
	wordEl.innerHTML = currentWords[0]
	i = 0
	start()
})

randomEl.addEventListener('change', e => {
	if (randomEl.checked) {
		random = 1
	} else {
		random = 0
	}
	i = 0
	start()
})

speedEl.addEventListener('input', e => {
	speed = +e.target.value || 0
	start()
})

function start() {
	clearInterval(timer)
	timer = null

	if (speed != 0) {
		timer = setInterval(() => {
			if (random) {
				const cat = Math.round(Math.random() * (words.length - 1))
				const num = Math.round(Math.random() * (words[cat].length - 1))
				wordEl.innerHTML = words[cat][num]
			} else {
				if (i < currentWords.length - 1) {
					i++
				} else {
					i = 0
				}
				wordEl.innerHTML = currentWords[i]
			}
		}, speed * 1000)
	}
}