$(document).ready(function () {
	const title = 'Домашние задание 12 Английский'
	//-----6------
	var canv1 = document.getElementById("c1");
	draw_test(canv1, "/img/grid25.png", 1, 0.68, 0.9);
	$(`.test1 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = $('.test1 .inp1').val()
		let file = canv1.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 1', title, name, surname, result, file }, $(this))
		}
	});
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
			$('.test2 .inp1').val().toLowerCase() == 'teacher' &&
			$('.test2 .inp2').val().toLowerCase() == 'policeman' &&
			$('.test2 .inp3').val().toLowerCase() == 'doctor' &&
			$('.test2 .inp4').val().toLowerCase() == 'scientist'
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