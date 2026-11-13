$(document).ready(function () {
	const title = 'Домашние задание 2 ЧтиВо'
	//-----2------
	var canv1 = document.getElementById("c1");
	draw_test(canv1, "/img/fileword14.png", 2, 0.72);
	$(`.test2 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv1.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 2', title, name, surname, file }, $(this))
		}
	});
	//----------3--------------
	text_by_example(3, title);
});