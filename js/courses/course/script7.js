$(document).ready(function () {
	const title = 'Занятие 7 ЧтиВо'
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
				$(this).addClass('double_crossed');
			} else if ($(this).hasClass('double_crossed')) {
				$(this).removeClass('double_crossed');
			} else {
				$(this).addClass('in_circle');
			}
			if (!timerId) {
				timerId = setInterval(timer, 1000);
			}
		});
		$('.test' + n + ' .verify').on('click', function (e) {
			attempt++;
			if (
				$('.test' + n + ' .quantity').val() == $('.test' + n + ' .square').length - 1 &&
				$('.test' + n + ' .in_circle .square').length == $('.test' + n + ' .square').length - 1 &&
				$('.test' + n + ' .double_crossed .triangle').length == $('.test' + n + ' .triangle').length &&
				$('.test' + n + ' .double_crossed .circle').length == 0 &&
				$('.test' + n + ' .in_circle .circle').length == 0
			) {
				$('.test' + n + ' .result').html("Молодец! Всё верно!");
				$('.test' + n + ' .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
					$('.test' + n + ' .square').parent('.cell').addClass('prompt');
					$('.test' + n + ' .triangle').parent('.cell').addClass('prompt');
				}
				$('.test' + n + ' .result').html("Ты где-то ошибся. Присмотрись повнимательнее!");
				$('.test' + n + ' .phrase').html(phrase2[Math.floor(Math.random() * phrase2.length)]);
				res0 = 'неверно'
			}
			clearTimeout(timerId);
			timerId = false;
		});
		$('.test' + n + ' .restart').on('click', function (e) {
			$('.test' + n + ' .cell').removeClass('in_circle');
			$('.test' + n + ' .cell').removeClass('double_crossed');
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
			if ($(this).hasClass('painted')) {
				$(this).removeClass('painted');
			} else {
				$(this).addClass('painted');
			}
			if (!timerId) {
				timerId = setInterval(timer, 1000);
			}
		});
		$('.test' + n + ' .verify').on('click', function (e) {
			attempt++;
			if (
				$('.test' + n + ' .painted .trapezoid').length == $('.test' + n + ' .trapezoid').length &&
				$('.test' + n + ' .painted .square').length == 0 &&
				$('.test' + n + ' .painted .cross').length == 0 &&
				$('.test' + n + ' .painted .star').length == 0 &&
				$('.test' + n + ' .painted .rhombus').length == 0 &&
				$('.test' + n + ' .painted .triangle').length == 0 &&
				$('.test' + n + ' .painted .circle').length == 0
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
			$('.test' + n + ' .cell').removeClass('painted');
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
	let canv1 = document.getElementById("c9")
	let attempt1 = 0
	let res3 = ''
	draw_test(canv1, "/img/grid7.png", 3, 0.53, 0.85);
	$('.test3 .verify').on('click', function (e) {
		attempt1++;
		if (
			$('.test3 .quantity').val().toLowerCase() == "змея" ||
			$('.test3 .quantity').val().toLowerCase() == "змейка"
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
		let file = canv1.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 3', title, name, surname, result, file }, $(this))
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
	//---------------------5-----------------------
	var attempt3 = 0
	let res5 = ''
	$('.test5 .pattern td').not('.cel').on('click', function (e) {
		e.preventDefault;
		if ($(this).html() == '∆') {
			$(this).html('–');
		} else if ($(this).html() == '–') {
			$(this).html('/');
		} else if ($(this).html() == '/') {
			$(this).html('|');
		} else if ($(this).html() == '|') {
			$(this).html('•');
		} else if ($(this).html() == '•') {
			$(this).html('\\');
		} else if ($(this).html() == '\\') {
			$(this).html('');
		} else {
			$(this).html('∆');
		}
	});
	$('.test5 .restart').on('click', function () {
		$('.test5 .pattern td').not('.cel').html('');
		$('.test5 .result').html("");
		$('.test5 .phrase').html("");
	});
	$('.test5 .verify').on('click', function (e) {
		attempt3++;
		var res = true;
		for (i = 0; i < $('.test5 .pattern td').not('.cel').length; i++) {
			if ($('.test5 .pattern td').not('.cel').eq(i).html() != $('.test5 .pattern td').not('.cel').eq(i).data('ans')) {
				res = false;
			}
		}
		if (res) {
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
	//----------6--------------
	$('.test6 .restart').on('click', function () {
		$('.test6 input').val("");
	});
	$(`.test6 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = ($('.test6 .count1').val() || '0') + ' из ' + ($('.test6 .count2').val() || '0') + '%0A1. ' + $('.test6 .word1 input').val() + ' 2. ' + $('.test6 .word2 input').val() + ' 3. ' + $('.test6 .word3 input').val() + ' 4. ' + $('.test6 .word4 input').val() + ' 5. ' + $('.test6 .word5 input').val() + ' 6. ' + $('.test6 .word6 input').val() + ' 7. ' + $('.test6 .word7 input').val() + ' 8. ' + $('.test6 .word8 input').val() + ' 9. ' + $('.test6 .word9 input').val() + ' 10. ' + $('.test6 .word10 input').val() + ' 11. ' + $('.test6 .word11 input').val() + ' 12. ' + $('.test6 .word12 input').val() + ' 13. ' + $('.test6 .word13 input').val() + ' 14. ' + $('.test6 .word14 input').val() + ' 15. ' + $('.test6 .word15 input').val() + ' 16. ' + $('.test6 .word16 input').val()
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 6', title, name, surname, result }, $(this))
		}
	});
});