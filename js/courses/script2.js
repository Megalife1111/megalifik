$(document).ready(function () {
	const title = 'Пробное занятие по Английскому'
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
				$('.test' + n + ' .answer .quantity').val() == $('.test' + n + ' .letterD').length &&
				$('.test' + n + ' .in_circle .letterR').length == $('.test' + n + ' .letterR').length &&
				$('.test' + n + ' .crossed .letterL').length == $('.test' + n + ' .letterL').length &&
				$('.test' + n + ' .in_circle .letterL').length == 0 &&
				$('.test' + n + ' .in_circle .letterD').length == 0 &&
				$('.test' + n + ' .crossed .letterR').length == 0 &&
				$('.test' + n + ' .crossed .letterD').length == 0
			) {
				$('.test' + n + ' .result').html("Молодец! Всё верно!");
				$('.test' + n + ' .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
					$('.test' + n + ' .letterD').parent('.cell').addClass('prompt');
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
				$('.test' + n + ' .crossed .letterL').length == $('.test' + n + ' .letterL').length &&
				$('.test' + n + ' .crossed .letterOth').length == 0
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
	//----------3--------------
	var attempt3 = 0;
	let res3 = ''
	$('.test3 .verify').on('click', function (e) {
		attempt3++;
		if (
			$('.test3 .inp1').val().toLowerCase().replace(/[\s.,%]/g, '') == "tolaughtocrytodrinktoeattodrive"
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
		$('.test3 .quantity').val("");
		$('.test3 .result').html("");
		$('.test3 .phrase').html("");
	});
	$(`.test3 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = 'Попыток: 0'
		if (res3) {
			result = `Попыток: ${attempt3}%0AРезультат: ${res3}`
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
	var attempt2 = 0;
	let res4 = ''
	$('.test4 .restart').on('click', function () {
		$('.test4 input').val("");
		$('.test4 .result').html("");
		$('.test4 .phrase').html("");
	});
	$('.test4 .verify').on('click', function (e) {
		attempt2++;
		if (
			$('.test4 .letter1 input').val().toLowerCase() == 'i' &&
			$('.test4 .letter2 input').val().toLowerCase() == 'l' &&
			$('.test4 .letter3 input').val().toLowerCase() == 'o' &&
			$('.test4 .letter4 input').val().toLowerCase() == 'v' &&
			$('.test4 .letter5 input').val().toLowerCase() == 'e' &&
			$('.test4 .letter6 input').val().toLowerCase() == 'y' &&
			$('.test4 .letter7 input').val().toLowerCase() == 'o' &&
			$('.test4 .letter8 input').val().toLowerCase() == 'u' &&
			$('.test4 .letter9 input').val().toLowerCase() == 'd' &&
			$('.test4 .letter10 input').val().toLowerCase() == 'e' &&
			$('.test4 .letter11 input').val().toLowerCase() == 'a' &&
			$('.test4 .letter12 input').val().toLowerCase() == 'r'
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
	var attempt4 = 0;
	let res5 = ''
	$('.test5 .restart').on('click', function () {
		$('.test5 input').val('');
		$('.test5 .result').html("");
		$('.test5 .phrase').html("");
	});
	$('.test5 .verify').on('click', function (e) {
		attempt4++;
		if (
			$('.test5 .inp1').val().toLowerCase() == "op" &&
			$('.test5 .inp2').val().toLowerCase() == "at" &&
			$('.test5 .inp3').val().toLowerCase() == "og" &&
			$('.test5 .inp4').val().toLowerCase() == "ox" &&
			$('.test5 .inp5').val().toLowerCase() == "un" &&
			$('.test5 .inp6').val().toLowerCase() == "ee" &&
			$('.test5 .inp7').val().toLowerCase() == "ea"
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
			result = `Попыток: ${attempt4}%0AРезультат: ${res5}`
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
	var attempt5 = 0;
	let res6 = ''
	$('.test6 .verify').on('click', function (e) {
		attempt5++;
		if (
			$('.test6 .word1 input').val().toLowerCase() == $('.test6 .word1 .label').html().toLowerCase() &&
			$('.test6 .word2 input').val().toLowerCase() == $('.test6 .word2 .label').html().toLowerCase() &&
			$('.test6 .word3 input').val().toLowerCase() == $('.test6 .word3 .label').html().toLowerCase() &&
			$('.test6 .word4 input').val().toLowerCase() == $('.test6 .word4 .label').html().toLowerCase()
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
		$('.test6 .word1 input').val("");
		$('.test6 .word2 input').val("");
		$('.test6 .word3 input').val("");
		$('.test6 .word4 input').val("");
	});
	$(`.test6 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = 'Попыток: 0'
		if (res6) {
			result = `Попыток: ${attempt5}%0AРезультат: ${res6}`
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
	let attempt6 = 0;
	let time1 = 30;
	let timerId1 = false;
	let cur_time = 30;
	let res7 = ''
	$('.test7 .time').on('click', function (e) {
		if (!$(this).hasClass('sel')) {
			cur_time = $(this).html();
			$('.test7 .time').removeClass('sel');
			$(this).addClass('sel');
			$('.test7 .cur_time').html(cur_time);
			$('.memory3 .example').addClass('closed');
			$('.memory3 .empty').removeClass('closed');
			time1 = cur_time;
			$('.memory3 .timer').html(time1);
			clearTimeout(timerId1);
			timerId1 = false;
		}
	});
	$('.memory3 .start_timer').on('click', function (e) {
		$('.memory3 .example').removeClass('closed');
		$('.memory3 .empty').addClass('closed');
		timerId1 = setInterval(function () {
			time1--;
			$('.memory3 .timer').html(time1);
			if (time1 < 1) {
				$('.memory3 .example').addClass('closed');
				$('.memory3 .empty').removeClass('closed');
				time1 = cur_time;
				$('.memory3 .timer').html(time1);
				clearTimeout(timerId1);
				timerId1 = false;
			}
		}, 1000);
	});
	$('.test7 .verify').on('click', function (e) {
		attempt6++;
		if (
			$('.memory3 .empty tr:nth-child(1) td:nth-child(1) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(1) td:nth-child(1)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(1) td:nth-child(2) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(1) td:nth-child(2)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(1) td:nth-child(3) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(1) td:nth-child(3)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(1) td:nth-child(4) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(1) td:nth-child(4)').html().toLowerCase() &&

			$('.memory3 .empty tr:nth-child(2) td:nth-child(1) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(2) td:nth-child(1)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(2) td:nth-child(2) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(2) td:nth-child(2)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(2) td:nth-child(3) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(2) td:nth-child(3)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(2) td:nth-child(4) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(2) td:nth-child(4)').html().toLowerCase() &&

			$('.memory3 .empty tr:nth-child(3) td:nth-child(1) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(3) td:nth-child(1)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(3) td:nth-child(2) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(3) td:nth-child(2)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(3) td:nth-child(3) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(3) td:nth-child(3)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(3) td:nth-child(4) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(3) td:nth-child(4)').html().toLowerCase() &&

			$('.memory3 .empty tr:nth-child(4) td:nth-child(1) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(4) td:nth-child(1)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(4) td:nth-child(2) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(4) td:nth-child(2)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(4) td:nth-child(3) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(4) td:nth-child(3)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(4) td:nth-child(4) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(4) td:nth-child(4)').html().toLowerCase() &&

			$('.memory3 .empty tr:nth-child(5) td:nth-child(1) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(5) td:nth-child(1)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(5) td:nth-child(2) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(5) td:nth-child(2)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(5) td:nth-child(3) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(5) td:nth-child(3)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(5) td:nth-child(4) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(5) td:nth-child(4)').html().toLowerCase() &&

			$('.memory3 .empty tr:nth-child(6) td:nth-child(1) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(6) td:nth-child(1)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(6) td:nth-child(2) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(6) td:nth-child(2)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(6) td:nth-child(3) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(6) td:nth-child(3)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(6) td:nth-child(4) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(6) td:nth-child(4)').html().toLowerCase() &&

			$('.memory3 .empty tr:nth-child(7) td:nth-child(1) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(7) td:nth-child(1)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(7) td:nth-child(2) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(7) td:nth-child(2)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(7) td:nth-child(3) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(7) td:nth-child(3)').html().toLowerCase() &&
			$('.memory3 .empty tr:nth-child(7) td:nth-child(4) input').val().toLowerCase() == $('.memory3 .example tr:nth-child(7) td:nth-child(4)').html().toLowerCase()
		) {
			$('.test7 .result').html("Молодец! Всё верно!");
			$('.test7 .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
			res7 = 'верно'
		} else {
			$('.test7 .result').html("Ты где-то ошибся. Присмотрись повнимательнее!");
			$('.test7 .phrase').html(phrase2[Math.floor(Math.random() * phrase2.length)]);
			res7 = 'неверно'
		}
	});
	$('.test7 .restart').on('click', function () {
		$('.memory3 .empty input').val('');
		$('.test7 .result').html("");
		$('.test7 .phrase').html("");
		$('.memory3 .example').addClass('closed');
		$('.memory3 .empty').removeClass('closed');
		time1 = cur_time;
		$('.memory3 .timer').html(time1);
		clearTimeout(timerId1);
		timerId1 = false;
	});
	$(`.test7 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = 'Попыток: 0'
		if (res7) {
			result = `Попыток: ${attempt6}%0AРезультат: ${res7}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 7', title, name, surname, result }, $(this))
		}
	});
	//----------10--------------
	$('.test10 .restart').on('click', function () {
		$('.test10 input').val("");
	});
	$(`.test10 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = ($('.test10 .count1').val() || '0') + ' из ' + ($('.test10 .count2').val() || '0') + '%0A1. ' + $('.test10 .word1 input').val() + ' 2. ' + $('.test10 .word2 input').val() + ' 3. ' + $('.test10 .word3 input').val() + ' 4. ' + $('.test10 .word4 input').val() + ' 5. ' + $('.test10 .word5 input').val() + ' 6. ' + $('.test10 .word6 input').val() + ' 7. ' + $('.test10 .word7 input').val() + ' 8. ' + $('.test10 .word8 input').val() + ' 9. ' + $('.test10 .word9 input').val() + ' 10. ' + $('.test10 .word10 input').val() + ' 11. ' + $('.test10 .word11 input').val() + ' 12. ' + $('.test10 .word12 input').val() + ' 13. ' + $('.test10 .word13 input').val() + ' 14. ' + $('.test10 .word14 input').val() + ' 15. ' + $('.test10 .word15 input').val() + ' 16. ' + $('.test10 .word16 input').val()
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 10', title, name, surname, result }, $(this))
		}
	});
});