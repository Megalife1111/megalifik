$(document).ready(function () {
	const title = 'Домашние задание 9 Английский'
	//----------2--------------
	var attempt3 = 0;
	let res2 = ''
	$('.test2 .restart').on('click', function () {
		$('.test2 .highlight_letters span').removeClass('circ');
		$('.test2 .quantity').val("");
		$('.test2 .result').html("");
		$('.test2 .phrase').html("");
	});
	$('.test2 .highlight_letters p').html(
		'<span>' + $('.test2 .highlight_letters p').text().replace(/\s+|\n+/g, '').split('').join('</span><span>') + '</span>'
	);

	let span = $('.test2 .highlight_letters span');

	span.on('click', function (e) {
		e.preventDefault;
		if ($(this).hasClass('circ')) {
			$(this).removeClass('circ');
		} else {
			$(this).addClass('circ');
		}
	});

	$('.test2 .verify').on('click', function (e) {
		attempt3++;

		let result1 = 0, sum1 = 0;
		span.each(function (i, elem) {
			if ($(elem).text() === 'G') {
				result1++;
			}
		});
		$('.test2 .highlight_letters .circ').each(function (i, elem) {
			if ($(elem).text() === 'G') {
				sum1++;
			}
		});
		if (result1 == sum1) {
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
			result = `Попыток: ${attempt3}%0AРезультат: ${res2}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 2', title, name, surname, result }, $(this))
		}
	});
	//-----3------
	let attempt1 = 0;
	let res3 = ''
	$('.test3 .restart').on('click', function () {
		$('.test3 input').val("");
		$('.test3 .result').html("");
		$('.test3 .phrase').html("");
	});
	$('.test3 .verify').on('click', function (e) {
		attempt1++;
		if (
			$('.test3 .inp1').val().toLowerCase() == 'baker' &&
			$('.test3 .inp2').val().toLowerCase() == 'waiter' &&
			$('.test3 .inp3').val().toLowerCase() == 'teacher' &&
			$('.test3 .inp4').val().toLowerCase() == 'police' &&
			$('.test3 .inp5').val().toLowerCase() == 'artist' &&
			$('.test3 .inp6').val().toLowerCase() == 'doctor' &&
			$('.test3 .inp7').val().toLowerCase() == 'taxi driver' &&
			$('.test3 .inp8').val().toLowerCase() == 'scientist'
		) {
			$('.test3 .result').html("Молодец! Всё верно!");
			$('.test3 .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
			res3 = 'верно'
		} else {
			$('.test3 .result').html("Ты где-то ошибся. Присмотрись повнимательнее!");
			$('.test3 .phrase').html(phrase2[Math.floor(Math.random() * phrase2.length)]);
			res3 = 'неверно'
		}
	});
	$(`.test3 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = 'Попыток: 0'
		if (res3) {
			result = `Попыток: ${attempt1}%0AРезультат: ${res3}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 3', title, name, surname, result }, $(this))
		}
	});
	//----------5--------------
	var attempt2 = 0;
	let res5 = ''
	$('.test5 .restart').on('click', function () {
		$('.test5 .underline_the_words span').removeClass('act');
		$('.test5 .result').html("");
		$('.test5 .phrase').html("");
	});
	$('.test5 .underline_the_words span').on('click', function () {
		$(this).toggleClass('act');
	});
	$('.test5 .verify').on('click', function (e) {
		attempt2++;
		if (
			$('.test5 .underline_the_words span').length === $('.test5 .underline_the_words .act').length
		) {
			$('.test5 .result').html("Молодец! Всё верно!");
			$('.test5 .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
			res5 = 'верно'
		} else {
			$('.test5 .result').html("Ты где-то ошибся. Присмотрись повнимательнее!");
			$('.test5 .phrase').html(phrase2[Math.floor(Math.random() * phrase2.length)]);
			res5 = 'неверно'
		}
	});
	$(`.test5 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = 'Попыток: 0'
		if (res5) {
			result = `Попыток: ${attempt2}%0AРезультат: ${res5}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 5', title, name, surname, result }, $(this))
		}
	});
});