$(document).ready(function () {
	const title = 'Занятие 10 PROЧтиВо'
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
			if ($(this).hasClass('double_underlined')) {
				$(this).removeClass('double_underlined');
			} else {
				$(this).addClass('double_underlined');
			}
			if (!timerId) {
				timerId = setInterval(timer, 1000);
			}
		});
		$('.test' + n + ' .verify').on('click', function (e) {
			attempt++;
			if (
				$('.test' + n + ' .answer .quantity').val() == 5 &&
				$('.test' + n + ' .double_underlined .ans').length == $('.test' + n + ' .ans').length &&
				$('.test' + n + ' .double_underlined').length == $('.test' + n + ' .ans').length
			) {
				$('.test' + n + ' .result').html("Молодец! Всё верно!");
				$('.test' + n + ' .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
					$('.test' + n + ' .ans').parent('.cell').addClass('prompt');
				}
				$('.test' + n + ' .result').html("Ты где-то ошибся. Присмотрись повнимательнее!");
				$('.test' + n + ' .phrase').html(phrase2[Math.floor(Math.random() * phrase2.length)]);
				res0 = 'неверно'
			}
			clearTimeout(timerId);
			timerId = false;
		});
		$('.test' + n + ' .restart').on('click', function (e) {
			$('.test' + n + ' .cell').removeClass('double_underlined');
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
	var canv3 = document.getElementById("c95");
	draw_test(canv3, "/img/decorate28.png", 2, 0.91);
	$(`.test2 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv3.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 2', title, name, surname, file }, $(this))
		}
	});
	//-----3------
	var canv2 = document.getElementById("c96");
	draw_test(canv2, "/img/circle14.png", 3, 0.67);
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
	var canv1 = document.getElementById("c97");
	draw_test(canv1, "/img/img17.png", 4, 0.81);
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
	//-----5------
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
			$('.test5 .input1').val() == 3 &&
			$('.test5 .input2').val() == 4 &&
			$('.test5 .input3').val() == 3 &&
			$('.test5 .input4').val() == 1 &&
			$('.test5 .input5').val() == 10 &&
			$('.test5 .input6').val() == 8 &&
			$('.test5 .input7').val() == 6 &&
			$('.test5 .input8').val() == 2 &&
			$('.test5 .input9').val() == 8 &&
			$('.test5 .input10').val() == 5 &&
			$('.test5 .input11').val() == 4 &&
			$('.test5 .input12').val() == 7
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
	//-----6------
	var attempt3 = 0;
	let res6 = ''
	$('.test6 .restart').on('click', function () {
		$('.test6 input').val('');
		$('.test6 .result').html("");
		$('.test6 .phrase').html("");
	});
	$('.test6 .verify').on('click', function (e) {
		attempt3++;
		if (
			$('.test6 .quantity').val() == 24
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
			result = `Попыток: ${attempt3}%0AРезультат: ${res6}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 6', title, name, surname, result }, $(this))
		}
	});
	//-----7------
	var canv5 = document.getElementById("c98");
	draw_test(canv5, "/img/maze11.png", 7, 1.21);
	$(`.test7 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv5.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 7', title, name, surname, file }, $(this))
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