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
		$('.test_block').removeClass('act');
		$('.result_block').addClass('act');
		var ans = 0;
		for (var i = 0; i < $(".question").length; i++) {
			if ($(".ans[name=" + i + "]:checked").val() == 1) {
				result += `№${i + 1}, `
				ans++;
			}
		}

		var s = Number($('.num_words').html());
		speed = (Math.round((60 * s / time) * (ans / $(".question").length))) || '0';

		$('.read_time').html(time);
		$('.speed').html(speed);
		$('.answers').html(ans);
	});
	$('.send, .sign_up_btn').on('click', function (e) {
		let re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){7,14}(\s*)?$/
		let name = nameInput.value
		let surname = surnameInput.value
		const telInput = document.querySelector('#form .tel')
		let tel = ''
		if (telInput) {
			tel = telInput.value
		}
		let sign_up = ''
		if ($(this).hasClass('sign_up_btn')) {
			sign_up = 'Записаться на пробное занятие'
		}

		if (!name) {
			alert('Введите имя')
		} else if (!surname) {
			alert('Введите фамилию')
		} else {
			if (telInput && !re.test(tel)) {
				alert('Проверьте правильность номера телефона')
			} else {
				if (!result) {
					result = '0'
				} else {
					result = result.slice(0, -2)
				}
				sendAjaxForm('/send_reading.php', { title, name, surname, tel, time, speed, result, sign_up }, $('.send, .sign_up_btn'))
			}
		}
	})

	var code = {
		"RU": { cod: "+7", num: 11 },
		"UA": { cod: "+380", num: 12 },
		"KZ": { cod: "+77", num: 11 },
		"LT": { cod: "+370", num: 11 },
		"BY": { cod: "+375", num: 12 },
		"US": { cod: "+1", num: 11 },
		"AB": { cod: "+7940", num: 11 },
		"AU": { cod: "+61", num: 11 },
		"AT": { cod: "+43", num: 12 },
		"AZ": { cod: "+994", num: 12 },
		"AL": { cod: "+355", num: 12 },
		"DZ": { cod: "+213", num: 12 },
		"AO": { cod: "+244", num: 12 },
		"AD": { cod: "+376", num: 9 },
		"AG": { cod: "+1268", num: 11 },
		"AR": { cod: "+54", num: 13 },
		"AM": { cod: "+374", num: 11 },
		"AW": { cod: "+297", num: 10 },
		"AF": { cod: "+93", num: 11 },
		"BS": { cod: "+1242", num: 11 },
		"BD": { cod: "+880", num: 13 },
		"BB": { cod: "+1246", num: 11 },
		"BH": { cod: "+973", num: 11 },
		"BZ": { cod: "+501", num: 10 },
		"BE": { cod: "+32", num: 11 },
		"BJ": { cod: "+229", num: 11 },
		"CI": { cod: "+225", num: 11 },
		"BM": { cod: "+1441", num: 11 },
		"BG": { cod: "+359", num: 12 },
		"BO": { cod: "+591", num: 11 },
		"BA": { cod: "+387", num: 11 },
		"BW": { cod: "+267", num: 11 },
		"BR": { cod: "+55", num: 12 },
		"VG": { cod: "+1284", num: 11 },
		"BN": { cod: "+673", num: 10 },
		"BF": { cod: "+226", num: 11 },
		"BI": { cod: "+257", num: 11 },
		"BT": { cod: "+975", num: 11 },
		"VU": { cod: "+678", num: 10 },
		"UK": { cod: "+44", num: 12 },
		"HU": { cod: "+36", num: 11 },
		"VE": { cod: "+58", num: 12 },
		"TL": { cod: "+670", num: 11 },
		"VN": { cod: "+84", num: 11 },
		"GA": { cod: "+241", num: 11 },
		"HT": { cod: "+509", num: 11 },
		"GM": { cod: "+220", num: 10 },
		"GH": { cod: "+233", num: 12 },
		"GP": { cod: "+590", num: 12 },
		"GT": { cod: "+502", num: 11 },
		"GN": { cod: "+224", num: 11 },
		"GW": { cod: "+245", num: 10 },
		"DE": { cod: "+49", num: 12 },
		"GI": { cod: "+350", num: 11 },
		"HK": { cod: "+852", num: 11 },
		"HN": { cod: "+504", num: 11 },
		"GD": { cod: "+1473", num: 11 },
		"GL": { cod: "+299", num: 9 },
		"GR": { cod: "+30", num: 12 },
		"GE": { cod: "+995", num: 12 },
		"GU": { cod: "+671", num: 11 },
		"DK": { cod: "+45", num: 10 },
		"DM": { cod: "+1767", num: 11 },
		"DO": { cod: "+1809", num: 11 },
		"EG": { cod: "+20", num: 12 },
		"ZM": { cod: "+260", num: 12 },
		"ZW": { cod: "+263", num: 12 },
		"IL": { cod: "+972", num: 12 },
		"IN": { cod: "+91", num: 12 },
		"ID": { cod: "+62", num: 11 },
		"JO": { cod: "+962", num: 12 },
		"IQ": { cod: "+964", num: 13 },
		"IR": { cod: "+98", num: 12 },
		"IE": { cod: "+353", num: 12 },
		"IS": { cod: "+354", num: 10 },
		"ES": { cod: "+34", num: 11 },
		"IT": { cod: "+39", num: 12 },
		"YE": { cod: "+967", num: 12 },
		"KY": { cod: "+1345", num: 11 },
		"KH": { cod: "+855", num: 11 },
		"CM": { cod: "+237", num: 11 },
		"CA": { cod: "+1", num: 11 },
		"CV": { cod: "+238", num: 10 },
		"QA": { cod: "+974", num: 11 },
		"KE": { cod: "+254", num: 12 },
		"CY": { cod: "+357", num: 11 },
		"CN": { cod: "+86", num: 13 },
		"CO": { cod: "+57", num: 12 },
		"KM": { cod: "+269", num: 10 },
		"CG": { cod: "+242", num: 12 },
		"CD": { cod: "+242", num: 12 },
		"RK": { cod: "+383", num: 12 },
		"CR": { cod: "+506", num: 11 },
		"CU": { cod: "+53", num: 10 },
		"KG": { cod: "+996", num: 12 },
		"KW": { cod: "+965", num: 11 },
		"AN": { cod: "+599", num: 11 },
		"LV": { cod: "+371", num: 11 },
		"LS": { cod: "+266", num: 11 },
		"LR": { cod: "+231", num: 10 },
		"LB": { cod: "+961", num: 11 },
		"LY": { cod: "+21", num: 12 },
		"LI": { cod: "+423", num: 12 },
		"LU": { cod: "+352", num: 12 },
		"MU": { cod: "+230", num: 10 },
		"MR": { cod: "+222", num: 11 },
		"MG": { cod: "+261", num: 12 },
		"MO": { cod: "+853", num: 11 },
		"MK": { cod: "+389", num: 11 },
		"MW": { cod: "+265", num: 12 },
		"MY": { cod: "+60", num: 11 },
		"ML": { cod: "+223", num: 11 },
		"MV": { cod: "+960", num: 10 },
		"MT": { cod: "+356", num: 11 },
		"MA": { cod: "+212", num: 12 },
		"MQ": { cod: "+596", num: 12 },
		"MX": { cod: "+52", num: 13 },
		"MZ": { cod: "+258", num: 12 },
		"MD": { cod: "+373", num: 11 },
		"MC": { cod: "+377", num: 12 },
		"MN": { cod: "+976", num: 11 },
		"ME": { cod: "+381", num: 11 },
		"NA": { cod: "+264", num: 12 },
		"NR": { cod: "+674", num: 10 },
		"NP": { cod: "+977", num: 13 },
		"NE": { cod: "+227", num: 11 },
		"NG": { cod: "+234", num: 13 },
		"NL": { cod: "+31", num: 11 },
		"NI": { cod: "+505", num: 11 },
		"NZ": { cod: "+64", num: 11 },
		"NC": { cod: "+687", num: 9 },
		"NO": { cod: "+47", num: 10 },
		"CK": { cod: "+682", num: 8 },
		"AE": { cod: "+971", num: 12 },
		"OM": { cod: "+968", num: 11 },
		"PK": { cod: "+92", num: 12 },
		"PS": { cod: "+970", num: 12 },
		"PA": { cod: "+507", num: 11 },
		"PG": { cod: "+675", num: 10 },
		"PY": { cod: "+595", num: 12 },
		"PE": { cod: "+51", num: 11 },
		"PL": { cod: "+48", num: 11 },
		"PT": { cod: "+351", num: 12 },
		"PR": { cod: "+1787", num: 11 },
		"RE": { cod: "+262", num: 12 },
		"RW": { cod: "+250", num: 12 },
		"RO": { cod: "+40", num: 11 },
		"AS": { cod: "+685", num: 9 },
		"SM": { cod: "+378", num: 11 },
		"LC": { cod: "+1758", num: 11 },
		"SA": { cod: "+966", num: 12 },
		"KP": { cod: "+82", num: 13 },
		"MP": { cod: "+670", num: 11 },
		"SC": { cod: "+248", num: 10 },
		"SN": { cod: "+221", num: 12 },
		"VC": { cod: "+1784", num: 11 },
		"KN": { cod: "+1869", num: 11 },
		"CS": { cod: "+381", num: 11 },
		"SG": { cod: "+65", num: 10 },
		"SY": { cod: "+963", num: 12 },
		"SK": { cod: "+421", num: 12 },
		"SI": { cod: "+386", num: 11 },
		"SB": { cod: "+677", num: 10 },
		"SD": { cod: "+249", num: 12 },
		"SR": { cod: "+597", num: 10 },
		"SL": { cod: "+232", num: 11 },
		"TJ": { cod: "+992", num: 12 },
		"TH": { cod: "+66", num: 11 },
		"TW": { cod: "+886", num: 12 },
		"TZ": { cod: "+255", num: 12 },
		"TG": { cod: "+228", num: 11 },
		"TO": { cod: "+676", num: 10 },
		"TT": { cod: "+1868", num: 11 },
		"TN": { cod: "+216", num: 11 },
		"TM": { cod: "+993", num: 11 },
		"TR": { cod: "+90", num: 12 },
		"UG": { cod: "+256", num: 12 },
		"UZ": { cod: "+998", num: 12 },
		"UY": { cod: "+598", num: 11 },
		"FO": { cod: "+298", num: 9 },
		"FJ": { cod: "+679", num: 10 },
		"PH": { cod: "+63", num: 12 },
		"FI": { cod: "+358", num: 12 },
		"FR": { cod: "+33", num: 11 },
		"GF": { cod: "+594", num: 12 },
		"PF": { cod: "+689", num: 9 },
		"HR": { cod: "+385", num: 11 },
		"CF": { cod: "+236", num: 11 },
		"TD": { cod: "+235", num: 11 },
		"CZ": { cod: "+420", num: 12 },
		"CL": { cod: "+56", num: 11 },
		"CH": { cod: "+41", num: 11 },
		"SE": { cod: "+46", num: 11 },
		"LK": { cod: "+94", num: 11 },
		"EC": { cod: "+593", num: 12 },
		"GQ": { cod: "+240", num: 12 },
		"SV": { cod: "+503", num: 11 },
		"EE": { cod: "+372", num: 11 },
		"ET": { cod: "+251", num: 12 },
		"ZA": { cod: "+27", num: 11 },
		"KR": { cod: "+82", num: 12 },
		"JM": { cod: "+1876", num: 11 },
		"JP": { cod: "+81", num: 12 },
	};

	var endpoint = 'http://ip-api.com/json/?fields=status,message,countryCode';
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			if (response.status !== 'success') {
				console.log('query failed: ' + response.message);
				return
			}
			//alert(response.countryCode);

			$(".tel").val(code[response.countryCode]['cod']);
		}
	};
	xhr.open('GET', endpoint, true);
	xhr.send();
});