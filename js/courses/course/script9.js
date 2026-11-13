$(document).ready(function () {
	const title = 'Занятие 9 ЧтиВо'
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
				$(this).addClass('dot');
			} else if ($(this).hasClass('dot')) {
				$(this).removeClass('dot');
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
				$('.test' + n + ' .in_circle .circle').length == $('.test' + n + ' .circle').length &&
				$('.test' + n + ' .dot .triangle').length == $('.test' + n + ' .triangle').length &&
				$('.test' + n + ' .dot .square').length == 0 &&
				$('.test' + n + ' .in_circle .square').length == 0
			) {
				$('.test' + n + ' .result').html("Молодец! Всё верно!");
				$('.test' + n + ' .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
					$('.test' + n + ' .circle').parent('.cell').addClass('prompt');
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
			$('.test' + n + ' .cell').removeClass('dot');
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
				$('.test' + n + ' .underlined .rhombus').length == $('.test' + n + ' .rhombus').length &&
				$('.test' + n + ' .underlined .square').length == 0 &&
				$('.test' + n + ' .underlined .trapezoid').length == 0 &&
				$('.test' + n + ' .underlined .star').length == 0 &&
				$('.test' + n + ' .underlined .cross').length == 0 &&
				$('.test' + n + ' .underlined .triangle').length == 0 &&
				$('.test' + n + ' .underlined .circle').length == 0
			) {
				$('.test' + n + ' .result').html("Молодец! Всё верно!");
				$('.test' + n + ' .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
					$('.test' + n + ' .rhombus').parent('.cell').addClass('prompt');
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
	let canv1 = document.getElementById("c11")
	let attempt1 = 0
	let res3 = ''
	draw_test(canv1, "/img/grid9.png", 3, 0.93, 0.85);
	$('.test3 .verify').on('click', function (e) {
		attempt1++;
		if (
			$('.test3 .quantity').val().toLowerCase() == "машина"
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
	$('.test4 .restart').on('click', function () {
		$('.test4 input').val('');
		$('.test4 .result').html("");
		$('.test4 .phrase').html("");
	});
	$('.test4 .verify').on('click', function (e) {
		attempt2++;
		if (
			$('.test4 .inp1').val().toLowerCase() == "кукла" &&
			$('.test4 .inp2').val().toLowerCase() == "лук" &&
			$('.test4 .inp3').val().toLowerCase() == "рога" &&
			$('.test4 .inp4').val().toLowerCase() == "дверь" &&
			$('.test4 .inp5').val().toLowerCase() == "волосы"
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
	//---------------------5-----------------------
	var attempt3 = 0;
	let res5 = ''
	$('.test5 .syllable').on('click', function () {
		if ($(this).hasClass('cr')) {
			$(this).removeClass('cr');
		} else {
			$(this).addClass('cr');
			$(this).siblings().removeClass('cr');
		}
	});
	$('.test5 .restart').on('click', function () {
		$('.test5 .syllable').removeClass('cr');
		$('.test5 .result').html("");
		$('.test5 .phrase').html("");
	});
	$('.test5 .verify').on('click', function (e) {
		attempt3++;
		if (
			$('.test5 .word1 .cr').html() == 'БО' &&
			$('.test5 .word2 .cr').hasClass('this') &&
			$('.test5 .word3 .cr').html() == 'КА' &&
			$('.test5 .word4 .cr').html() == 'ПИ' &&
			$('.test5 .word5 .cr').html() == 'ГЕ' &&
			$('.test5 .word6 .cr').html() == 'РА' &&
			$('.test5 .word7 .cr').html() == 'БО' &&
			$('.test5 .word8 .cr').html() == 'СО' &&
			$('.test5 .word9 .cr').html() == 'ЛУ' &&
			$('.test5 .word10 .cr').html() == 'РО' &&
			$('.test5 .word11 .cr').html() == 'БО' &&
			$('.test5 .word12 .cr').html() == 'БЕ'
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
		$('.test6 input').val('');
		$('.test6 .result').html("");
		$('.test6 .phrase').html("");
	});

	$('.test6 .verify').on('click', function (e) {
		attempt4++;
		if (
		/*ПО*/	($('.test6 .word1 input').val().toUpperCase() == 'Л' || $('.test6 .word1 input').val().toUpperCase() == 'Т' || $('.test6 .word1 input').val().toUpperCase() == 'П') &&
		/*ДА*/	($('.test6 .word2 input').val().toUpperCase() == 'Р') &&
		/*ГА*/	($('.test6 .word3 input').val().toUpperCase() == 'З' || $('.test6 .word3 input').val().toUpperCase() == 'Д' || $('.test6 .word3 input').val().toUpperCase() == 'М') &&
		/*БО*/	($('.test6 .word4 input').val().toUpperCase() == 'Г' || $('.test6 .word4 input').val().toUpperCase() == 'Т' || $('.test6 .word4 input').val().toUpperCase() == 'К' || $('.test6 .word4 input').val().toUpperCase() == 'Р' || $('.test6 .word4 input').val().toUpperCase() == 'Б') &&
		/*НО*/	($('.test6 .word5 input').val().toUpperCase() == 'С' || $('.test6 .word5 input').val().toUpperCase() == 'Ж') &&
		/*ХО*/	($('.test6 .word6 input').val().toUpperCase() == 'Д' || $('.test6 .word6 input').val().toUpperCase() == 'Р') &&
		/*ША*/	($('.test6 .word7 input').val().toUpperCase() == 'Г' || $('.test6 .word7 input').val().toUpperCase() == 'Р') &&
		/*КИ*/	($('.test6 .word8 input').val().toUpperCase() == 'Т') &&
		/*ВО*/	($('.test6 .word9 input').val().toUpperCase() == 'Р' || $('.test6 .word9 input').val().toUpperCase() == 'Л' || $('.test6 .word9 input').val().toUpperCase() == 'З' || $('.test6 .word9 input').val().toUpperCase() == 'Т') &&
		/*НО*/	($('.test6 .word10 input').val().toUpperCase() == 'С' || $('.test6 .word10 input').val().toUpperCase() == 'Ж') &&
		/*ВО*/	($('.test6 .word11 input').val().toUpperCase() == 'Р' || $('.test6 .word11 input').val().toUpperCase() == 'Л' || $('.test6 .word11 input').val().toUpperCase() == 'З' || $('.test6 .word11 input').val().toUpperCase() == 'Т') &&
		/*ГО*/	($('.test6 .word12 input').val().toUpperCase() == 'Л' || $('.test6 .word12 input').val().toUpperCase() == 'Т' || $('.test6 .word12 input').val().toUpperCase() == 'Д') &&
		/*ПА*/	($('.test6 .word13 input').val().toUpperCase() == 'Р' || $('.test6 .word13 input').val().toUpperCase() == 'Н' || $('.test6 .word13 input').val().toUpperCase() == 'Х' || $('.test6 .word13 input').val().toUpperCase() == 'С') &&
		/*ПИ*/	($('.test6 .word14 input').val().toUpperCase() == 'Р' || $('.test6 .word14 input').val().toUpperCase() == 'К') &&
		/*ЗА*/	($('.test6 .word15 input').val().toUpperCase() == 'Л' || $('.test6 .word15 input').val().toUpperCase() == 'Д') &&
		/*КО*/	($('.test6 .word16 input').val().toUpperCase() == 'Т' || $('.test6 .word16 input').val().toUpperCase() == 'Л' || $('.test6 .word16 input').val().toUpperCase() == 'К' || $('.test6 .word16 input').val().toUpperCase() == 'Д' || $('.test6 .word16 input').val().toUpperCase() == 'М')
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