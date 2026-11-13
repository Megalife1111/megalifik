$(document).ready(function () {
	const title = 'Домашние задание 4 МегаЧтиВо'
	//-----6------
	var canv1 = document.getElementById("c1");
	draw_test(canv1, "/img/fileword27.png", 6, 0.72);
	$(`.test6 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv1.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 6', title, name, surname, file }, $(this))
		}
	});
	//----------8--------------
	text_by_example(8, title);
	//----------10--------------
	var attempt1 = 0;
	let res10 = ''
	$('.test10 .restart').on('click', function () {
		$('.test10 .quantity').val("");
		$('.test10 .result').html("");
		$('.test10 .phrase').html("");
	});
	$('.test10 .verify').on('click', function (e) {
		attempt1++;
		let lettersNumber = $('.test10 .hidden_letters p').text().split('').filter(l => l === 'С').length;
		if ($('.test10 .quantity').val() == lettersNumber) {
			$('.test10 .result').html("Молодец! Всё верно!");
			$('.test10 .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
			res10 = 'верно'
		} else {
			$('.test10 .result').html("Ты где-то ошибся. Присмотрись повнимательнее!");
			$('.test10 .phrase').html(phrase2[Math.floor(Math.random() * phrase2.length)]);
			res10 = 'неверно'
		}
	});
	$(`.test10 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = 'Попыток: 0'
		if (res10) {
			result = `Попыток: ${attempt1}%0AРезультат: ${res10}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 10', title, name, surname, result }, $(this))
		}
	});
	//----------11--------------
	var attempt2 = 0;
	let res11 = ''
	$('.test11 .restart').on('click', function () {
		$('.test11 .underline_the_words span').removeClass('act');
		$('.test11 .quantity').val("");
		$('.test11 .result').html("");
		$('.test11 .phrase').html("");
	});
	$('.test11 .underline_the_words span').on('click', function () {
		$(this).toggleClass('act');
	});
	$('.test11 .verify').on('click', function (e) {
		attempt2++;
		if (
			$('.test11 .underline_the_words span').length === $('.test11 .underline_the_words .act').length
		) {
			$('.test11 .result').html("Молодец! Всё верно!");
			$('.test11 .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
			res11 = 'верно'
		} else {
			$('.test11 .result').html("Ты где-то ошибся. Присмотрись повнимательнее!");
			$('.test11 .phrase').html(phrase2[Math.floor(Math.random() * phrase2.length)]);
			res11 = 'неверно'
		}
	});
	$(`.test11 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = 'Попыток: 0'
		if (res11) {
			result = `Попыток: ${attempt2}%0AРезультат: ${res11}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 11', title, name, surname, result }, $(this))
		}
	});
});