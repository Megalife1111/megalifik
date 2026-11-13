$(document).ready(function () {
	const title = 'Пробное занятие по скорочтению для детей 6-11 лет'
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
			if ($(this).hasClass('plus')) {
				$(this).removeClass('plus');
				$(this).addClass('crossed');
			} else if ($(this).hasClass('crossed')) {
				$(this).removeClass('crossed');
				$(this).removeClass('plus');
			} else {
				$(this).addClass('plus');
				$(this).removeClass('crossed');
			}
			if (!timerId) {
				timerId = setInterval(timer, 1000);
			}
		});
		$('.test' + n + ' .verify').on('click', function (e) {
			attempt++;
			if (
				$('.test' + n + ' .answer .quantity').val() == $('.test' + n + ' .f_circle').length - 1 &&
				$('.test' + n + ' .plus .f_triangle').length == $('.test' + n + ' .f_triangle').length &&
				$('.test' + n + ' .crossed .f_circle').length == $('.test' + n + ' .f_circle').length - 1 &&
				$('.test' + n + ' .plus .f_circle').length == 0 &&
				$('.test' + n + ' .plus .f_face').length == 0 &&
				$('.test' + n + ' .plus .f_rhombus').length == 0 &&
				$('.test' + n + ' .plus .f_heart').length == 0 &&
				$('.test' + n + ' .crossed .f_triangle').length == 0 &&
				$('.test' + n + ' .crossed .f_face').length == 0 &&
				$('.test' + n + ' .crossed .f_rhombus').length == 0 &&
				$('.test' + n + ' .crossed .f_heart').length == 0
			) {
				$('.test' + n + ' .result').html("Молодец! Всё верно!");
				$('.test' + n + ' .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
					$('.test' + n + ' .f_triangle').parent('.cell').addClass('prompt');
					$('.test' + n + ' .f_circle').parent('.cell').addClass('prompt');
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
			$('.test' + n + ' .cell').removeClass('plus');
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
				$('.test' + n + ' .underlined .m2').length == $('.test' + n + ' .m2').length &&
				$('.test' + n + ' .underlined .m1').length == 0 &&
				$('.test' + n + ' .underlined .m3').length == 0
			) {
				$('.test' + n + ' .result').html("Молодец! Всё верно!");
				$('.test' + n + ' .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
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
		} else {
			$(this).addClass('paint_dark');
		}
	});
	$('.test3 .verify').on('click', function (e) {
		attempt1++;
		if (
			$('.test3 .quantity').val().toLowerCase() == 'б'
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
		$('.test3 .sea​_battle td').removeClass('paint_orange');
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
	//----------4--------------
	$('.test4 .restart').on('click', function () {
		$('.test4 input').val("");
	});
	$(`.test4 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = ($('.test4 .count1').val() || '0') + ' из ' + ($('.test4 .count2').val() || '0') + '%0A1. ' + $('.test4 .word1 input').val() + ' 2. ' + $('.test4 .word2 input').val() + ' 3. ' + $('.test4 .word3 input').val() + ' 4. ' + $('.test4 .word4 input').val() + ' 5. ' + $('.test4 .word5 input').val() + ' 6. ' + $('.test4 .word6 input').val() + ' 7. ' + $('.test4 .word7 input').val() + ' 8. ' + $('.test4 .word8 input').val() + ' 9. ' + $('.test4 .word9 input').val() + ' 10. ' + $('.test4 .word10 input').val() + ' 11. ' + $('.test4 .word11 input').val() + ' 12. ' + $('.test4 .word12 input').val() + ' 13. ' + $('.test4 .word13 input').val() + ' 14. ' + $('.test4 .word14 input').val() + ' 15. ' + $('.test4 .word15 input').val() + ' 16. ' + $('.test4 .word16 input').val()
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 4', title, name, surname, result }, $(this))
		}
	});
});