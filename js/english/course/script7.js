$(document).ready(function () {
	const title = 'Занятие 7 Английский'
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
			$(`.test${n} .timer`).html(full_time);
		}
		$(`.test${n} .cell`).on('click', function (e) {
			e.preventDefault;
			if ($(this).hasClass('underlined')) {
				$(this).removeClass('underlined');
				$(this).addClass('crossed');
			} else if ($(this).hasClass('crossed')) {
				$(this).removeClass('crossed');
			} else {
				$(this).addClass('underlined');
			}
			if (!timerId) {
				timerId = setInterval(timer, 1000);
			}
		});
		$(`.test${n} .verify`).on('click', function (e) {
			attempt++;
			let cell = $(`.test${n} .cell`);
			let sum = 0, res = true;
			for (i = 0; i < cell.length; i++) {
				let html = cell.eq(i).html();
				if (attempt > 2) {
					if (html == 'lb') {
						cell.eq(i).addClass('prompt');
					}
				}
				if (cell.eq(i).hasClass('underlined')) {
					if (html != 'ld') {
						res = false;
					}
				} else if (cell.eq(i).hasClass('crossed')) {
					if (html != 'll') {
						res = false;
					}
				} else {
					if (html == 'ld' || html == 'll') {
						res = false;
					}
				}
				if (html == 'lb') {
					sum++;
				}
			}
			if ($(`.test${n} .answer1 .quantity`).val() == sum && res) {
				$(`.test${n} .result`).html("Молодец! Всё верно!");
				$(`.test${n} .phrase`).html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
					$(`.test${n} .square`).parent('.cell').addClass('prompt');
				}
				$(`.test${n} .result`).html("Ты где-то ошибся. Присмотрись повнимательнее!");
				$(`.test${n} .phrase`).html(phrase2[Math.floor(Math.random() * phrase2.length)]);
				res0 = 'неверно'
			}
			clearTimeout(timerId);
			timerId = false;
		});
		$(`.test${n} .restart`).on('click', function (e) {
			$(`.test${n} .cell`).removeClass('underlined');
			$(`.test${n} .cell`).removeClass('crossed');
			$(`.test${n} .quantity`).val("");
			$(`.test${n} .result`).html("");
			$(`.test${n} .phrase`).html("");
			clearTimeout(timerId);
			timerId = false;
			time = 0;
			full_time = '00:00';
			$(`.test${n} .timer`).html('00:00');
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
				sendAjaxForm('/send_test.php', { test: `Тест ${n}`, title, name, surname, result }, $(this))
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
			$(`.test${n} .timer`).html(full_time);
		}
		$(`.test${n} .cell`).on('click', function (e) {
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
		$(`.test${n} .verify`).on('click', function (e) {
			attempt++;
			let cell = $(`.test${n} .cell`);
			let res = true;
			for (i = 0; i < cell.length; i++) {
				let html = cell.eq(i).html();
				if (attempt > 2) {
					if (html == 'bull') {
						cell.eq(i).addClass('prompt');
					}
				}
				if (cell.eq(i).hasClass('crossed')) {
					if (html != 'bull') {
						res = false;
					}
				} else {
					if (html == 'bull') {
						res = false;
					}
				}
			}
			if (res) {
				$(`.test${n} .result`).html("Молодец! Всё верно!");
				$(`.test${n} .phrase`).html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
					$(`.test${n} .square`).parent('.cell').addClass('prompt');
				}
				$(`.test${n} .result`).html("Ты где-то ошибся. Присмотрись повнимательнее!");
				$(`.test${n} .phrase`).html(phrase2[Math.floor(Math.random() * phrase2.length)]);
				res0 = 'неверно'
			}
			clearTimeout(timerId);
			timerId = false;
		});
		$(`.test${n} .restart`).on('click', function (e) {
			$(`.test${n} .cell`).removeClass('crossed');
			$(`.test${n} .result`).html("");
			$(`.test${n} .phrase`).html("");
			clearTimeout(timerId);
			timerId = false;
			time = 0;
			full_time = '00:00';
			$(`.test${n} .timer`).html('00:00');
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
				sendAjaxForm('/send_test.php', { test: `Тест ${n}`, title, name, surname, result }, $(this))
			}
		});
	}
	//----------3--------------
	$('.test3 .restart').on('click', function () {
		$('.test3 textarea').val("");
	});
	$(`.test3 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = ($('.test3 .count1').val() || '0') + ' из ' + ($('.test3 .count2').val() || '0') + '%0A1. ' + $('.test3 .word1 input').val() + ' 2. ' + $('.test3 .word2 input').val() + ' 3. ' + $('.test3 .word3 input').val() + ' 4. ' + $('.test3 .word4 input').val() + ' 5. ' + $('.test3 .word5 input').val() + ' 6. ' + $('.test3 .word6 input').val() + ' 7. ' + $('.test3 .word7 input').val() + ' 8. ' + $('.test3 .word8 input').val() + ' 9. ' + $('.test3 .word9 input').val() + ' 10. ' + $('.test3 .word10 input').val() + ' 11. ' + $('.test3 .word11 input').val() + ' 12. ' + $('.test3 .word12 input').val() + ' 13. ' + $('.test3 .word13 input').val() + ' 14. ' + $('.test3 .word14 input').val() + ' 15. ' + $('.test3 .word15 input').val() + ' 16. ' + $('.test3 .word16 input').val()
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 3', title, name, surname, result }, $(this))
		}
	});
	//-----4------
	var canv1 = document.getElementById("c1");
	draw_test(canv1, "/img/correlate4.png", 4, 0.68);
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
	$('.test5 .restart').on('click', function () {
		$('.test5 input').val("");
	});
	$(`.test5 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = 'Winter: ' + $('.test5 .inp1').val() + ' Spring: ' + $('.test5 .inp2').val() + ' Summer: ' + $('.test5 .inp3').val() + ' Autumn: ' + $('.test5 .inp4').val()
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 5', title, name, surname, result }, $(this))
		}
	});
	//----------6--------------
	var attempt2 = 0;
	let res6 = ''
	$('.test6 .restart').on('click', function () {
		$('.test6 textarea').val("");
		$('.test6 input').val("");
		$('.test6 .result').html("");
		$('.test6 .phrase').html("");
	});
	$('.test6 .verify').on('click', function (e) {
		attempt2++;
		if (
			$('.test6 .inp1').val().trim().toLowerCase() == 'autumn' &&
			$('.test6 .inp2').val().trim().replace(/\s\s+|\n+/g, ' ').toLowerCase() == 'we gaze at the leaves so many colours it is hard to believe!' &&
			$('.test6 .inp3').val().trim().toLowerCase() == 'summer' &&
			$('.test6 .inp4').val().trim().replace(/\s\s+|\n+/g, ' ').toLowerCase() == 'we all feel the heat we swim at the beach' &&
			$('.test6 .inp5').val().trim().toLowerCase() == 'winter' &&
			$('.test6 .inp6').val().trim().replace(/\s\s+|\n+/g, ' ').toLowerCase() == 'we play in the snow cold on our fingers and cold on our toes!' &&
			$('.test6 .inp7').val().trim().toLowerCase() == 'spring' &&
			$('.test6 .inp8').val().trim().replace(/\s\s+|\n+/g, ' ').toLowerCase() == 'the birds are all tweeting they are hopping and singing!'
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
	//----------7--------------
	var attempt3 = 0;
	let res7 = ''
	$('.test7 .restart').on('click', function () {
		$('.test7 input').val("");
		$('.test7 .result').html("");
		$('.test7 .phrase').html("");
	});
	$('.test7 .verify').on('click', function (e) {
		attempt3++;
		if (
			$('.test7 .inp1').val().toLowerCase() == 'fly' &&
			$('.test7 .inp2').val().toLowerCase() == 'myth' &&
			$('.test7 .inp3').val().toLowerCase() == 'byrd' &&
			$('.test7 .inp4').val().toLowerCase() == 'type'
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
	//-----8------
	var canv2 = document.getElementById("c2");
	draw_test(canv2, "/img/find14.png", 8, 1.18);
	$(`.test8 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv2.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 8', title, name, surname, file }, $(this))
		}
	});
});