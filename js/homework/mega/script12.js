$(document).ready(function () {
	const title = 'Домашние задание 12 МегаЧтиВо'
	//-----1-----
	$('.decorate_text').html(
		$('.decorate_text')
			.html()
			.trim()
			.replace(/\s\s+/g, ' ')
			.split(' ')
			.map(l => l === '<br>' ? l : `<span>${l}</span>`)
			.join(' ')
	);

	$('.decorate_text span').on('click', function (e) {
		if ($(this).hasClass('yellow')) {
			$(this).removeClass('yellow');
			$(this).addClass('red');
		} else if ($(this).hasClass('red')) {
			$(this).removeClass('red');
			$(this).addClass('violet');
		} else if ($(this).hasClass('violet')) {
			$(this).removeClass('violet');
		} else {
			$(this).addClass('yellow');
		}
	});
	$('.test1 .restart').on('click', function () {
		$('.decorate_text span').removeClass('yellow');
		$('.decorate_text span').removeClass('red');
		$('.decorate_text span').removeClass('violet');
	});
});