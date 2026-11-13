$(document).ready(function () {
	const title = 'Занятие 2 ЧтиВо'
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
			if ($(this).hasClass('crossed')) {
				$(this).removeClass('crossed');
				$(this).addClass('check_mark');
			} else if ($(this).hasClass('check_mark')) {
				$(this).removeClass('crossed');
				$(this).removeClass('check_mark');
			} else {
				$(this).addClass('crossed');
				$(this).removeClass('check_mark');
			}
			if (!timerId) {
				timerId = setInterval(timer, 1000);
			}
		});
		$('.test' + n + ' .verify').on('click', function (e) {
			attempt++;
			if (
				$('.test' + n + ' .quantity').val() == $('.test' + n + ' .circle').length - 1 &&
				$('.test' + n + ' .crossed .circle').length == $('.test' + n + ' .circle').length - 1 &&
				$('.test' + n + ' .check_mark .square').length == $('.test' + n + ' .square').length &&
				$('.test' + n + ' .crossed .triangle').length == 0 &&
				$('.test' + n + ' .check_mark .triangle').length == 0
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
			$('.test' + n + ' .cell').removeClass('crossed');
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
				$('.test' + n + ' .underlined .triangle').length == $('.test' + n + ' .triangle').length &&
				$('.test' + n + ' .underlined .square').length == 0 &&
				$('.test' + n + ' .underlined .cross').length == 0 &&
				$('.test' + n + ' .underlined .rhombus').length == 0 &&
				$('.test' + n + ' .underlined .circle').length == 0 &&
				$('.test' + n + ' .underlined .star').length == 0 &&
				$('.test' + n + ' .underlined .trapezoid').length == 0
			) {
				$('.test' + n + ' .result').html("Молодец! Всё верно!");
				$('.test' + n + ' .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
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
	//-----3------
	let canv1 = document.getElementById("c3")
	let attempt1 = 0
	let res3 = ''
	draw_test(canv1, "/img/grid2.png", 3, 1, 0.85);
	$('.test3 .verify').on('click', function (e) {
		attempt1++;
		if (
			$('.test3 .quantity').val().toLowerCase() == "рыба" ||
			$('.test3 .quantity').val().toLowerCase() == "рыбка"
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
	let attempt2 = 0
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