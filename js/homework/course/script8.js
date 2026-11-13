$(document).ready(function () {
	const title = 'Домашние задание 8 ЧтиВо'
	//-----2------
	var canv1 = document.getElementById("c1");
	draw_test(canv1, "/img/fileword20.png", 2, 0.72);
	$(`.test2 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv1.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 2', title, name, surname, file }, $(this))
		}
	});
	//----------3--------------
	text_by_example(3, title);
	//----------5--------------
	var attempt1 = 0;
	let res5 = ''
	$('.test5 .restart').on('click', function () {
		$('.test5 .quantity').val("");
		$('.test5 .result').html("");
		$('.test5 .phrase').html("");
	});
	$('.test5 .verify').on('click', function (e) {
		attempt1++;
		let lettersNumber = $('.test5 .hidden_letters p').text().split('').filter(l => l === 'О').length;
		if ($('.test5 .quantity').val() == lettersNumber) {
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
			result = `Попыток: ${attempt1}%0AРезультат: ${res5}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 5', title, name, surname, result }, $(this))
		}
	});
	//----------6--------------
	var attempt2 = 0;
	let res6 = ''
	$('.test6 .restart').on('click', function () {
		$('.test6 .underline_the_words span').removeClass('act');
		$('.test6 .quantity').val("");
		$('.test6 .result').html("");
		$('.test6 .phrase').html("");
	});
	$('.test6 .underline_the_words span').on('click', function () {
		$(this).toggleClass('act');
	});
	$('.test6 .verify').on('click', function (e) {
		attempt2++;
		if (
			$('.test6 .underline_the_words span').length === $('.test6 .underline_the_words .act').length
		) {
			$('.test6 .result').html("Молодец! Всё верно!");
			$('.test6 .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
			res6 = 'верно'
		} else {
			$('.test6 .result').html("Ты где-то ошибся. Присмотрись повнимательнее!");
			$('.test6 .phrase').html(phrase2[Math.floor(Math.random() * phrase2.length)]);
			res6 = 'неверно'
		}
	});
	$(`.test6 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = 'Попыток: 0'
		if (res6) {
			result = `Попыток: ${attempt2}%0AРезультат: ${res6}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 6', title, name, surname, result }, $(this))
		}
	});
	//----------7--------------
	var attempt3 = 0;
	let res7 = ''
	$('.test7 .restart').on('click', function () {
		$('.test7 .highlight_letters span').removeClass('triang');
		$('.test7 .highlight_letters span').removeClass('crosse');
		$('.test7 .quantity').val("");
		$('.test7 .result').html("");
		$('.test7 .phrase').html("");
	});
	$('.test7 .highlight_letters p').html(
		'<span>' + $('.test7 .highlight_letters p').text().replace(/\s+|\n+/g, '').split('').join('</span><span>') + '</span>'
	);

	let span = $('.test7 .highlight_letters span');

	span.on('click', function (e) {
		e.preventDefault;
		if ($(this).hasClass('triang')) {
			$(this).removeClass('triang');
			$(this).addClass('crosse');
		} else if ($(this).hasClass('crosse')) {
			$(this).removeClass('crosse');
		} else {
			$(this).addClass('triang');
		}
	});

	$('.test7 .verify').on('click', function (e) {
		attempt3++;

		let result1 = 0, result2 = 0, sum1 = 0, sum2 = 0;
		span.each(function (i, elem) {
			if ($(elem).text() === 'А') {
				result1++;
			}
			if ($(elem).text() === 'Л') {
				result2++;
			}
		});
		$('.test7 .highlight_letters .triang').each(function (i, elem) {
			if ($(elem).text() === 'А') {
				sum1++;
			}
		});
		$('.test7 .highlight_letters .crosse').each(function (i, elem) {
			if ($(elem).text() === 'Л') {
				sum2++;
			}
		});
		if (
			result1 == sum1 &&
			result2 == sum2
		) {
			$('.test7 .result').html("Молодец! Всё верно!");
			$('.test7 .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
			res7 = 'верно'
		} else {
			$('.test7 .result').html("Ты где-то ошибся. Присмотрись повнимательнее!");
			$('.test7 .phrase').html(phrase2[Math.floor(Math.random() * phrase2.length)]);
			res7 = 'неверно'
		}
	});
	$(`.test7 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = 'Попыток: 0'
		if (res7) {
			result = `Попыток: ${attempt3}%0AРезультат: ${res7}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 7', title, name, surname, result }, $(this))
		}
	});
	//----------8--------------
	text_by_example(8, title);
});