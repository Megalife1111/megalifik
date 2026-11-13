$(document).ready(function () {
	const title = 'Домашние задание 3 Английский'
	//-----2------
	let attempt1 = 0;
	let res2 = ''
	var canv1 = document.getElementById("c1");
	draw_test(canv1, "/img/correlate9.png", 2, 0.19);
	$('.test2 .restart').on('click', function () {
		$('.test2 input').val("");
	});
	$('.test2 .verify').on('click', function (e) {
		attempt1++;
		if (
			$('.test2 .inp1').val().toLowerCase() == 'notebook' &&
			$('.test2 .inp2').val().toLowerCase() == 'scissors' &&
			$('.test2 .inp3').val().toLowerCase() == 'ruler' &&
			$('.test2 .inp4').val().toLowerCase() == 'luge' &&
			$('.test2 .inp5').val().toLowerCase() == 'ruber'
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
		let file = canv1.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 2', title, name, surname, result, file }, $(this))
		}
	});
	//-----3------
	var canv2 = document.getElementById("c2");
	draw_test(canv2, "/img/correlate15.png", 3, 0.77);
	$(`.test3 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv2.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 3', title, name, surname, file }, $(this))
		}
	});
});