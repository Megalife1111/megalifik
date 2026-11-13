$(document).ready(function () {
	const title = 'Занятие 11 ЧтиВо'
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
			if ($(this).hasClass('underlined')) {
				$(this).removeClass('underlined');
				$(this).addClass('check_mark');
			} else if ($(this).hasClass('check_mark')) {
				$(this).removeClass('check_mark');
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
				$('.test' + n + ' .quantity').val() == $('.test' + n + ' .triangle').length - 1 &&
				$('.test' + n + ' .underlined .circle').length == $('.test' + n + ' .circle').length &&
				$('.test' + n + ' .check_mark .square').length == $('.test' + n + ' .square').length &&
				$('.test' + n + ' .check_mark .triangle').length == 0 &&
				$('.test' + n + ' .underlined .triangle').length == 0
			) {
				$('.test' + n + ' .result').html("Молодец! Всё верно!");
				$('.test' + n + ' .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
					$('.test' + n + ' .circle').parent('.cell').addClass('prompt');
					$('.test' + n + ' .square').parent('.cell').addClass('prompt');
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
			if ($(this).hasClass('crossed')) {
				$(this).removeClass('crossed');
			} else {
				$(this).addClass('crossed');
			}
			if (!timerId) {
				timerId = setInterval(timer, 1000);
			}
		});
		$('.test' + n + ' .verify').on('click', function (e) {
			attempt++;
			if (
				$('.test' + n + ' .crossed .trapezoid').length == $('.test' + n + ' .trapezoid').length &&
				$('.test' + n + ' .crossed .square').length == 0 &&
				$('.test' + n + ' .crossed .star').length == 0 &&
				$('.test' + n + ' .crossed .rhombus').length == 0 &&
				$('.test' + n + ' .crossed .cross').length == 0 &&
				$('.test' + n + ' .crossed .triangle').length == 0 &&
				$('.test' + n + ' .crossed .circle').length == 0
			) {
				$('.test' + n + ' .result').html("Молодец! Всё верно!");
				$('.test' + n + ' .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
					$('.test' + n + ' .trapezoid').parent('.cell').addClass('prompt');
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
	//-----3------
	let attempt1 = 0
	let res3 = ''
	$('.test3 .sea​_battle td').on('click', function (e) {
		if ($(this).hasClass('paint')) {
			$(this).removeClass('paint');
		} else {
			$(this).addClass('paint');
		}
	});
	$('.test3 .restart').on('click', function () {
		$('.test3 .sea​_battle td').removeClass('paint');
		$('.test3 .quantity').val("");
		$('.test3 .result').html("");
		$('.test3 .phrase').html("");
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
	var attempt2 = 0;
	let res4 = ''
	$('.test4 .underline_words td').not('.test4 .underline_words td:nth-child(1)').on('click', function (e) {
		if ($(this).hasClass('un')) {
			$(this).removeClass('un');
		} else {
			$(this).addClass('un');
		}
	});
	$('.test4 .restart').on('click', function () {
		$('.test4 .underline_words td').removeClass('un');
		$('.test4 .result').html("");
		$('.test4 .phrase').html("");
	});
	$('.test4 .verify').on('click', function (e) {
		attempt2++;
		var res = true;
		for (i = 1; i <= $('.test4 .underline_words tr').length; i++) {
			for (j = 2; j <= $('.test4 .underline_words tr:nth-child(1) td').length; j++) {
				if ($('.test4 .underline_words tr:nth-child(' + i + ') td:nth-child(' + j + ')').hasClass('un')) {
					if (
						$('.test4 .underline_words tr:nth-child(' + i + ') td:nth-child(' + j + ')').html() !=
						$('.test4 .underline_words tr:nth-child(' + i + ') td:nth-child(1)').html()
					) {
						res = false;
					}
				} else {
					if (
						$('.test4 .underline_words tr:nth-child(' + i + ') td:nth-child(' + j + ')').html() ==
						$('.test4 .underline_words tr:nth-child(' + i + ') td:nth-child(1)').html()
					) {
						res = false;
					}
				}
			}
		}
		if (res) {
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
			result = `Попыток: ${attempt2}%0AРезультат: ${res4}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 4', title, name, surname, result }, $(this))
		}
	});
	//----------5--------------
	$('.test5 .restart').on('click', function () {
		$('.test5 input').val("");
	});
	$(`.test5 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = ($('.test5 .count1').val() || '0') + ' из ' + ($('.test5 .count2').val() || '0') + '%0A1. ' + $('.test5 .word1 input').val() + ' 2. ' + $('.test5 .word2 input').val() + ' 3. ' + $('.test5 .word3 input').val() + ' 4. ' + $('.test5 .word4 input').val() + ' 5. ' + $('.test5 .word5 input').val() + ' 6. ' + $('.test5 .word6 input').val() + ' 7. ' + $('.test5 .word7 input').val() + ' 8. ' + $('.test5 .word8 input').val() + ' 9. ' + $('.test5 .word9 input').val() + ' 10. ' + $('.test5 .word10 input').val() + ' 11. ' + $('.test5 .word11 input').val() + ' 12. ' + $('.test5 .word12 input').val() + ' 13. ' + $('.test5 .word13 input').val() + ' 14. ' + $('.test5 .word14 input').val() + ' 15. ' + $('.test5 .word15 input').val() + ' 16. ' + $('.test5 .word16 input').val()
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 5', title, name, surname, result }, $(this))
		}
	});
});