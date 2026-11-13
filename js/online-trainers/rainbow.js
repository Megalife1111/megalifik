const words = ['красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый', 'прыжок', 'хлопок']
const colors = ['#e53935', '#ff6d00', '#ffd600', '#00c853', '#0091ea', '#304ffe', '#aa00ff']

const colorsEl = document.querySelector('.colors')
const colorEl = document.querySelector('.color')
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
			colorEl.innerHTML = words[Math.round(Math.random() * (words.length - 1))]
			colorEl.style.background = colors[Math.round(Math.random() * (colors.length - 1))]
			const w = colorsEl.clientWidth - colorEl.clientWidth
			const h = colorsEl.clientHeight - colorEl.clientHeight
			colorEl.style.left = Math.random() * w + 'px'
			colorEl.style.top = Math.random() * h + 'px'
		}, speed * 1000)
	}
}