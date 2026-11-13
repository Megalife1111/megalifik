$(document).ready(function () {
	const title = $('.title').val()
	let time = 0
	let timerId = false
	let speed = 0
	let result = ''
	function timer() {
		time++
	}
	$('.start').on('click', function () {
		$('.start_block').removeClass('act');
		$('.reading_block').addClass('act');
		timerId = setInterval(timer, 1000);
	});
	$('.start_test').on('click', function () {
		$('.reading_block').removeClass('act');
		$('.test_block').addClass('act');
		clearTimeout(timerId);
		timerId = false;
	});
	$('.end_test').on('click', function () {
		$('.reading_block').removeClass('act');
		$('.test_block').removeClass('act');
		$('.result_block').addClass('act');
		if (timerId) {
			clearTimeout(timerId);
			timerId = false;
		}
		var ans = 0;
		for (var i = 1; i <= $("[data-question]").length; i++) {
			if ($('.inp' + i).val().trim()) {
				result += `${$('.inp' + i).data("question")} : ${$('.inp' + i).val()}%0A`;
				ans++;
			}
		}

		var s = Number($('.num_words').html());
		if ($("[data-question]").length) {
			speed = (Math.round((60 * s / time) * (ans / $("[data-question]").length))) || '0';
		} else {
			speed = Math.round((60 * s / time)) || '0';
		}

		$('.read_time').html(time);
		$('.speed').html(speed);
		$('.answers').html(ans);
		$('.questions').html($("[data-question]").length);
	});
	$('.send, .sign_up_btn').on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let sign_up = ''
		if ($(this).hasClass('sign_up_btn')) {
			sign_up = 'Записаться на пробное занятие'
		}

		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_reading.php', { title, name, surname, time, speed, result, sign_up, text: true }, $('.send, .sign_up_btn'))
		}
	})
});