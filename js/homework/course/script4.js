$(document).ready(function () {
	const title = 'Домашние задание 4 ЧтиВо'
	//-----2------
	var canv1 = document.getElementById("c1");
	draw_test(canv1, "/img/fileword16.png", 2, 0.72);
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
		let lettersNumber = $('.test5 .hidden_letters p').text().split('').filter(l => l === 'С').length;
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
	//----------8--------------
	var attempt3 = 0;
	let res8 = ''
	$('.test8 .restart').on('click', function () {
		$('.test8 .highlight_letters span').removeClass('circ');
		$('.test8 .quantity').val("");
		$('.test8 .result').html("");
		$('.test8 .phrase').html("");
	});
	$('.test8 .highlight_letters p').html(
		'<span>' + $('.test8 .highlight_letters p').text().replace(/\s+|\n+/g, '').split('').join('</span><span>') + '</span>'
	);

	let span = $('.test8 .highlight_letters span');

	span.on('click', function (e) {
		e.preventDefault;
		if ($(this).hasClass('circ')) {
			$(this).removeClass('circ');
		} else {
			$(this).addClass('circ');
		}
	});

	$('.test8 .verify').on('click', function (e) {
		attempt3++;

		let result = 0, sum = 0;
		span.each(function (i, elem) {
			if ($(elem).text() === 'М') {
				result++;
			}
		});
		$('.test8 .highlight_letters .circ').each(function (i, elem) {
			if ($(elem).text() === 'М') {
				sum++;
			}
		});
		if (result == sum) {
			$('.test8 .result').html("Молодец! Всё верно!");
			$('.test8 .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
			res8 = 'верно'
		} else {
			$('.test8 .result').html("Ты где-то ошибся. Присмотрись повнимательнее!");
			$('.test8 .phrase').html(phrase2[Math.floor(Math.random() * phrase2.length)]);
			res8 = 'неверно'
		}
	});
	$(`.test8 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = 'Попыток: 0'
		if (res8) {
			result = `Попыток: ${attempt3}%0AРезультат: ${res8}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 8', title, name, surname, result }, $(this))
		}
	});
	//----------9--------------
	text_by_example(9, title);
});