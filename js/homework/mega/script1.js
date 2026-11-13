$(document).ready(function () {
	const title = 'Домашние задание 1 МегаЧтиВо'
	//-----7------
	var canv1 = document.getElementById("c1");
	draw_test(canv1, "/img/fileword24.png", 7, 0.72);
	$(`.test7 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let file = canv1.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 7', title, name, surname, file }, $(this))
		}
	});
	//----------8--------------
	text_by_example(8, title);
});