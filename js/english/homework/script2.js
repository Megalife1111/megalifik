$(document).ready(function () {
	const title = 'Домашние задание 2 Английский'
	//-----2------
	var canv1 = document.getElementById("c1");
	draw_test(canv1, "/img/fileword32.png", 2, 0.6);
	$(`.test2 .send`).on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let result = '1. ' + $('.test2 .inp1').val() + ' 2. ' + $('.test2 .inp2').val() + ' 3. ' + $('.test2 .inp3').val() + ' 4. ' + $('.test2 .inp4').val() + ' 5. ' + $('.test2 .inp5').val()
		let file = canv1.toDataURL('image/png')
		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			sendAjaxForm('/send_homework.php', { test: 'Тест 2', title, name, surname, result, file }, $(this))
		}
	});
});