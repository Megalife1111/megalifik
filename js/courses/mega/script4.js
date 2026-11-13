$(document).ready(function () {
	const title = 'Занятие 4 МегаЧтиВо'
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
				$('.test' + n + ' .answer1 .quantity').val() == $('.test' + n + ' .triangle').length - 1 &&
				$('.test' + n + ' .answer2 .quantity').val() == $('.test' + n + ' .square').length - 1 &&
				$('.test' + n + ' .crossed .square').length == $('.test' + n + ' .square').length - 1 &&
				$('.test' + n + ' .crossed .circle').length == 0 &&
				$('.test' + n + ' .crossed .triangle').length == 0
			) {
				$('.test' + n + ' .result').html("Молодец! Всё верно!");
				$('.test' + n + ' .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
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
			var res = true;
			for (i = 0; i < $('.test' + n + ' .cell').length; i++) {
				if (attempt > 2) {
					if ($('.test' + n + ' .cell').eq(i).html() == 'г') {
						$('.test' + n + ' .cell').eq(i).addClass('prompt');
					}
				}
				if ($('.test' + n + ' .cell').eq(i).hasClass('underlined')) {
					if ($('.test' + n + ' .cell').eq(i).html() != 'г') {
						res = false;
					}
				} else {
					if ($('.test' + n + ' .cell').eq(i).html() == 'г') {
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
	var canv2 = document.getElementById("c32");
	draw_test(canv2, "/img/fileword2.png", 3, 0.72);
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
	//---------------------4-----------------------
	var attempt1 = 0;
	let res4 = ''
	$('.test4 .restart').on('click', function () {
		$('.test4 input').val("");
		$('.test4 .result').html("");
		$('.test4 .phrase').html("");
	});
	$('.test4 .verify').on('click', function (e) {
		attempt1++;
		if (
			$('.test4 .letter1 input').val().toLowerCase() == 'т' &&
			$('.test4 .letter2 input').val().toLowerCase() == 'р' &&
			$('.test4 .letter3 input').val().toLowerCase() == 'и' &&
			$('.test4 .letter4 input').val().toLowerCase() == 'с' &&
			$('.test4 .letter5 input').val().toLowerCase() == 'о' &&
			$('.test4 .letter6 input').val().toLowerCase() == 'р' &&
			$('.test4 .letter7 input').val().toLowerCase() == 'о' &&
			$('.test4 .letter8 input').val().toLowerCase() == 'к' &&
			$('.test4 .letter9 input').val().toLowerCase() == 'и' &&
			$('.test4 .letter10 input').val().toLowerCase() == 'т' &&
			$('.test4 .letter11 input').val().toLowerCase() == 'а' &&
			$('.test4 .letter12 input').val().toLowerCase() == 'р' &&
			$('.test4 .letter13 input').val().toLowerCase() == 'а' &&
			$('.test4 .letter14 input').val().toLowerCase() == 'т' &&
			$('.test4 .letter15 input').val().toLowerCase() == 'о' &&
			$('.test4 .letter16 input').val().toLowerCase() == 'р' &&
			$('.test4 .letter17 input').val().toLowerCase() == 'к' &&
			$('.test4 .letter18 input').val().toLowerCase() == 'и' &&
			$('.test4 .letter19 input').val().toLowerCase() == 'т' &&
			$('.test4 .letter20 input').val().toLowerCase() == 'а' &&
			$('.test4 .letter21 input').val().toLowerCase() == 'р' &&
			$('.test4 .letter22 input').val().toLowerCase() == 'а' &&
			$('.test4 .letter23 input').val().toLowerCase() == 'т' &&
			$('.test4 .letter24 input').val().toLowerCase() == 'о' &&
			$('.test4 .letter25 input').val().toLowerCase() == 'р' &&
			$('.test4 .letter26 input').val().toLowerCase() == 'и' &&
			$('.test4 .letter27 input').val().toLowerCase() == 'л' &&
			$('.test4 .letter28 input').val().toLowerCase() == 'и' &&
			$('.test4 .letter29 input').val().toLowerCase() == 'н' &&
			$('.test4 .letter30 input').val().toLowerCase() == 'а' &&
			$('.test4 .letter31 input').val().toLowerCase() == 'г' &&
			$('.test4 .letter32 input').val().toLowerCase() == 'о' &&
			$('.test4 .letter33 input').val().toLowerCase() == 'р' &&
			$('.test4 .letter34 input').val().toLowerCase() == 'к' &&
			$('.test4 .letter35 input').val().toLowerCase() == 'е'
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
			result = `Попыток: ${attempt1}%0AРезультат: ${res4}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 4', title, name, surname, result }, $(this))
		}
	});
	//-----5------
	var canv1 = document.getElementById("c16");
	draw_test(canv1, "/img/mirrored2.png", 5, 0.55);
	$(`.test5 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv1.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 5', title, name, surname, file }, $(this))
		}
	});
	//---------------------6-----------------------
	var attempt2 = 0;
	let res6 = ''
	$('.test6 .verify').on('click', function (e) {
		attempt2++;
		if (
			$('.test6 .quantity').val() == 9
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
		$('.test6 .quantity').val('');
		$('.test6 .result').html("");
		$('.test6 .phrase').html("");
	});
	$(`.test6 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = 'Попыток: 0'
		if (res6) {
			result = `Попыток: ${attempt2}%0AРезультат: ${res6}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 6', title, name, surname, result }, $(this))
		}
	});
	//---------------------7-----------------------
	var attempt3 = 0;
	$('.test7 .verify').on('click', function (e) {
		attempt3++;
		if (
			$('.test7 .quantity').val().toLowerCase() == 'грумушама'
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
		$('.test7 .quantity').val('');
		$('.test7 .result').html("");
		$('.test7 .phrase').html("");
	});
	$(`.test7 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = 'Попыток: 0'
		if (res7) {
			result = `Попыток: ${attempt3}%0AРезультат: ${res7}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 7', title, name, surname, result }, $(this))
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