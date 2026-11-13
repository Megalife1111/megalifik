$(document).ready(function () {
	const title = 'Домашние задание 11 Английский'
	//-----2------
	let attempt1 = 0;
	let res2 = ''
	$('.test2 .restart').on('click', function () {
		$('.test2 input').val("");
		$('.test2 .result').html("");
		$('.test2 .phrase').html("");
	});
	$('.test2 .verify').on('click', function (e) {
		attempt1++;
		if (
			$('.test2 .inp1').val().toLowerCase() == 'bear' &&
			$('.test2 .inp2').val().toLowerCase() == 'giraffe' &&
			$('.test2 .inp3').val().toLowerCase() == 'panda' &&
			$('.test2 .inp4').val().toLowerCase() == 'lion' &&
			$('.test2 .inp5').val().toLowerCase() == 'wolf' &&
			$('.test2 .inp6').val().toLowerCase() == 'fox' &&
			$('.test2 .inp7').val().toLowerCase() == 'rabbit' &&
			$('.test2 .inp8').val().toLowerCase() == 'elephant'
		) {
			$('.test2 .result').html("Молодец! Всё верно!");
			$('.test2 .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
			res2 = 'верно'
		} else {
			$('.test2 .result').html("Ты где-то ошибся. Присмотрись повнимательнее!");
			$('.test2 .phrase').html(phrase2[Math.floor(Math.random() * phrase2.length)]);
			res2 = 'неверно'
		}
	});
	$(`.test2 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = 'Попыток: 0'
		if (res2) {
			result = `Попыток: ${attempt1}%0AРезультат: ${res2}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 2', title, name, surname, result }, $(this))
		}
	});
});