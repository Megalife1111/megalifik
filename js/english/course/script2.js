$(document).ready(function () {
	//-----1------
	const title = 'Занятие 2 Английский'
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
					if (html == 'tch') {
						cell.eq(i).addClass('prompt');
					}
				}
				if (cell.eq(i).hasClass('in_circle')) {
					if (html != 'ch') {
						res = false;
					}
				} else if (cell.eq(i).hasClass('crossed')) {
					if (html != 'sh') {
						res = false;
					}
				} else {
					if (html == 'ch' || html == 'sh') {
						res = false;
					}
				}
				if (html == 'tch') {
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
					if (html == 'match') {
						cell.eq(i).addClass('prompt');
					}
				}
				if (cell.eq(i).hasClass('crossed')) {
					if (html != 'match') {
						res = false;
					}
				} else {
					if (html == 'match') {
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
		$('.test3 input').val("");
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
	//----------4--------------
	var attempt1 = 0;
	let res4 = ''
	$('.test4 .ready').on('click', function () {
		$('.test4 .page1').removeClass('act');
		$('.test4 .page2').addClass('act');
	});
	$('.test4 .restart').on('click', function () {
		$('.test4 input').val("");
		$('.test4 .result').html("");
		$('.test4 .phrase').html("");
		$('.test4 .page2').removeClass('act');
		$('.test4 .page1').addClass('act');
	});
	$('.test4 .verify').on('click', function (e) {
		attempt1++;
		if (
			$('.test4 .inp1').val().toLowerCase() == 'oteboo' &&
			$('.test4 .inp2').val().toLowerCase() == 'pencil ca' &&
			$('.test4 .inp3').val().toLowerCase() == 'glu' &&
			$('.test4 .inp4').val().toLowerCase() == 'rule' &&
			$('.test4 .inp5').val().toLowerCase() == 'rayons' &&
			$('.test4 .inp6').val().toLowerCase() == 'rubbe' &&
			$('.test4 .inp7').val().toLowerCase() == 'issors' &&
			$('.test4 .inp8').val().toLowerCase() == 'sharpene'
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
	//-----6------
	var canv1 = document.getElementById("c1");
	draw_test(canv1, "/img/grid21.png", 6, 0.84, 0.9);
	$(`.test6 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = $('.test6 .quantity').val()
		let file = canv1.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 6', title, name, surname, result, file }, $(this))
		}
	});
});