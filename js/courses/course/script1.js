$(document).ready(function () {
	const title = 'Занятие 1 ЧтиВо'
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
				$(this).addClass('dot');
			} else if ($(this).hasClass('dot')) {
				$(this).removeClass('crossed');
				$(this).removeClass('dot');
			} else {
				$(this).addClass('crossed');
				$(this).removeClass('dot');
			}
			if (!timerId) {
				timerId = setInterval(timer, 1000);
			}
		});
		$('.test' + n + ' .verify').on('click', function (e) {
			attempt++;
			if (
				$('.test' + n + ' .quantity').val() == $('.test' + n + ' .triangle').length - 1 &&
				$('.test' + n + ' .crossed .triangle').length == $('.test' + n + ' .triangle').length - 1 &&
				$('.test' + n + ' .dot .circle').length == $('.test' + n + ' .circle').length &&
				$('.test' + n + ' .crossed .square').length == 0 &&
				$('.test' + n + ' .dot .square').length == 0
			) {
				$('.test' + n + ' .result').html("Молодец! Всё верно!");
				$('.test' + n + ' .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
					$('.test' + n + ' .triangle').parent('.cell').addClass('prompt');
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
			$('.test' + n + ' .cell').removeClass('crossed');
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
		let time = 0, full_time = '00:00';
		let timerId = false;
		let attempt = 0;
		let res0 = ''
		function timer() {
			time++;
			let min = Math.floor(time / 60),
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
				$('.test' + n + ' .crossed .cross').length == $('.test' + n + ' .cross').length &&
				$('.test' + n + ' .crossed .square').length == 0 &&
				$('.test' + n + ' .crossed .triangle').length == 0 &&
				$('.test' + n + ' .crossed .rhombus').length == 0 &&
				$('.test' + n + ' .crossed .circle').length == 0 &&
				$('.test' + n + ' .crossed .star').length == 0 &&
				$('.test' + n + ' .crossed .trapezoid').length == 0
			) {
				$('.test' + n + ' .result').html("Молодец! Всё верно!");
				$('.test' + n + ' .phrase').html(phrase1[Math.floor(Math.random() * phrase1.length)]);
				res0 = 'верно'
			} else {
				if (attempt > 2) {
					$('.test' + n + ' .cross').parent('.cell').addClass('prompt');
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
	let canv1 = document.getElementById("c1")
	let attempt1 = 0
	let res3 = ''
	draw_test(canv1, "/img/grid1.png", 3, 0.86, 0.85);
	$('.test3 .verify').on('click', function (e) {
		attempt1++;
		if (
			$('.test3 .quantity').val().toLowerCase() == "цветок" ||
			$('.test3 .quantity').val().toLowerCase() == "цветочек"
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
	//-----4------
	let canv2 = document.getElementById("c2")
	let attempt2 = 0
	let res4 = ''
	draw_test(canv2, "/img/letters1.png", 4, 0.46);
	$('.test4 .verify').on('click', function (e) {
		attempt2++;
		if (
			$('.test4 .quantity').val() == 6
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
		let file = canv2.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_test.php', { test: 'Тест 4', title, name, surname, result, file }, $(this))
		}
	});
	//-----5---------
	var x = 0, y = 0;
	var selected = {
		en: false,
		x: 0,
		y: 0,
		sel: false,
		height: 0,
		width: 0,
		rot: 0,
		scaleX: 1,
		scaleY: 1
	};
	var PosX = function (fig) {
		return fig.offset().left - dc1.getBoundingClientRect().left - $(window).scrollLeft();
	}
	var PosY = function (fig) {
		return fig.offset().top - dc1.getBoundingClientRect().top - $(window).scrollTop();
	}
	var Width = function (fig) {
		return fig.width();
	}
	var Height = function (fig) {
		return fig.height();
	}
	var Father = function (fig) {
		return fig.parent('.draggable_figure');
	}

	var fig = $(".draggable_figure"),
		resize = $(".resize"),
		rotate = $(".rotate");

	var isCursor = function (fig) {
		return x > PosX(fig) && x < PosX(fig) + Width(fig) && y > PosY(fig) && y < PosY(fig) + Height(fig);
	}
	var dc1 = document.getElementById("d1");

	dc1.onmousemove = function (e) {
		e.preventDefault()
		x = e.clientX - dc1.getBoundingClientRect().left;
		y = e.clientY - dc1.getBoundingClientRect().top;
		if (selected.en) {
			if (selected.sel == "move") {
				if (selected.en.hasClass('dub')) {
					selected.en.clone().appendTo("#d1");
					selected.en.removeClass('dub');
					fig = $(".draggable_figure");
					resize = $(".resize");
					rotate = $(".rotate");
				}
				selected.en.css('left', (x - selected.x) + 'px');
				selected.en.css('top', (y - selected.y) + 'px');
			} else if (selected.sel == "b" && (selected.height + y - selected.y) > 20) {
				Father(selected.en).css('height', (selected.height + y - selected.y) + 'px');
				selected.scaleY = Height(Father(selected.en)) > Width(Father(selected.en)) ? Height(Father(selected.en)) / Width(Father(selected.en)) : 1;
				selected.scaleX = Height(Father(selected.en)) < Width(Father(selected.en)) ? Width(Father(selected.en)) / Height(Father(selected.en)) : 1;
				Father(selected.en).children(".draggable_figure_in").children("svg").children().css('transform', 'scale(' + selected.scaleX + ',' + selected.scaleY + ')');
			} else if (selected.sel == "t" && (selected.height + selected.y - y) > 20) {
				Father(selected.en).css('height', (selected.height + selected.y - y) + 'px');
				Father(selected.en).css('top', y + 'px');
				selected.scaleY = Height(Father(selected.en)) > Width(Father(selected.en)) ? Height(Father(selected.en)) / Width(Father(selected.en)) : 1;
				selected.scaleX = Height(Father(selected.en)) < Width(Father(selected.en)) ? Width(Father(selected.en)) / Height(Father(selected.en)) : 1;
				Father(selected.en).children(".draggable_figure_in").children("svg").children().css('transform', 'scale(' + selected.scaleX + ',' + selected.scaleY + ')');
			} else if (selected.sel == "r" && (selected.width + x - selected.x) > 20) {
				Father(selected.en).css('width', (selected.width + x - selected.x) + 'px');
				selected.scaleY = Height(Father(selected.en)) > Width(Father(selected.en)) ? Height(Father(selected.en)) / Width(Father(selected.en)) : 1;
				selected.scaleX = Height(Father(selected.en)) < Width(Father(selected.en)) ? Width(Father(selected.en)) / Height(Father(selected.en)) : 1;
				Father(selected.en).children(".draggable_figure_in").children("svg").children().css('transform', 'scale(' + selected.scaleX + ',' + selected.scaleY + ')');
			} else if (selected.sel == "l" && (selected.width + selected.x - x) > 20) {
				Father(selected.en).css('width', (selected.width + selected.x - x) + 'px');
				Father(selected.en).css('left', x + 'px');
				selected.scaleY = Height(Father(selected.en)) > Width(Father(selected.en)) ? Height(Father(selected.en)) / Width(Father(selected.en)) : 1;
				selected.scaleX = Height(Father(selected.en)) < Width(Father(selected.en)) ? Width(Father(selected.en)) / Height(Father(selected.en)) : 1;
				Father(selected.en).children(".draggable_figure_in").children("svg").children().css('transform', 'scale(' + selected.scaleX + ',' + selected.scaleY + ')');
			} else if (selected.sel == "lt" && (selected.width + selected.x - x) > 20 && (selected.height + selected.y - y) > 20) {
				Father(selected.en).css('width', (selected.width + selected.x - x) + 'px');
				Father(selected.en).css('left', x + 'px');
				Father(selected.en).css('height', (selected.height + selected.y - y) + 'px');
				Father(selected.en).css('top', y + 'px');
				selected.scaleY = Height(Father(selected.en)) > Width(Father(selected.en)) ? Height(Father(selected.en)) / Width(Father(selected.en)) : 1;
				selected.scaleX = Height(Father(selected.en)) < Width(Father(selected.en)) ? Width(Father(selected.en)) / Height(Father(selected.en)) : 1;
				Father(selected.en).children(".draggable_figure_in").children("svg").children().css('transform', 'scale(' + selected.scaleX + ',' + selected.scaleY + ')');
			} else if (selected.sel == "lb" && (selected.width + selected.x - x) > 20 && (selected.height + y - selected.y) > 20) {
				Father(selected.en).css('width', (selected.width + selected.x - x) + 'px');
				Father(selected.en).css('left', x + 'px');
				Father(selected.en).css('height', (selected.height + y - selected.y) + 'px');
				selected.scaleY = Height(Father(selected.en)) > Width(Father(selected.en)) ? Height(Father(selected.en)) / Width(Father(selected.en)) : 1;
				selected.scaleX = Height(Father(selected.en)) < Width(Father(selected.en)) ? Width(Father(selected.en)) / Height(Father(selected.en)) : 1;
				Father(selected.en).children(".draggable_figure_in").children("svg").children().css('transform', 'scale(' + selected.scaleX + ',' + selected.scaleY + ')');
			} else if (selected.sel == "rt" && (selected.width + x - selected.x) > 20 && (selected.height + selected.y - y) > 20) {
				Father(selected.en).css('width', (selected.width + x - selected.x) + 'px');
				Father(selected.en).css('height', (selected.height + selected.y - y) + 'px');
				Father(selected.en).css('top', y + 'px');
				selected.scaleY = Height(Father(selected.en)) > Width(Father(selected.en)) ? Height(Father(selected.en)) / Width(Father(selected.en)) : 1;
				selected.scaleX = Height(Father(selected.en)) < Width(Father(selected.en)) ? Width(Father(selected.en)) / Height(Father(selected.en)) : 1;
				Father(selected.en).children(".draggable_figure_in").children("svg").children().css('transform', 'scale(' + selected.scaleX + ',' + selected.scaleY + ')');
			} else if (selected.sel == "rb" && (selected.width + x - selected.x) > 20 && (selected.height + y - selected.y) > 20) {
				Father(selected.en).css('width', (selected.width + x - selected.x) + 'px');
				Father(selected.en).css('height', (selected.height + y - selected.y) + 'px');
				selected.scaleY = Height(Father(selected.en)) > Width(Father(selected.en)) ? Height(Father(selected.en)) / Width(Father(selected.en)) : 1;
				selected.scaleX = Height(Father(selected.en)) < Width(Father(selected.en)) ? Width(Father(selected.en)) / Height(Father(selected.en)) : 1;
				Father(selected.en).children(".draggable_figure_in").children("svg").children().css('transform', 'scale(' + selected.scaleX + ',' + selected.scaleY + ')');
			} else if (selected.sel == "rotate") {
				selected.rot = (Math.atan2(y - selected.y, x - selected.x) * 180 / Math.PI + 90);
				selected.scaleY = Height(Father(selected.en)) > Width(Father(selected.en)) ? Height(Father(selected.en)) / Width(Father(selected.en)) : 1;
				selected.scaleX = Height(Father(selected.en)) < Width(Father(selected.en)) ? Width(Father(selected.en)) / Height(Father(selected.en)) : 1;
				Father(selected.en).children(".draggable_figure_in").children("svg").children().css('transform', 'rotate(' + selected.rot + 'deg) scale(' + selected.scaleX + ',' + selected.scaleY + ')');
			}
		}
	}
	dc1.onmousedown = function (e) {
		e.preventDefault()
		for (i = 0; i < fig.length; i++) {
			if (isCursor(fig.eq(i))) {
				selected.en = fig.eq(i);
				selected.x = e.clientX - dc1.getBoundingClientRect().left - PosX(selected.en);
				selected.y = e.clientY - dc1.getBoundingClientRect().top - PosY(selected.en);
				selected.sel = "move";
			}
		}
		for (i = 0; i < resize.length; i++) {
			if (isCursor(resize.eq(i))) {
				selected.en = resize.eq(i);
				selected.height = Height(Father(selected.en));
				selected.y = PosY(selected.en);
				selected.width = Width(Father(selected.en));
				selected.x = PosX(selected.en);
				if (selected.en.hasClass("b")) {
					selected.sel = "b";
				} else if (selected.en.hasClass("t")) {
					selected.sel = "t";
				} else if (selected.en.hasClass("r")) {
					selected.sel = "r";
				} else if (selected.en.hasClass("l")) {
					selected.sel = "l";
				} else if (selected.en.hasClass("lt")) {
					selected.sel = "lt";
				} else if (selected.en.hasClass("rt")) {
					selected.sel = "rt";
				} else if (selected.en.hasClass("lb")) {
					selected.sel = "lb";
				} else if (selected.en.hasClass("rb")) {
					selected.sel = "rb";
				}
			}
		}
		for (i = 0; i < rotate.length; i++) {
			if (isCursor(rotate.eq(i))) {
				selected.en = rotate.eq(i);
				selected.sel = "rotate";
				selected.y = PosY(selected.en) + Height(Father(selected.en)) / 2;
				selected.x = PosX(selected.en);
			}
		}
	}
	dc1.onmouseup = function (e) {
		e.preventDefault()
		if (PosX(selected.en) < 120 && PosY(selected.en) < 120) {
			Father(selected.en).remove();
			selected.en.remove();
		}
		selected.en = false;
		selected.sel = false;
	}
	dc1.addEventListener("touchstart", function (e) {
		e.preventDefault()
		var touch = e.targetTouches[0];
		x = touch.clientX - dc1.getBoundingClientRect().left;
		y = touch.clientY - dc1.getBoundingClientRect().top;
		for (i = 0; i < fig.length; i++) {
			if (isCursor(fig.eq(i))) {
				selected.en = fig.eq(i);
				selected.x = touch.clientX - dc1.getBoundingClientRect().left - PosX(selected.en);
				selected.y = touch.clientY - dc1.getBoundingClientRect().top - PosY(selected.en);
				selected.sel = "move";
			}
		}
		for (i = 0; i < resize.length; i++) {
			if (isCursor(resize.eq(i))) {
				selected.en = resize.eq(i);
				selected.height = Height(Father(selected.en));
				selected.y = PosY(selected.en);
				selected.width = Width(Father(selected.en));
				selected.x = PosX(selected.en);
				if (selected.en.hasClass("b")) {
					selected.sel = "b";
				} else if (selected.en.hasClass("t")) {
					selected.sel = "t";
				} else if (selected.en.hasClass("r")) {
					selected.sel = "r";
				} else if (selected.en.hasClass("l")) {
					selected.sel = "l";
				} else if (selected.en.hasClass("lt")) {
					selected.sel = "lt";
				} else if (selected.en.hasClass("rt")) {
					selected.sel = "rt";
				} else if (selected.en.hasClass("lb")) {
					selected.sel = "lb";
				} else if (selected.en.hasClass("rb")) {
					selected.sel = "rb";
				}
			}
		}
		for (i = 0; i < rotate.length; i++) {
			if (isCursor(rotate.eq(i))) {
				selected.en = rotate.eq(i);
				selected.sel = "rotate";
				selected.y = PosY(selected.en) + Height(Father(selected.en)) / 2;
				selected.x = PosX(selected.en);
			}
		}
	});
	dc1.addEventListener("touchend", function (e) {
		e.preventDefault();
		if (PosX(selected.en) < 120 && PosY(selected.en) < 120) {
			Father(selected.en).remove();
			selected.en.remove();
		}
		selected.en = false;
		selected.sel = false;
	});
	dc1.addEventListener('touchmove', function (e) {
		e.preventDefault();
		var touch = e.targetTouches[0];
		x = touch.clientX - dc1.getBoundingClientRect().left;
		y = touch.clientY - dc1.getBoundingClientRect().top;
		if (selected.en) {
			if (selected.sel == "move") {
				if (selected.en.hasClass('dub')) {
					selected.en.clone().appendTo("#d1");
					selected.en.removeClass('dub');
					fig = $(".draggable_figure");
					resize = $(".resize");
					rotate = $(".rotate");
				}
				selected.en.css('left', (x - selected.x) + 'px');
				selected.en.css('top', (y - selected.y) + 'px');
			} else if (selected.sel == "b" && (selected.height + y - selected.y) > 20) {
				Father(selected.en).css('height', (selected.height + y - selected.y) + 'px');
				selected.scaleY = Height(Father(selected.en)) > Width(Father(selected.en)) ? Height(Father(selected.en)) / Width(Father(selected.en)) : 1;
				selected.scaleX = Height(Father(selected.en)) < Width(Father(selected.en)) ? Width(Father(selected.en)) / Height(Father(selected.en)) : 1;
				Father(selected.en).children(".draggable_figure_in").children("svg").children().css('transform', 'scale(' + selected.scaleX + ',' + selected.scaleY + ')');
			} else if (selected.sel == "t" && (selected.height + selected.y - y) > 20) {
				Father(selected.en).css('height', (selected.height + selected.y - y) + 'px');
				Father(selected.en).css('top', y + 'px');
				selected.scaleY = Height(Father(selected.en)) > Width(Father(selected.en)) ? Height(Father(selected.en)) / Width(Father(selected.en)) : 1;
				selected.scaleX = Height(Father(selected.en)) < Width(Father(selected.en)) ? Width(Father(selected.en)) / Height(Father(selected.en)) : 1;
				Father(selected.en).children(".draggable_figure_in").children("svg").children().css('transform', 'scale(' + selected.scaleX + ',' + selected.scaleY + ')');
			} else if (selected.sel == "r" && (selected.width + x - selected.x) > 20) {
				Father(selected.en).css('width', (selected.width + x - selected.x) + 'px');
				selected.scaleY = Height(Father(selected.en)) > Width(Father(selected.en)) ? Height(Father(selected.en)) / Width(Father(selected.en)) : 1;
				selected.scaleX = Height(Father(selected.en)) < Width(Father(selected.en)) ? Width(Father(selected.en)) / Height(Father(selected.en)) : 1;
				Father(selected.en).children(".draggable_figure_in").children("svg").children().css('transform', 'scale(' + selected.scaleX + ',' + selected.scaleY + ')');
			} else if (selected.sel == "l" && (selected.width + selected.x - x) > 20) {
				Father(selected.en).css('width', (selected.width + selected.x - x) + 'px');
				Father(selected.en).css('left', x + 'px');
				selected.scaleY = Height(Father(selected.en)) > Width(Father(selected.en)) ? Height(Father(selected.en)) / Width(Father(selected.en)) : 1;
				selected.scaleX = Height(Father(selected.en)) < Width(Father(selected.en)) ? Width(Father(selected.en)) / Height(Father(selected.en)) : 1;
				Father(selected.en).children(".draggable_figure_in").children("svg").children().css('transform', 'scale(' + selected.scaleX + ',' + selected.scaleY + ')');
			} else if (selected.sel == "lt" && (selected.width + selected.x - x) > 20 && (selected.height + selected.y - y) > 20) {
				Father(selected.en).css('width', (selected.width + selected.x - x) + 'px');
				Father(selected.en).css('left', x + 'px');
				Father(selected.en).css('height', (selected.height + selected.y - y) + 'px');
				Father(selected.en).css('top', y + 'px');
				selected.scaleY = Height(Father(selected.en)) > Width(Father(selected.en)) ? Height(Father(selected.en)) / Width(Father(selected.en)) : 1;
				selected.scaleX = Height(Father(selected.en)) < Width(Father(selected.en)) ? Width(Father(selected.en)) / Height(Father(selected.en)) : 1;
				Father(selected.en).children(".draggable_figure_in").children("svg").children().css('transform', 'scale(' + selected.scaleX + ',' + selected.scaleY + ')');
			} else if (selected.sel == "lb" && (selected.width + selected.x - x) > 20 && (selected.height + y - selected.y) > 20) {
				Father(selected.en).css('width', (selected.width + selected.x - x) + 'px');
				Father(selected.en).css('left', x + 'px');
				Father(selected.en).css('height', (selected.height + y - selected.y) + 'px');
				selected.scaleY = Height(Father(selected.en)) > Width(Father(selected.en)) ? Height(Father(selected.en)) / Width(Father(selected.en)) : 1;
				selected.scaleX = Height(Father(selected.en)) < Width(Father(selected.en)) ? Width(Father(selected.en)) / Height(Father(selected.en)) : 1;
				Father(selected.en).children(".draggable_figure_in").children("svg").children().css('transform', 'scale(' + selected.scaleX + ',' + selected.scaleY + ')');
			} else if (selected.sel == "rt" && (selected.width + x - selected.x) > 20 && (selected.height + selected.y - y) > 20) {
				Father(selected.en).css('width', (selected.width + x - selected.x) + 'px');
				Father(selected.en).css('height', (selected.height + selected.y - y) + 'px');
				Father(selected.en).css('top', y + 'px');
				selected.scaleY = Height(Father(selected.en)) > Width(Father(selected.en)) ? Height(Father(selected.en)) / Width(Father(selected.en)) : 1;
				selected.scaleX = Height(Father(selected.en)) < Width(Father(selected.en)) ? Width(Father(selected.en)) / Height(Father(selected.en)) : 1;
				Father(selected.en).children(".draggable_figure_in").children("svg").children().css('transform', 'scale(' + selected.scaleX + ',' + selected.scaleY + ')');
			} else if (selected.sel == "rb" && (selected.width + x - selected.x) > 20 && (selected.height + y - selected.y) > 20) {
				Father(selected.en).css('width', (selected.width + x - selected.x) + 'px');
				Father(selected.en).css('height', (selected.height + y - selected.y) + 'px');
				selected.scaleY = Height(Father(selected.en)) > Width(Father(selected.en)) ? Height(Father(selected.en)) / Width(Father(selected.en)) : 1;
				selected.scaleX = Height(Father(selected.en)) < Width(Father(selected.en)) ? Width(Father(selected.en)) / Height(Father(selected.en)) : 1;
				Father(selected.en).children(".draggable_figure_in").children("svg").children().css('transform', 'scale(' + selected.scaleX + ',' + selected.scaleY + ')');
			} else if (selected.sel == "rotate") {
				selected.rot = (Math.atan2(y - selected.y, x - selected.x) * 180 / Math.PI + 90);
				selected.scaleY = Height(Father(selected.en)) > Width(Father(selected.en)) ? Height(Father(selected.en)) / Width(Father(selected.en)) : 1;
				selected.scaleX = Height(Father(selected.en)) < Width(Father(selected.en)) ? Width(Father(selected.en)) / Height(Father(selected.en)) : 1;
				Father(selected.en).children(".draggable_figure_in").children("svg").children().css('transform', 'rotate(' + selected.rot + 'deg) scale(' + selected.scaleX + ',' + selected.scaleY + ')');
			}
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