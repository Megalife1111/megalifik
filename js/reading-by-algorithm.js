$(document).ready(function () {
	const title = 'Чтение по алгоритму'
	let text = $('.text_block').html();

	$('.test .restart').on('click', function () {
		$('.test input').val("");
		$('.text_block').html(text);
	});

	$('.send').on('click', function (e) {
		let name = nameInput.value
		let surname = surnameInput.value
		let test = $('.title').val()

		let result = "";
		for (let i = 1; i <= $(".questions input").length; i++) {
			result += `${$('.inp' + i).data("question")} : ${$('.inp' + i).val()}%0A`;
		}

		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			if (!test) {
				alert('Данные отправлены.')
			} else {
				sendAjaxForm('/send_test.php', { title, test, name, surname, result }, $(this))
			}
		}
	})

	$('.test .color').on('click', function (e) {
		if ($(this).hasClass("color_brown")) {
			swapSelection("select_brown");
		} else if ($(this).hasClass("color_yellow")) {
			swapSelection("select_yellow");
		} else if ($(this).hasClass("color_blue")) {
			swapSelection("select_blue");
		} else if ($(this).hasClass("color_red")) {
			swapSelection("select_red");
		} else if ($(this).hasClass("color_violet")) {
			swapSelection("select_violet");
		}
	});

	function swapSelection(colorClass) {
		var sel = window.getSelection ? window.getSelection() : document.selection.createRange();

		if (sel != "") {
			if (sel.getRangeAt) {
				var range = sel.getRangeAt(0);
				var newNode = document.createElement("span");
				newNode.setAttribute('class', colorClass);

				try {
					range.surroundContents(newNode);
				} catch (e) {
					alert("Нельзя менять область выделения. Выделяйте ещё не выделенный текст либо начните заново");
				}
			} else {
				sel.pasteHTML(`<span class="${swapclass}">${sel.htmlText}</span>`);
			}
		}
	}
});