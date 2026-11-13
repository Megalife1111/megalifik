$(document).ready(function () {
	const title = 'Домашние задание 8 Английский'
	//-----2------
	var canv1 = document.getElementById("c1");
	draw_test(canv1, "/img/fileword35.png", 2, 0.55);
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
	var attempt2 = 0;
	let res3 = ''
	$('.test3 .restart').on('click', function () {
		$('.test3 .underline_the_words span').removeClass('act');
		$('.test3 .result').html("");
		$('.test3 .phrase').html("");
	});
	$('.test3 .underline_the_words span').on('click', function () {
		$(this).toggleClass('act');
	});
	$('.test3 .verify').on('click', function (e) {
		attempt2++;
		if (
			$('.test3 .underline_the_words span').length === $('.test3 .underline_the_words .act').length
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
			result = `Попыток: ${attempt2}%0AРезультат: ${res3}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 3', title, name, surname, result }, $(this))
		}
	});
	//-----4------
	let attempt1 = 0;
	let res4 = ''
	$('.test4 .restart').on('click', function () {
		$('.test4 input').val("");
		$('.test4 .result').html("");
		$('.test4 .phrase').html("");
	});
	$('.test4 .verify').on('click', function (e) {
		attempt1++;
		if (
			$('.test4 .inp1').val().toLowerCase() == 'strawberry' &&
			$('.test4 .inp2').val().toLowerCase() == 'banana' &&
			$('.test4 .inp3').val().toLowerCase() == 'cherry' &&
			$('.test4 .inp4').val().toLowerCase() == 'watermelon'
		) {
			$('.test4 .result').html("Молодец! Всё верно!");
			$('.test4 .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
			res4 = 'верно'
		} else {
			$('.test4 .result').html("Ты где-то ошибся. Присмотрись повнимательнее!");
			$('.test4 .phrase').html(phrase2[Math.floor(Math.random() * phrase2.length)]);
			res4 = 'неверно'
		}
	});
	$(`.test4 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = 'Попыток: 0'
		if (res4) {
			result = `Попыток: ${attempt1}%0AРезультат: ${res4}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 4', title, name, surname, result }, $(this))
		}
	});
	//----------5--------------
	$('.test5 .restart').on('click', function () {
		$('.test5 textarea').val("");
	});
	$(`.test5 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = 'Drinks: ' + $('.test5 .inp1').val() + '; Fruits: ' + $('.test5 .inp2').val() + '; Other food and dishes: ' + $('.test5 .inp3').val()
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 5', title, name, surname, result }, $(this))
		}
	});
});