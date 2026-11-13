$(document).ready(function () {
	const title = $('.title').val()
	var time = 0;
	let timerId = false;
	let result = ''
	function timer() {
		time++;
	}

	// Создаем распознаватель
	var recognizer = new webkitSpeechRecognition();

	// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
	recognizer.interimResults = true;

	// Какой язык будем распознавать?
	recognizer.lang = 'ru-Ru';

	// Используем колбек для обработки результатов
	recognizer.onresult = function (event) {
		var result = event.results[event.resultIndex];
		if (result.isFinal) {
			alert('Вы сказали: ' + result[0].transcript);
		} else {
			console.log('Промежуточный результат: ', result[0].transcript);
		}
	};

	$('.start').on('click', function () {
		$('.start_block').removeClass('act');
		$('.reading_block').addClass('act');
		timerId = setInterval(timer, 1000);

		// Начинаем слушать микрофон и распознавать голос
		recognizer.start();

		/*var voices = speechSynthesis.getVoices();
		var utterance = new SpeechSynthesisUtterance('Ласточка свила гнездо. Воробей увидел гнездо и занял его.');
		utterance.voice = voices[3];
		speechSynthesis.speak(utterance);*/
	});
	$('.start_test').on('click', function () {
		$('.reading_block').removeClass('act');
		$('.test_block').addClass('act');
		clearTimeout(timerId);
		timerId = false;
	});
	$('.end_test').on('click', function () {
		$('.test_block').removeClass('act');
		$('.result_block').addClass('act');
		var ans = 0;
		for (var i = 0; i < $(".question").length; i++) {
			result += `%0A${i + 1}. ${$(".ans_text[name=" + i + "]").val()}`
			ans++;
		}

		$('.read_time').html(time);
	});
	$('.send').on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value

		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_reading.php', { title, name, surname, time, result, text: true }, $(this))
		}
	})
});