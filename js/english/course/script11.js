$(document).ready(function () {
	const title = 'Занятие 11 Английский'
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
			if ($(this).hasClass('in_circle')) {
				$(this).removeClass('in_circle');
				$(this).addClass('crossed');
			} else if ($(this).hasClass('crossed')) {
				$(this).removeClass('crossed');
			} else {
				$(this).addClass('in_circle');
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
					if (html == 'ite') {
						cell.eq(i).addClass('prompt');
					}
				}
				if (cell.eq(i).hasClass('in_circle')) {
					if (html != 'ine') {
						res = false;
					}
				} else if (cell.eq(i).hasClass('crossed')) {
					if (html != 'ane') {
						res = false;
					}
				} else {
					if (html == 'ine' || html == 'ane') {
						res = false;
					}
				}
				if (html == 'ite') {
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
			$(`.test${n} .cell`).removeClass('in_circle');
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
			if ($(this).hasClass('in_circle')) {
				$(this).removeClass('in_circle');
			} else {
				$(this).addClass('in_circle');
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
					if (html == 'kite') {
						cell.eq(i).addClass('prompt');
					}
				}
				if (cell.eq(i).hasClass('in_circle')) {
					if (html != 'kite') {
						res = false;
					}
				} else {
					if (html == 'kite') {
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
			$(`.test${n} .cell`).removeClass('in_circle');
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
	//-----3------
	var canv1 = document.getElementById("c1");
	draw_test(canv1, "/img/correlate9.png", 3, 0.19);
	$(`.test3 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv1.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 3', title, name, surname, file }, $(this))
		}
	});
	//-----4------
	var canv2 = document.getElementById("c2");
	draw_test(canv2, "/img/correlate10.png", 4, 0.56);
	$(`.test4 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv2.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 4', title, name, surname, file }, $(this))
		}
	});
	//-----5------
	var canv3 = document.getElementById("c3");
	draw_test(canv3, "/img/correlate11.png", 5, 0.46);
	$(`.test5 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv3.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 5', title, name, surname, file }, $(this))
		}
	});
	//----------7--------------
	var attempt1 = 0;
	let res7 = ''
	$('.test7 .restart').on('click', function () {
		$('.test7 input').val("");
		$('.test7 .result').html("");
		$('.test7 .phrase').html("");
	});
	$('.test7 .verify').on('click', function (e) {
		attempt1++;
		if (
			$('.test7 .inp1').val().toLowerCase() == 'bear' &&
			$('.test7 .inp2').val().toLowerCase() == 'lion' &&
			$('.test7 .inp3').val().toLowerCase() == 'elephant' &&
			$('.test7 .inp4').val().toLowerCase() == 'fox' &&
			$('.test7 .inp5').val().toLowerCase() == 'giraffe' &&
			$('.test7 .inp6').val().toLowerCase() == 'wolf'
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
			result = `Попыток: ${attempt1}%0AРезультат: ${res7}`
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
	var canv4 = document.getElementById("c4");
	draw_test(canv4, "/img/correlate12.png", 8, 0.07);
	$(`.test8 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv4.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 8', title, name, surname, file }, $(this))
		}
	});
	//-----9------
	var attempt2 = 0;
	let res9 = ''
	var canv5 = document.getElementById("c5");
	draw_test(canv5, "/img/grid24.png", 9, 0.68, 0.9);
	$('.test9 .verify').on('click', function (e) {
		attempt2++;
		if ($('.test9 .quantity').val().toLowerCase() == 'in the forest') {
			$('.test9 .result').html("Молодец! Всё верно!");
			$('.test9 .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
			res9 = 'верно'
		} else {
			$('.test9 .result').html("Ты где-то ошибся. Присмотрись повнимательнее!");
			$('.test9 .phrase').html(phrase2[Math.floor(Math.random() * phrase2.length)]);
			res9 = 'неверно'
		}
	});
	$(`.test9 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = 'Попыток: 0'
		if (res9) {
			result = `Попыток: ${attempt2}%0AРезультат: ${res9}`
		}
		let file = canv5.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 9', title, name, surname, result, file }, $(this))
		}
	});
});