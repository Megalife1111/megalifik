$(document).ready(function () {
	const title = 'Занятие 12 НейроЧтиВо'
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
				$(this).addClass('in_triangle');
			} else if ($(this).hasClass('in_triangle')) {
				$(this).removeClass('in_triangle');
				$(this).removeClass('underlined');
			} else {
				$(this).addClass('underlined');
				$(this).removeClass('in_triangle');
			}
			if (!timerId) {
				timerId = setInterval(timer, 1000);
			}
		});
		$('.test' + n + ' .verify').on('click', function (e) {
			attempt++;
			if (
				$('.test' + n + ' .answer1 .quantity').val() == $('.test' + n + ' .m1').length - 1 &&
				$('.test' + n + ' .answer2 .quantity').val() == $('.test' + n + ' .f3').length - 1 &&
				$('.test' + n + ' .underlined .m3').length == $('.test' + n + ' .m3').length &&
				$('.test' + n + ' .in_triangle .f1').length == $('.test' + n + ' .f1').length &&
				$('.test' + n + ' .underlined .m1').length == 0 &&
				$('.test' + n + ' .underlined .m2').length == 0 &&
				$('.test' + n + ' .underlined .f1').length == 0 &&
				$('.test' + n + ' .underlined .f2').length == 0 &&
				$('.test' + n + ' .underlined .f3').length == 0 &&
				$('.test' + n + ' .in_triangle .m1').length == 0 &&
				$('.test' + n + ' .in_triangle .m2').length == 0 &&
				$('.test' + n + ' .in_triangle .m3').length == 0 &&
				$('.test' + n + ' .in_triangle .f2').length == 0 &&
				$('.test' + n + ' .in_triangle .f3').length == 0
			) {
				$('.test' + n + ' .result').html("Молодец! Всё верно!");
				$('.test' + n + ' .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
					$('.test' + n + ' .m3').parent('.cell').addClass('prompt');
					$('.test' + n + ' .f1').parent('.cell').addClass('prompt');
				}
				$('.test' + n + ' .result').html("Ты где-то ошибся. Присмотрись повнимательнее!");
				$('.test' + n + ' .phrase').html(phrase2[Math.floor(Math.random() * phrase2.length)]);
				res0 = 'неверно'
			}
			clearTimeout(timerId);
			timerId = false;
		});
		$('.test' + n + ' .restart').on('click', function (e) {
			$('.test' + n + ' .cell').removeClass('in_triangle');
			$('.test' + n + ' .cell').removeClass('underlined');
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
				$('.test' + n + ' .underlined .m1').length == $('.test' + n + ' .m1').length &&
				$('.test' + n + ' .underlined .m2').length == 0 &&
				$('.test' + n + ' .underlined .m3').length == 0
			) {
				$('.test' + n + ' .result').html("Молодец! Всё верно!");
				$('.test' + n + ' .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
					$('.test' + n + ' .m1').parent('.cell').addClass('prompt');
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
	var canv2 = document.getElementById("c53");
	draw_test(canv2, "/img/fileword12.png", 3, 0.72);
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
	var canv1 = document.getElementById("c54");
	draw_test(canv1, "/img/circle4.png", 4, 1.24);
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
			$('.test5 .inp1').val().toLowerCase() == "на сердитых воду возят." &&
			$('.test5 .inp2').val().toLowerCase() == "азбука - к мудрости ступень." &&
			$('.test5 .inp3').val().toLowerCase() == "первый шаг труден." &&
			$('.test5 .inp4').val().toLowerCase() == "где гнев, там вред."
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