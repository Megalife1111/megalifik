$(document).ready(function () {
	const title = 'Домашние задание 2 МегаЧтиВо'
	//-----8------
	var canv1 = document.getElementById("c1");
	draw_test(canv1, "/img/fileword25.png", 8, 0.72);
	$(`.test8 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv1.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 8', title, name, surname, file }, $(this))
		}
	});
	//----------9--------------
	text_by_example(9, title);
});