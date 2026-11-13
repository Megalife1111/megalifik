$(document).ready(function () {
	const title = 'Домашние задание 3 МегаЧтиВо'
	//-----8------
	var canv1 = document.getElementById("c1");
	draw_test(canv1, "/img/fileword26.png", 8, 0.72);
	$(`.test8 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv1.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 8', title, name, surname, file }, $(this))
		}
	});
	//----------9--------------
	text_by_example(9, title);
	//----------11--------------
	var attempt1 = 0;
	let res11 = ''
	$('.test11 .restart').on('click', function () {
		$('.test11 .quantity').val("");
		$('.test11 .result').html("");
		$('.test11 .phrase').html("");
	});
	$('.test11 .verify').on('click', function (e) {
		attempt1++;
		let lettersNumber = $('.test11 .hidden_letters p').text().split('').filter(l => l === 'Н').length;
		if ($('.test11 .quantity').val() == lettersNumber) {
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
			result = `Попыток: ${attempt1}%0AРезультат: ${res11}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 11', title, name, surname, result }, $(this))
		}
	});
	//----------12--------------
	var attempt2 = 0;
	let res12 = ''
	$('.test12 .restart').on('click', function () {
		$('.test12 .underline_the_words span').removeClass('act');
		$('.test12 .quantity').val("");
		$('.test12 .result').html("");
		$('.test12 .phrase').html("");
	});
	$('.test12 .underline_the_words span').on('click', function () {
		$(this).toggleClass('act');
	});
	$('.test12 .verify').on('click', function (e) {
		attempt2++;
		if (
			$('.test12 .underline_the_words span').length === $('.test12 .underline_the_words .act').length
		) {
			$('.test12 .result').html("Молодец! Всё верно!");
			$('.test12 .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
			res12 = 'верно'
		} else {
			$('.test12 .result').html("Ты где-то ошибся. Присмотрись повнимательнее!");
			$('.test12 .phrase').html(phrase2[Math.floor(Math.random() * phrase2.length)]);
			res12 = 'неверно'
		}
	});
	$(`.test12 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = 'Попыток: 0'
		if (res12) {
			result = `Попыток: ${attempt2}%0AРезультат: ${res12}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 12', title, name, surname, result }, $(this))
		}
	});
});