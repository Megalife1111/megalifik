$(document).ready(function () {
	let phrase = [
		"МОЛОДЕЦ!",
		"ТЫ НА ВЕРНОМ ПУТИ!",
		"ЗДОРОВО!",
		"ТЫ В ЭТОМ ОТЛИЧНО РАЗОБРАЛСЯ!",
		"УДИВИТЕЛЬНО!",
		"ЭТО КАК РАЗ ТО, ЧТО НУЖНО!",
		"ГОРАЗДО ЛУЧШЕ, ЧЕМ ОЖИДАЛОСЬ!",
		"ВЕЛИКОЛЕПНО!",
		"ПОЗДРАВЛЯЮ!",
		"ПРЕКРАСНО!",
		"Я ТОБОЙ ГОРЖУСЬ!",
		"ГРАНДИОЗНО!",
		"Я ОЧЕНЬ РАДА ТВОЕМУ УСПЕХУ!",
		"НЕЗАБЫВАЕМО!",
		"УХ ТЫ!",
		"МНЕ ОЧЕНЬ ВАЖНА ТВОЯ ПОМОЩЬ!",
		"ИМЕННО ЭТОГО МЫ ХОТЕЛИ!",
		"РАБОТАТЬ С ТОБОЙ – ЭТО РАДОСТЬ!",
		"ЭТО ТРОГАЕТ МЕНЯ ДО ГЛУБИНЫ ДУШИ!",
		"ТЫ МНЕ НЕОБХОДИМ!",
		"СКАЗАНО ЗДОРОВО – ПРОСТО И ЯСНО!",
		"ДЛЯ МЕНЯ ВАЖНО ВСЕ, ЧТО ТЕБЯ ВОЛНУЕТ И РАДУЕТ!",
		"ОСТРОУМНО!",
		"Я ЗНАЛА, ЧТО ТЕБЕ ЭТО ПО СИЛАМ!",
		"ТАЛАНТЛИВО!",
		"Я ТЕБЯ ПОНИМАЮ!",
		"ЭКСТРА – КЛАСС!",
		"ТЫ ОДАРЕННЫЙ!",
		"С КАЖДЫМ ДНЁМ У ТЕБЯ ПОЛУЧАЕТСЯ ВСЁ ЛУЧШЕ!",
		"ТЫ СЕГОДНЯ МНОГО СДЕЛАЛ!",
		"УЖЕ ЛУЧШЕ!",
		"ДЛЯ МЕНЯ НЕТ НИКОГО КРАСИВЕЕ ТЕБЯ!",
		"ОТЛИЧНО!",
		"ЕЩЕ ЛУЧШЕ, ЧЕМ ПРЕЖДЕ!",
		"НАУЧИ МЕНЯ ДЕЛАТЬ ТАК ЖЕ!",
		"ПОТРЯСАЮЩЕ!",
		"ТУТ МНЕ БЕЗ ТЕБЯ НЕ ОБОЙТИСЬ!",
		"КЛАССНО!",
		"ПОРАЗИТЕЛЬНО!",
		"ТЫ МНЕ НУЖЕН ИМЕННО ТАКОЙ, КАКОЙ ЕСТЬ!",
		"НЕПОДРАЖАЕМО!",
		"НЕСРАВНЕННО!"
	];
	$('#motivational-trainer .restart').on('click', function () {
		$('#motivational-trainer .row input').val("");
		$('#motivational-trainer .phrase').html("");
	});
	$('.send').on('click', function (e) {
		const name = document.querySelector('#form .name').value
		const date = document.querySelector('#form .date').value
		const title = document.querySelector('#form .title').value
		const amount = document.querySelector('#form .amount').value

		if (!name) {
			alert('Введите фамилию и имя')
		} else {
			$('#motivational-trainer .phrase').html(phrase[Math.floor(Math.random() * phrase.length)]);
			sendAjaxForm('/send_trainer.php', { title, name, date, amount }, $(this))
		}
	})
});