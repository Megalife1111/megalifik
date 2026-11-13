$(document).ready(function () {
	const title = 'Занятие 3 PROЧтиВо'
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
			if ($(this).hasClass('double_underlined')) {
				$(this).removeClass('double_underlined');
				$(this).addClass('check_mark');
			} else if ($(this).hasClass('check_mark')) {
				$(this).removeClass('check_mark');
				$(this).removeClass('double_underlined');
			} else {
				$(this).addClass('double_underlined');
				$(this).removeClass('check_mark');
			}
			if (!timerId) {
				timerId = setInterval(timer, 1000);
			}
		});
		$('.test' + n + ' .verify').on('click', function (e) {
			attempt++;
			if (
				$('.test' + n + ' .answer .quantity').val() == $('.test' + n + ' .frt').length - 1 &&
				$('.test' + n + ' .double_underlined .frt').length == $('.test' + n + ' .frt').length - 1 &&
				$('.test' + n + ' .check_mark .fl').length == $('.test' + n + ' .fl').length &&
				$('.test' + n + ' .double_underlined .fl').length == 0 &&
				$('.test' + n + ' .double_underlined .fr').length == 0 &&
				$('.test' + n + ' .double_underlined .fb').length == 0 &&
				$('.test' + n + ' .double_underlined .flt').length == 0 &&
				$('.test' + n + ' .double_underlined .ft').length == 0 &&
				$('.test' + n + ' .double_underlined .flb').length == 0 &&
				$('.test' + n + ' .double_underlined .frb').length == 0 &&
				$('.test' + n + ' .check_mark .fb').length == 0 &&
				$('.test' + n + ' .check_mark .fr').length == 0 &&
				$('.test' + n + ' .check_mark .ft').length == 0 &&
				$('.test' + n + ' .check_mark .flt').length == 0 &&
				$('.test' + n + ' .check_mark .frt').length == 0 &&
				$('.test' + n + ' .check_mark .flb').length == 0 &&
				$('.test' + n + ' .check_mark .frb').length == 0
			) {
				$('.test' + n + ' .result').html("Молодец! Всё верно!");
				$('.test' + n + ' .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
					$('.test' + n + ' .frt').parent('.cell').addClass('prompt');
					$('.test' + n + ' .fl').parent('.cell').addClass('prompt');
				}
				$('.test' + n + ' .result').html("Ты где-то ошибся. Присмотрись повнимательнее!");
				$('.test' + n + ' .phrase').html(phrase2[Math.floor(Math.random() * phrase2.length)]);
				res0 = 'неверно'
			}
			clearTimeout(timerId);
			timerId = false;
		});
		$('.test' + n + ' .restart').on('click', function (e) {
			$('.test' + n + ' .cell').removeClass('double_underlined');
			$('.test' + n + ' .cell').removeClass('check_mark');
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
	var canv3 = document.getElementById("c62");
	draw_test(canv3, "/img/decorate6.png", 2, 0.96);
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
	var canv2 = document.getElementById("c63");
	draw_test(canv2, "/img/circle7.png", 3, 0.71);
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
	var canv1 = document.getElementById("c64");
	draw_test(canv1, "/img/img7.png", 4, 0.67);
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
	//----------5--------------
	var attempt1 = 0;
	let res5 = ''
	$('.test5 .restart').on('click', function () {
		$('.test5 input').val('');
		$('.test5 .result').html("");
		$('.test5 .phrase').html("");
	});
	$('.test5 .verify').on('click', function (e) {
		attempt1++;
		if (
			$('.test5 .inp1').val().toLowerCase() == "горнист" &&
			$('.test5 .inp2').val().toLowerCase() == "рыцарь" &&
			$('.test5 .inp3').val().toLowerCase() == "садовод" &&
			$('.test5 .inp4').val().toLowerCase() == "служанка" &&
			$('.test5 .inp5').val().toLowerCase() == "культурист" &&
			$('.test5 .inp6').val().toLowerCase() == "таксист" &&
			$('.test5 .inp7').val().toLowerCase() == "натуралист" &&
			$('.test5 .inp8').val().toLowerCase() == "укротитель" &&
			$('.test5 .inp9').val().toLowerCase() == "окулист" &&
			$('.test5 .inp10').val().toLowerCase() == "танкист" &&
			$('.test5 .inp11').val().toLowerCase() == "плотник" &&
			$('.test5 .inp12').val().toLowerCase() == "токарь" &&
			$('.test5 .inp13').val().toLowerCase() == "пожарник" &&
			$('.test5 .inp14').val().toLowerCase() == "трубач" &&
			$('.test5 .inp15').val().toLowerCase() == "рыбак" &&
			$('.test5 .inp16').val().toLowerCase() == "пикадор"
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
			result = `Попыток: ${attempt1}%0AРезультат: ${res5}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 5', title, name, surname, result }, $(this))
		}
	});
	//-----6------
	var canv4 = document.getElementById("c65"),
		attempt3 = 0;
	let res6 = ''
	draw_test(canv4, "/img/find6.png", 6, 1.31);
	$('.test6 .verify').on('click', function (e) {
		attempt3++;
		if (
			$('.test6 .quantity').val() == 10
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
			result = `Попыток: ${attempt3}%0AРезультат: ${res6}`
		}
		let file = canv4.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 6', title, name, surname, result, file }, $(this))
		}
	});
	//-----7------
	var canv5 = document.getElementById("c66");
	draw_test(canv5, "/img/maze5.png", 7, 1.21);
	$(`.test7 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv5.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 7', title, name, surname, file }, $(this))
		}
	});
	//----------8--------------
	$('.test8 .restart').on('click', function () {
		$('.test8 input').val("");
	});
	$(`.test8 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = ($('.test8 .count1').val() || '0') + ' из ' + ($('.test8 .count2').val() || '0') + '%0A1. ' + $('.test8 .word1 input').val() + ' 2. ' + $('.test8 .word2 input').val() + ' 3. ' + $('.test8 .word3 input').val() + ' 4. ' + $('.test8 .word4 input').val() + ' 5. ' + $('.test8 .word5 input').val() + ' 6. ' + $('.test8 .word6 input').val() + ' 7. ' + $('.test8 .word7 input').val() + ' 8. ' + $('.test8 .word8 input').val() + ' 9. ' + $('.test8 .word9 input').val() + ' 10. ' + $('.test8 .word10 input').val() + ' 11. ' + $('.test8 .word11 input').val() + ' 12. ' + $('.test8 .word12 input').val() + ' 13. ' + $('.test8 .word13 input').val() + ' 14. ' + $('.test8 .word14 input').val() + ' 15. ' + $('.test8 .word15 input').val() + ' 16. ' + $('.test8 .word16 input').val()
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 8', title, name, surname, result }, $(this))
		}
	});
});