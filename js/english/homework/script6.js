$(document).ready(function () {
	const title = 'Домашние задание 6 Английский'
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
			$('.test2 .inp1').val().toLowerCase() == 'go swimming' &&
			$('.test2 .inp2').val().toLowerCase() == 'read books' &&
			$('.test2 .inp3').val().toLowerCase() == 'sing' &&
			$('.test2 .inp4').val().toLowerCase() == 'play football' &&
			$('.test2 .inp5').val().toLowerCase() == 'jump' &&
			$('.test2 .inp6').val().toLowerCase() == 'sleep' &&
			$('.test2 .inp7').val().toLowerCase() == 'ride a bike' &&
			$('.test2 .inp8').val().toLowerCase() == 'watch tv' &&
			$('.test2 .inp9').val().toLowerCase() == 'play computer games' &&
			$('.test2 .inp10').val().toLowerCase() == 'play with toys' &&
			$('.test2 .inp11').val().toLowerCase() == 'play hide-and-seek'
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
	//-----3------
	var canv1 = document.getElementById("c1");
	draw_test(canv1, "/img/fileword34.png", 3, 0.61);
	$(`.test3 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv1.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 3', title, name, surname, file }, $(this))
		}
	});
});