$(document).ready(function () {
	const title = 'Занятие 11 НейроЧтиВо'
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
			if ($(this).hasClass('in_circle')) {
				$(this).removeClass('in_circle');
				$(this).addClass('crossed');
			} else if ($(this).hasClass('crossed')) {
				$(this).removeClass('crossed');
				$(this).removeClass('in_circle');
			} else {
				$(this).addClass('in_circle');
				$(this).removeClass('crossed');
			}
			if (!timerId) {
				timerId = setInterval(timer, 1000);
			}
		});
		$('.test' + n + ' .verify').on('click', function (e) {
			attempt++;
			if (
				$('.test' + n + ' .answer1 .quantity').val() == $('.test' + n + ' .m2').length - 1 &&
				$('.test' + n + ' .answer2 .quantity').val() == $('.test' + n + ' .f1').length - 1 &&
				$('.test' + n + ' .in_circle .m1').length == $('.test' + n + ' .m1').length &&
				$('.test' + n + ' .crossed .f2').length == $('.test' + n + ' .f2').length &&
				$('.test' + n + ' .in_circle .m2').length == 0 &&
				$('.test' + n + ' .in_circle .m3').length == 0 &&
				$('.test' + n + ' .in_circle .f1').length == 0 &&
				$('.test' + n + ' .in_circle .f2').length == 0 &&
				$('.test' + n + ' .in_circle .f3').length == 0 &&
				$('.test' + n + ' .crossed .m1').length == 0 &&
				$('.test' + n + ' .crossed .m2').length == 0 &&
				$('.test' + n + ' .crossed .m3').length == 0 &&
				$('.test' + n + ' .crossed .f1').length == 0 &&
				$('.test' + n + ' .crossed .f3').length == 0
			) {
				$('.test' + n + ' .result').html("Молодец! Всё верно!");
				$('.test' + n + ' .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
					$('.test' + n + ' .m1').parent('.cell').addClass('prompt');
					$('.test' + n + ' .f2').parent('.cell').addClass('prompt');
				}
				$('.test' + n + ' .result').html("Ты где-то ошибся. Присмотрись повнимательнее!");
				$('.test' + n + ' .phrase').html(phrase2[Math.floor(Math.random() * phrase2.length)]);
				res0 = 'неверно'
			}
			clearTimeout(timerId);
			timerId = false;
		});
		$('.test' + n + ' .restart').on('click', function (e) {
			$('.test' + n + ' .cell').removeClass('crossed');
			$('.test' + n + ' .cell').removeClass('in_circle');
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
	figure_test2('2');
	function figure_test2(n) {
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
			if ($(this).hasClass('underlined')) {
				$(this).removeClass('underlined');
			} else {
				$(this).addClass('underlined');
			}
			if (!timerId) {
				timerId = setInterval(timer, 1000);
			}
		});
		$('.test' + n + ' .verify').on('click', function (e) {
			attempt++;
			if (
				$('.test' + n + ' .underlined .m3').length == $('.test' + n + ' .m3').length &&
				$('.test' + n + ' .underlined .m1').length == 0 &&
				$('.test' + n + ' .underlined .m2').length == 0
			) {
				$('.test' + n + ' .result').html("Молодец! Всё верно!");
				$('.test' + n + ' .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
					$('.test' + n + ' .m3').parent('.cell').addClass('prompt');
				}
				$('.test' + n + ' .result').html("Ты где-то ошибся. Присмотрись повнимательнее!");
				$('.test' + n + ' .phrase').html(phrase2[Math.floor(Math.random() * phrase2.length)]);
				res0 = 'неверно'
			}
			clearTimeout(timerId);
			timerId = false;
		});
		$('.test' + n + ' .restart').on('click', function (e) {
			$('.test' + n + ' .cell').removeClass('underlined');
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
				sendAjaxForm('/send_test.php', { test: 'Тест 2', title, name, surname, result }, $(this))
			}
		});
	}
	//-----3-----
	var attempt1 = 0;
	let res3 = ''
	$('.test3 .sea​_battle td').on('click', function (e) {
		if ($(this).hasClass('paint_dark')) {
			$(this).removeClass('paint_dark');
			$(this).addClass('paint_grey');
		} else if ($(this).hasClass('paint_grey')) {
			$(this).removeClass('paint_grey');
			$(this).addClass('paint_brown');
		} else if ($(this).hasClass('paint_brown')) {
			$(this).removeClass('paint_brown');
		} else {
			$(this).addClass('paint_dark');
		}
	});
	$('.test3 .verify').on('click', function (e) {
		attempt1++;
		if (
			$('.test3 .quantity').val().toLowerCase() == 'телёнок' ||
			$('.test3 .quantity').val().toLowerCase() == 'теленок' ||
			$('.test3 .quantity').val().toLowerCase() == 'корова'
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
	$('.test3 .restart').on('click', function () {
		$('.test3 .sea​_battle td').removeClass('paint_dark');
		$('.test3 .sea​_battle td').removeClass('paint_grey');
		$('.test3 .sea​_battle td').removeClass('paint_brown');
		$('.test3 .quantity').val('');
		$('.test3 .result').html("");
		$('.test3 .phrase').html("");
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
			sendAjaxForm('/send_test.php', { test: 'Тест 3', title, name, surname, result }, $(this))
		}
	});
	//---------------------4-----------------------
	$('.test4 .restart').on('click', function () {
		$('.test4 .quantity').val("");
	});
	$(`.test4 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = $('.test4 .quantity').val()
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 4', title, name, surname, result }, $(this))
		}
	});
	//----------5--------------
	var attempt3 = 0;
	let res5 = ''
	$('.test5 .restart').on('click', function () {
		$('.test5 input').val("");
		$('.test5 .result').html("");
		$('.test5 .phrase').html("");
	});
	$('.test5 .verify').on('click', function (e) {
		attempt3++;
		if (
			$('.test5 .word1 input').val().toLowerCase() == 'мальчуган' &&
			$('.test5 .word2 input').val().toLowerCase() == 'пруд' &&
			$('.test5 .word3 input').val().toLowerCase() == 'туристы' &&
			$('.test5 .word4 input').val().toLowerCase() == 'прятки' &&
			$('.test5 .word5 input').val().toLowerCase() == 'неряхи' &&
			$('.test5 .word6 input').val().toLowerCase() == 'ржавчина'
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
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 5', title, name, surname, result }, $(this))
		}
	});
	//---------------------6-----------------------
	var attempt4 = 0;
	let res6 = ''
	$('.test6 .restart').on('click', function () {
		$('.test6 .quantity').val("");
		$('.test6 .result').html("");
		$('.test6 .phrase').html("");
	});
	$('.test6 .verify').on('click', function (e) {
		attempt4++;
		if (
			$('.test6 .quantity').val().toLowerCase() == "ты крутышь, получи 10 умников!"
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
			result = `Попыток: ${attempt4}%0AРезультат: ${res6}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 6', title, name, surname, result }, $(this))
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