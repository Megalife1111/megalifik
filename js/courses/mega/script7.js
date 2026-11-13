$(document).ready(function () {
	const title = 'Занятие 7 МегаЧтиВо'
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
			if ($(this).hasClass('dot')) {
				$(this).removeClass('dot');
				$(this).addClass('double_crossed');
			} else if ($(this).hasClass('double_crossed')) {
				$(this).removeClass('double_crossed');
			} else {
				$(this).addClass('dot');
			}
			if (!timerId) {
				timerId = setInterval(timer, 1000);
			}
		});
		$('.test' + n + ' .verify').on('click', function (e) {
			attempt++;
			if (
				$('.test' + n + ' .answer1 .quantity').val() == $('.test' + n + ' .triangle').length - 1 &&
				$('.test' + n + ' .answer2 .quantity').val() == $('.test' + n + ' .rhombus').length - 1 &&
				$('.test' + n + ' .dot .rhombus').length == $('.test' + n + ' .rhombus').length - 1 &&
				$('.test' + n + ' .double_crossed .circle').length == $('.test' + n + ' .circle').length &&
				$('.test' + n + ' .dot .circle').length == 0 &&
				$('.test' + n + ' .dot .triangle').length == 0 &&
				$('.test' + n + ' .dot .square').length == 0 &&
				$('.test' + n + ' .double_crossed .square').length == 0 &&
				$('.test' + n + ' .double_crossed .rhombus').length == 0 &&
				$('.test' + n + ' .double_crossed .triangle').length == 0
			) {
				$('.test' + n + ' .result').html("Молодец! Всё верно!");
				$('.test' + n + ' .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
					$('.test' + n + ' .rhombus').parent('.cell').addClass('prompt');
					$('.test' + n + ' .circle').parent('.cell').addClass('prompt');
				}
				$('.test' + n + ' .result').html("Ты где-то ошибся. Присмотрись повнимательнее!");
				$('.test' + n + ' .phrase').html(phrase2[Math.floor(Math.random() * phrase2.length)]);
				res0 = 'неверно'
			}
			clearTimeout(timerId);
			timerId = false;
		});
		$('.test' + n + ' .restart').on('click', function (e) {
			$('.test' + n + ' .cell').removeClass('dot');
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
			if ($(this).hasClass('in_circle')) {
				$(this).removeClass('in_circle');
			} else {
				$(this).addClass('in_circle');
			}
			if (!timerId) {
				timerId = setInterval(timer, 1000);
			}
		});
		$('.test' + n + ' .verify').on('click', function (e) {
			attempt++;
			var res = true;
			for (i = 0; i < $('.test' + n + ' .cell').length; i++) {
				if (attempt > 2) {
					if ($('.test' + n + ' .cell').eq(i).html() == 'А') {
						$('.test' + n + ' .cell').eq(i).addClass('prompt');
					}
				}
				if ($('.test' + n + ' .cell').eq(i).hasClass('in_circle')) {
					if ($('.test' + n + ' .cell').eq(i).html() != 'А') {
						res = false;
					}
				} else {
					if ($('.test' + n + ' .cell').eq(i).html() == 'А') {
						res = false;
					}
				}
			}
			if (res) {
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
			$('.test' + n + ' .cell').removeClass('in_circle');
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
	let canv1 = document.getElementById("c19")
	let attempt1 = 0
	let res3 = ''
	draw_test(canv1, "/img/grid14.png", 3, 0.81, 0.85);
	$('.test3 .verify').on('click', function (e) {
		attempt1++;
		if (
			$('.test3 .quantity').val().toLowerCase() == "динозавр"
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
	//---------------------4-----------------------
	var attempt2 = 0;
	let res4 = ''
	$('.test4 .verify').on('click', function (e) {
		attempt2++;
		if (
			$('.test4 .word1 input').val().toLowerCase() == $('.test4 .word1 .label').html() &&
			$('.test4 .word2 input').val().toLowerCase() == $('.test4 .word2 .label').html() &&
			$('.test4 .word3 input').val().toLowerCase() == $('.test4 .word3 .label').html() &&
			$('.test4 .word4 input').val().toLowerCase() == $('.test4 .word4 .label').html() &&
			$('.test4 .word5 input').val().toLowerCase() == $('.test4 .word5 .label').html() &&
			$('.test4 .word6 input').val().toLowerCase() == $('.test4 .word6 .label').html() &&
			$('.test4 .word7 input').val().toLowerCase() == $('.test4 .word7 .label').html() &&
			$('.test4 .word8 input').val().toLowerCase() == $('.test4 .word8 .label').html() &&
			$('.test4 .word9 input').val().toLowerCase() == $('.test4 .word9 .label').html() &&
			$('.test4 .word10 input').val().toLowerCase() == $('.test4 .word10 .label').html()
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
	$('.test4 .restart').on('click', function () {
		$('.test4 input').val("");
		$('.test4 .result').html("");
		$('.test4 .phrase').html("");
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
	var canv2 = document.getElementById("c28");
	draw_test(canv2, "/img/find2.png", 5, 1.38);
	$(`.test5 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv2.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 5', title, name, surname, file }, $(this))
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