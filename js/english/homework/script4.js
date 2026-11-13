$(document).ready(function () {
	const title = 'Домашние задание 4 Английский'
	//-----1------
	var canv1 = document.getElementById("c1");
	draw_test(canv1, "/img/fileword33.png", 1, 0.45);
	$('.test1 .restart').on('click', function () {
		$('.test1 .inp1').val("");
	});
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
	//-----3------
	$('.test3 .restart').on('click', function () {
		$('.test3 .inp1').val("");
	});
	$(`.test4 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = $('.test3 .inp1').val()
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 4', title, name, surname, result }, $(this))
		}
	});
	//----------4--------------
	var attempt2 = 0;
	let res4 = 's'
	$('.test4 .restart').on('click', function () {
		$('.test4 .underline_the_words span').removeClass('act');
		$('.test4 .quantity').val("");
		$('.test4 .result').html("");
		$('.test4 .phrase').html("");
	});
	$('.test4 .underline_the_words span').on('click', function () {
		$(this).toggleClass('act');
	});
	$('.test4 .verify').on('click', function (e) {
		attempt2++;
		if (
			$('.test4 .underline_the_words span').length === $('.test4 .underline_the_words .act').length
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
			result = `Попыток: ${attempt2}%0AРезультат: ${res4}%0AТекст: ${$('.test4 .quantity').val()}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 4', title, name, surname, result }, $(this))
		}
	});
});