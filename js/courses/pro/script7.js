$(document).ready(function () {
	const title = 'Занятие 7 PROЧтиВо'
	//-----1------
	figure_test1('1');
	function figure_test1(n) {
		let time = 0, full_time = '00:00'
		let timerId = false
		let attempt = 0
		let res0 = ''
		function timer() {
			time++;
			var min = Math.floor(time / 60),
				sec = time % 60;
			min = min > 9 ? min : ('0' + min);
			sec = sec > 9 ? sec : ('0' + sec);
			full_time = min + ':' + sec;
			$('.test' + n + ' .timer').html(full_time);
		}
		$('.test' + n + ' .cell').on('click', function (e) {
			e.preventDefault;
			if ($(this).hasClass('check_mark')) {
				$(this).removeClass('check_mark');
				$(this).addClass('in_double_circle');
			} else if ($(this).hasClass('in_double_circle')) {
				$(this).removeClass('in_double_circle');
				$(this).removeClass('check_mark');
			} else {
				$(this).addClass('check_mark');
				$(this).removeClass('in_double_circle');
			}
			if (!timerId) {
				timerId = setInterval(timer, 1000);
			}
		});
		$('.test' + n + ' .verify').on('click', function (e) {
			attempt++;
			if (
				$('.test' + n + ' .answer .quantity').val() == 4 &&
				$('.test' + n + ' .check_mark .fl').length == $('.test' + n + ' .fl').length &&
				$('.test' + n + ' .in_double_circle .fb').length == $('.test' + n + ' .fb').length &&
				$('.test' + n + ' .check_mark .ft').length == 0 &&
				$('.test' + n + ' .check_mark .fr').length == 0 &&
				$('.test' + n + ' .check_mark .fb').length == 0 &&
				$('.test' + n + ' .check_mark .flt').length == 0 &&
				$('.test' + n + ' .check_mark .frt').length == 0 &&
				$('.test' + n + ' .check_mark .flb').length == 0 &&
				$('.test' + n + ' .check_mark .frb').length == 0 &&
				$('.test' + n + ' .in_double_circle .fl').length == 0 &&
				$('.test' + n + ' .in_double_circle .fr').length == 0 &&
				$('.test' + n + ' .in_double_circle .ft').length == 0 &&
				$('.test' + n + ' .in_double_circle .flt').length == 0 &&
				$('.test' + n + ' .in_double_circle .frt').length == 0 &&
				$('.test' + n + ' .in_double_circle .flb').length == 0 &&
				$('.test' + n + ' .in_double_circle .frb').length == 0
			) {
				$('.test' + n + ' .result').html("Молодец! Всё верно!");
				$('.test' + n + ' .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
					$('.test' + n + ' .fl').parent('.cell').addClass('prompt');
					$('.test' + n + ' .fb').parent('.cell').addClass('prompt');
				}
				$('.test' + n + ' .result').html("Ты где-то ошибся. Присмотрись повнимательнее!");
				$('.test' + n + ' .phrase').html(phrase2[Math.floor(Math.random() * phrase2.length)]);
				res0 = 'неверно'
			}
			clearTimeout(timerId);
			timerId = false;
		});
		$('.test' + n + ' .restart').on('click', function (e) {
			$('.test' + n + ' .cell').removeClass('check_mark');
			$('.test' + n + ' .cell').removeClass('in_double_circle');
			$('.test' + n + ' .quantity').val("");
			$('.test' + n + ' .result').html("");
			$('.test' + n + ' .phrase').html("");
			clearTimeout(timerId);
			timerId = false;
			time = 0;
			full_time = '00:00';
			$('.test' + n + ' .timer').html('00:00');
		});
		$(`.test${n} .send`).on('click', function (e) {
			let name = nameInput.value
			let surname = surnameInput.value
			let result = 'Попыток: 0'
			if (res0) {
				result = `Попыток: ${attempt}%0AРезультат: ${res0}%0AВремя: ${full_time}`
			}
			if (!name) {
				alert('Введите имя')
			} else if (!surname) {
				alert('Введите фамилию')
			} else {
				sendAjaxForm('/send_test.php', { test: 'Тест 1', title, name, surname, result }, $(this))
			}
		});
	}
	//-----2------
	var canv3 = document.getElementById("c80");
	draw_test(canv3, "/img/decorate19.png", 2, 0.96);
	$(`.test2 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv3.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 2', title, name, surname, file }, $(this))
		}
	});
	//-----3------
	var canv2 = document.getElementById("c81");
	draw_test(canv2, "/img/circle11.png", 3, 0.71);
	$(`.test3 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv2.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 3', title, name, surname, file }, $(this))
		}
	});
	//-----4------
	var canv1 = document.getElementById("c82");
	draw_test(canv1, "/img/img14.png", 4, 0.79);
	$(`.test4 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv1.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 4', title, name, surname, file }, $(this))
		}
	});
	//-----5------
	var canv4 = document.getElementById("c83"),
		attempt3 = 0;
	let res5 = ''
	draw_test(canv4, "/img/find8.png", 5, 1.44);
	$('.test5 .verify').on('click', function (e) {
		attempt3++;
		if (
			$('.test5 .quantity').val() == 10
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
			result = `Попыток: ${attempt3}%0AРезультат: ${res5}`
		}
		let file = canv4.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 5', title, name, surname, result, file }, $(this))
		}
	});
	//-----6------
	var canv5 = document.getElementById("c84"),
		attempt1 = 0;
	let res6 = ''
	draw_test(canv5, "/img/grid20.png", 6, 0.74, 0.85);
	$('.test6 .verify').on('click', function (e) {
		attempt1++;
		if (
			$('.test6 .quantity').val().toLowerCase() == "рыба"
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
			result = `Попыток: ${attempt1}%0AРезультат: ${res6}`
		}
		let file = canv5.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 6', title, name, surname, result, file }, $(this))
		}
	});
	//----------7--------------
	$('.test7 .restart').on('click', function () {
		$('.test7 input').val("");
	});
	$(`.test7 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = ($('.test7 .count1').val() || '0') + ' из ' + ($('.test7 .count2').val() || '0') + '%0A1. ' + $('.test7 .word1 input').val() + ' 2. ' + $('.test7 .word2 input').val() + ' 3. ' + $('.test7 .word3 input').val() + ' 4. ' + $('.test7 .word4 input').val() + ' 5. ' + $('.test7 .word5 input').val() + ' 6. ' + $('.test7 .word6 input').val() + ' 7. ' + $('.test7 .word7 input').val() + ' 8. ' + $('.test7 .word8 input').val() + ' 9. ' + $('.test7 .word9 input').val() + ' 10. ' + $('.test7 .word10 input').val() + ' 11. ' + $('.test7 .word11 input').val() + ' 12. ' + $('.test7 .word12 input').val() + ' 13. ' + $('.test7 .word13 input').val() + ' 14. ' + $('.test7 .word14 input').val() + ' 15. ' + $('.test7 .word15 input').val() + ' 16. ' + $('.test7 .word16 input').val()
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 7', title, name, surname, result }, $(this))
		}
	});
});