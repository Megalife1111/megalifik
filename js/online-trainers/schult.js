const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]

const tableEl = document.querySelector('.table')
const cellsEl = document.querySelectorAll('.cell')
const startEl = document.querySelector('.start')
const timeContEl = document.querySelector('.time')
const timeEl = document.querySelector('.time span')
const resultsEl = document.querySelector('.results')
const checkEl = document.querySelector('.check')

let currentNumber = 26

let time = 0
let timer = null

tableEl.addEventListener('click', e => {
	if (e.target.classList.contains('cell')) {
		if (+e.target.innerHTML === currentNumber) {
			e.target.classList.add('act')
			currentNumber++
			if (currentNumber > 25) {
				startEl.classList.remove('hid')
				clearInterval(timer)
				timer = null

				let date = new Date()

				let day = date.getDate()
				if (day < 10) day = '0' + day.toString()
				let month = date.getMonth() + 1
				if (month < 10) month = '0' + month.toString()
				let year = date.getFullYear()

				let hours = date.getHours()
				if (hours < 10) hours = '0' + hours.toString()
				let minutes = date.getMinutes()
				if (minutes < 10) minutes = '0' + minutes.toString()
				let seconds = date.getSeconds()
				if (seconds < 10) seconds = '0' + seconds.toString()

				resultsEl.innerHTML = `<div>${day}.${month}.${year}, ${hours}:${minutes}:${seconds} – ${Math.round(time) / 10} сек.</div>${resultsEl.innerHTML}`
				checkEl.classList.remove('hid')
				$(`.send`).prop('disabled', false)
			}
		}
	}
})

startEl.addEventListener('click', e => {
	const random = numbers.sort((a, b) => Math.random() - 0.5)
	cellsEl.forEach((cellEl, i) => {
		cellEl.classList.remove('act')
		cellEl.innerHTML = random[i]
	})
	currentNumber = 1
	startEl.classList.add('hid')

	timeContEl.classList.remove('hid')
	time = 0
	let currentTime = Date.now()

	timer = setInterval(() => {
		time += (Date.now() - currentTime) / 100
		currentTime = Date.now()
		timeEl.innerHTML = Math.round(time) / 10
	}, 100)
})


$(`.send`).on('click', function (e) {
	const title = 'Таблицы Шульте 5х5'
	let name = nameInput.value
	let surname = surnameInput.value
	let result = (Math.round(time) / 10) + ' сек.'
	if (!name) {
		alert('Введите имя')
	} else if (!surname) {
		alert('Введите фамилию')
	} else {
		sendAjaxForm('/send_test.php', { title, name, surname, result }, $(this))
	}
});