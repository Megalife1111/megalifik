const texts = [
	'Настройте скорость и способ исчезновения',
	'Однако, из-за своей неоправданной сложности (по тем временам) они не находили применения в технике относительно долгое время.',
	'DPC коды —&nbsp;идея довольно старая, впервые они были описаны Робертом Галлагером ещё в 1963&nbsp;г. в его работе на степень PhD.'
]

const textsEl = document.getElementById('texts')
const textEl = document.querySelector('.text')
const disappearanceEl = document.getElementsByName('disappearance')
const speedEl = document.getElementById('speed');

let timer = null

let textNum = 0
let text = texts[0]
let words = text.split(' ')
let i = 0
let speed = 0.5

textsEl.addEventListener('change', e => {
	textNum = +e.target.value
	text = texts[textNum]
	words = text.split(' ')
	textEl.innerHTML = words.map(word => `<span>${word}</span>`).join(' ')
	i = 0
	start()
})

disappearanceEl.forEach(el => el.addEventListener('change', e => {
	if (e.target.checked) {
		if (e.target.value == 1) {
			textEl.classList.remove('shading')
		} else {
			textEl.classList.add('shading')
		}
	}
}))

speedEl.addEventListener('input', e => {
	speed = +e.target.value || 0
	start()
})

function start() {
	clearInterval(timer)
	timer = null

	if (textNum != 0 && speed != 0) {
		timer = setInterval(() => {
			if (i < words.length) {
				document.querySelector(`.text span:nth-child(${++i})`).classList.add('hid')
			} else {
				clearInterval(timer)
				timer = null
				i = 0
			}
		}, speed * 1000)
	}
}