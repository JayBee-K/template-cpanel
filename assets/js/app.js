;(function ($) {
	'use strict';
	let windowWidth = $(window).width();

	let initSidebar = function () {
		let btnCall = $('#call-sidebar'),
			overlay = $('#cpanel-overlay'),
			templateCpanel = $('#template-cpanel');

		btnCall.add(overlay).click(function () {
			if (!templateCpanel.is('.sidebar-show')) {
				templateCpanel.addClass('sidebar-show').attr({'style': 'overflow: hidden; height: 100vh; position: fixed'});
			} else {
				templateCpanel.removeClass('sidebar-show').attr({'style': ''});
			}
		});
	}

	let initClipboardCopy = function (value) {
		let createTextarea = document.createElement('textarea');
		createTextarea.style.cssText = 'position: absolute; left: -99999px';
		createTextarea.setAttribute("id", "textareaCopy");
		document.body.appendChild(createTextarea);
		let textareaElm = document.getElementById('textareaCopy');
		textareaElm.value = value;
		textareaElm.select();
		textareaElm.setSelectionRange(0, 99999);
		document.execCommand("copy");
		textareaElm.remove();
	}

	let initCheckAll = function () {
		$('.check-all').click(function () {
			if ($(".check-only").is("checked")) {
				$('.check-only').attr('checked', false);
			} else {
				$('.check-only').attr('checked', true);
			}
		});
	}

	let initSelect2 = function () {
		if ($('.initSelect2').length) {
			$('.initSelect2').select2();
		}
	}

	let initSelectDay = function () {
		const altFormat = "w/d/m/Y";

		const optionSelectDay = {
			defaultDate: [Date.now()],
			mode: "single",
			locale: "vn",
			altInput: true,
			altFormat: altFormat,
			showMonths: (windowWidth < 767) ? 1 : 2,
			minDate: "today",
			position: 'auto center',
			disableMobile: true,
			onChange: function (selectedDates, dateStr, instance) {
				const value = flatpickr.formatDate(selectedDates[0], altFormat).split('/');
				$('#day-result').html(value[1]);
				$('#month-result').html('Tháng&nbsp;' + value[2]);
				$('#year-result').html(value[3]);
				let rank_text = '';
				switch (parseInt(value[0])) {
					case 1:
						rank_text = 'Thứ hai';
						break;
					case 2:
						rank_text = 'Thứ ba';
						break;
					case 3:
						rank_text = 'Thứ tư';
						break;
					case 4:
						rank_text = 'Thứ năm';
						break;
					case 5:
						rank_text = 'Thứ sáu';
						break;
					case 6:
						rank_text = 'Thứ bảy';
						break;
					default:
						rank_text = 'Chủ nhật';
						break;
				}
				$('#rank-result').html(rank_text);
			},
		};

		$("#sel-day").flatpickr(optionSelectDay);
	}

	$(function () {
		initSidebar();
		initCheckAll();
		initSelect2();
		initSelectDay();


		$(document).on('click', '.copy-value', function () {
			if ($(this).attr('data-value') != undefined) {
				initClipboardCopy($(this).attr('data-value'));
			} else {
				initClipboardCopy($(this).parent().find('input').val());
			}
		});
	});
})(jQuery);