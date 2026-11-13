$(document).ready(function () {
	const title = 'Домашние задание 9 МегаЧтиВо'
	//-----6-----
	var attempt1 = 0;
	let res6 = ''
	$('.test6 .sea​_battle td').on('click', function (e) {
		if ($(this).hasClass('paint_green')) {
			$(this).removeClass('paint_green');
			$(this).addClass('paint_dark');
		} else if ($(this).hasClass('paint_dark')) {
			$(this).removeClass('paint_dark');
			$(this).addClass('paint_dark_green');
		} else if ($(this).hasClass('paint_dark_green')) {
			$(this).removeClass('paint_dark_green');
			$(this).addClass('paint_pink');
		} else if ($(this).hasClass('paint_pink')) {
			$(this).removeClass('paint_pink');
		} else {
			$(this).addClass('paint_green');
		}
	});
	$('.test6 .verify').on('click', function (e) {
		attempt1++;
		if (
			$('.test6 .quantity').val().toLowerCase() == 'динозаврик' ||
			$('.test6 .quantity').val().toLowerCase() == 'динозавр'
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
	$('.test6 .restart').on('click', function () {
		$('.test6 .sea​_battle td').removeClass('paint_green');
		$('.test6 .sea​_battle td').removeClass('paint_dark');
		$('.test6 .sea​_battle td').removeClass('paint_dark_green');
		$('.test6 .sea​_battle td').removeClass('paint_pink');
		$('.d').removeClass('en');
		$('.test6 .quantity').val('');
		$('.test6 .result').html("");
		$('.test6 .phrase').html("");
	});
	$(`.test6 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = 'Попыток: 0'
		if (res6) {
			result = `Попыток: ${attempt1}%0AРезультат: ${res6}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 6', title, name, surname, result }, $(this))
		}
	});
});