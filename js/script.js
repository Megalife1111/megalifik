const nameInput = document.querySelector('#form .name')
const surnameInput = document.querySelector('#form .surname')

function sendAjaxForm(url, data, button) {
	$.ajax({
		url,
		type: 'POST',
		dataType: 'html',
		data,
		beforeSend: function () {
			button.prop('disabled', true)
		},
		success: function (response) {
			alert('Данные отправлены.')
		},
		error: function (response) {
			alert('Ошибка! Данные не отправлены.')
			button.prop('disabled', false)
		},
	})
}

let phrase1 = [
	"Твоя решимость восхищает меня!",
	"Когда ты стараешься, происходит чудо!",
	"Я горжусь твоим достижением",
	"Горжусь тем, что тебе удалось!",
	"Так держать! Не останавливайся",
	"Превосходно!",
	"Грандиозно!",
	"Отлично! Так держать!",
	"Сегодня ты лучше, чем вчера!",
	"Я тобой горжусь!",
	"Сделано без ошибок! Круто!",
	"Твоя настойчивость поможет тебе добиться успеха",
	"Твое упорство вдохновляет меня!",
	"Ты самый успешный!",
	"Ты прикладываешь много усилий так делаю все победители.",
	"Ты проделал важную работу для себя! Гордись собой!",
	"Мне нравиться видеть тебя счастливым.",
	"Твой энтузиазм похвален.",
	"На твоём пути совершенно нет преград!",
	"Ты такой смелый это прекрасно",
	"Я всегда тебя поддержу, потому что мы команда.",
	"Ты делаешь невероятные успехи! Голова кругом!",
	"Ты не совершил ни одной ошибки! Это завораживает!",
	"Чудесный результат!",
	"Ты делаешь это лучше чем я.",
	"У тебя получается очень здорово!",
	"Твои труды привели к хорошему результату.",
	"Я тобой горжусь",
	"Я горжусь тем, что это тебе удалось!",
	"Великолепное начало успеха молодец!",
	"Вера в себя привела тебя к результату!",
	"Твой успех просто завораживает",
	"Верю, что ты на этом не остановиться!",
	"Ты потрясающий человек, у тебя получилось добиться результата",
	"Великолепный результат! Так держать",
	"Фантастика! Прекрасное начало.",
	"Здорово! Научишь меня делать так же"
];
let phrase2 = [
	"Твоя решимость поможет тебе.",
	"Не бойся совершить ошибку",
	"Я горжусь тем, что ты не остановился на половине пути!",
	"У тебя все отлично получится, обязательно!",
	"Твоя настойчивость поможет тебе добиться успеха",
	"Наши проблемы мы преодолеем вместе!",
	"Твоя упорность вдохновляет меня",
	"Ты обязательно добьёшься лучших результатов, не останавливайся!",
	"Если приложить ещё немного усилий, ты добьёшься большего результата!",
	"Я знаю ты справишься",
	"Ты делаешь важную работу для себя",
	"До успеха достать рукой! Просто сделай это!",
	"Когда есть энтузиазм - это чувствуется, остаётся пройти этот путь к финишу!",
	"Просто будь собой, потому что ты один такой на Земле",
	"Ты такой смелый это прекрасно, давай попробуем ещё?",
	"Я всегда тебя поддержу, потому что мы команда.",
	"Ты можешь это сделать ещё лучше и ещё быстрее!",
	"У тебя отлично всё получится.",
	"Я верю в тебя и в твой успех!",
	"Старание - это путь, успех - это результат!",
	"У тебя получится очень здорово, давай решим твою проблему!",
	"Твой труд обязательно приведёт тебя к головокружительному успеху!",
	"Преодолевая путь, мы учимся",
	"Я горжусь тем, что ты не останавливаешься",
	"Великолепное начало, нам нужно повторить это ещё лучше!",
	"Верь в себя ты можешь это сделать",
	"Не бойся быть собой",
	"Я верю в тебя",
	"Ты потрясающий человек у тебя все получится",
	"Не бойся я с тобой!"
];

function draw_test(canv, src, n, cof, fcof = 1) {
	let ctx = canv.getContext("2d");
	let isMouseDown = false;
	let color = 'blue';

	if ($(`.test${n} .color`).val()) {
		color = $(`.test${n} .color`).val();
	}

	canv.width = $(".wrap").width();
	canv.height = canv.width * cof;

	ctx.lineWidth = 4;
	ctx.strokeStyle = color;

	$(`.test${n} .color`).change(function () {
		color = $('.test' + n + ' .color').val();
		ctx.strokeStyle = color;
	});

	var img = new Image();
	img.onload = function () {
		ctx.drawImage(img, 0, 0, canv.width, canv.height);
	};
	img.src = src;

	const el = document.createElement('canvas');
	el.width = canv.width;
	el.height = canv.height;
	const ct = el.getContext('2d');

	canv.onmousedown = function (event) {
		ct.drawImage(canv, 0, 0, el.width, el.height);
		$(`.test${n} .back`).addClass('vis');
		isMouseDown = true;
		var x = event.offsetX;
		var y = event.offsetY;
		ctx.beginPath();
		ctx.arc(x, y, 2, 0, Math.PI * 2);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(x, y);

	}
	canv.onmouseup = function () {
		isMouseDown = false;
	}
	canv.onmouseout = function () {
		isMouseDown = false;
	}
	canv.onmousemove = function (event) {
		if (isMouseDown) {
			var x = event.offsetX;
			var y = event.offsetY;
			ctx.lineTo(x, y);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(x, y, 2, 0, Math.PI * 2);
			ctx.fillStyle = color;
			ctx.fill();
			ctx.beginPath();
			ctx.moveTo(x, y);
		}
	}
	$(`.test${n} .back`).on('click', function () {
		canv.width = canv.width;
		ctx.drawImage(el, 0, 0, canv.width, canv.height);
		ctx.lineWidth = 4;
		ctx.strokeStyle = color;
		$(this).removeClass('vis');
	});
	canv.addEventListener("touchstart", function (event) {
		ct.drawImage(canv, 0, 0, el.width, el.height);
		$(`.test${n} .back`).addClass('vis');
		isMouseDown = true;
		var x = event.offsetX;
		var y = event.offsetY;
		ctx.beginPath();
		ctx.arc(x, y, 2, 0, Math.PI * 2);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(x, y);
	});
	canv.addEventListener("touchend", function (event) {
		event.preventDefault();
		isMouseDown = false;
	});
	canv.addEventListener("touchcancel", function (event) {
		event.preventDefault();
		isMouseDown = false;
	});
	canv.addEventListener('touchmove', function (event) {
		event.preventDefault();
		if (event.targetTouches.length == 1 && isMouseDown) {
			var touch = event.targetTouches[0];
			var x = touch.clientX - canv.getBoundingClientRect().left;
			var y = touch.clientY - canv.getBoundingClientRect().top;
			ctx.lineTo(x, y);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(x, y, 2, 0, Math.PI * 2);
			ctx.fillStyle = color;
			ctx.fill();
			ctx.beginPath();
			ctx.moveTo(x, y);
		}
	});
	$(`.test${n} .restart`).on('click', function () {
		canv.width = canv.width;
		ctx.lineWidth = 4;
		ctx.strokeStyle = color;
		ctx.drawImage(img, 0, 0, canv.width, canv.height);
		$(`.test${n} .quantity`).val("");
		$(`.test${n} .result`).html("");
		$(`.test${n} .phrase`).html("");
	});

	$(`.test${n} .full_screen`).on('click', function () {
		if ($(this).hasClass("close")) {
			$(`.test${n} .canv`).removeClass("full");
			$(`.test${n} .direction`).removeClass("full");
			$(this).removeClass("close");
			$('body').removeClass("no_scroll");
			const elem = document.createElement('canvas');
			elem.width = $(".wrap").width();
			elem.height = elem.width * cof;
			const context = elem.getContext('2d');
			context.drawImage(canv, 0, 0, elem.width, elem.height);
			canv.width = $(".wrap").width();
			canv.height = canv.width * cof;
			ctx.drawImage(elem, 0, 0, canv.width, canv.height);
			ctx.lineWidth = 4;
			ctx.strokeStyle = color;
		} else {
			$(`.test${n} .canv`).addClass("full");
			$(`.test${n} .direction`).addClass("full");
			$(this).addClass("close");
			$('body').addClass("no_scroll");
			const elem = document.createElement('canvas');
			elem.height = $(window).height() * fcof - 35;
			elem.width = elem.height / cof;
			const context = elem.getContext('2d');
			context.drawImage(canv, 0, 0, elem.width, elem.height);
			canv.height = $(window).height() * fcof - 35;
			canv.width = canv.height / cof;
			ctx.drawImage(elem, 0, 0, canv.width, canv.height);
			ctx.lineWidth = 4;
			ctx.strokeStyle = color;
		}
	});
}

function text_by_example(n, title) {
	let attempt = 0;
	let res0 = ''
	let textToInp = ''

	if ($(`.test${n} .text`).length) {
		$(`.test${n} .text`).html(
			$(`.test${n} .text`)
				.html()
				.trim()
				.split('')
				.map(letter => (/^[ёуеыаоэяию]$/i).test(letter) ? letter + '<span>с' + letter.toLowerCase() + '</span>' : letter)
				.join('')
		);
	}

	$(`.test${n} .verify`).on('click', function (e) {
		attempt++;

		let text = $(`.test${n} .inp1`).val().trim().replace(/\s\s+|\n+/g, ' ').toLowerCase().split('');
		textToInp = $(`.test${n} .inp1`).val().trim();

		let i = 0;
		for (i; i < text.length; i++) {
			if ((/^[ёуеыаоэяию]$/i).test(text[i])) {
				if (text[i + 1] === 'с' && text[i + 2] === text[i]) {
					i += 2;
				} else {
					break;
				}
			}
		}

		if (i === text.length && i) {
			$(`.test${n} .result`).html("Молодец! Всё верно!");
			$(`.test${n} .phrase`).html(phrase1[Math.floor(Math.random() * phrase1.length)]);
			res0 = 'верно'
		} else {
			$(`.test${n} .result`).html("Ты где-то ошибся. Присмотрись повнимательнее!");
			$(`.test${n} .phrase`).html(phrase2[Math.floor(Math.random() * phrase2.length)]);
			res0 = 'неверно'
		}
	});
	$(`.test${n} .restart`).on('click', function () {
		$(`.test${n} .quantity`).val("");
		$(`.test${n} .result`).html("");
		$(`.test${n} .phrase`).html("");
	});
	$(`.test${n} .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = 'Попыток: 0'
		if (res0) {
			result = `Попыток: ${attempt}%0AРезультат: ${res0}%0AТекст: ${textToInp}`
		}
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: `Тест ${n}`, title, name, surname, result }, $(this))
		}
	});
}

$('.d').on('click', function () {
	$(this).toggleClass('en');
});
$('.sel').on('click', function () {
	$(this).toggleClass('en');
});

$('.full_screen_sea').on('click', function () {
	if ($(this).hasClass("close")) {
		$('.sea​_battle').removeClass("full");
		$('.seles').removeClass("full");
		$(this).removeClass("close");
		$('body').removeClass("no_scroll");
	} else {
		$('.sea​_battle').addClass("full");
		$('.seles').addClass("full");
		$(this).addClass("close");
		$('body').addClass("no_scroll");
	}
});

$('.excess span').on('click', function () {
	if ($(this).hasClass('act')) {
		$(this).removeClass('act');
	} else {
		$(this).parent().children().removeClass('act');
		$(this).addClass('act');
	}
});