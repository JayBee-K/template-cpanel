;(function ($) {
	'use strict';
	let windowWidth = $(window).width();

	let initFormFloating = function () {
		if ($('.form-floating').length) {
			$('.form-floating .form-control').blur(function () {
				if ($(this).val() != "") {
					$(this).addClass("valid");
				} else {
					$(this).removeClass("valid");
				}
			});
		}
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

	$(function () {
		initFormFloating();
		$(document).on('click', '.copy-value', function () {
			if ($(this).attr('data-value') != undefined) {
				initClipboardCopy($(this).attr('data-value'));
			} else {
				initClipboardCopy($(this).parent().find('input').val());
			}
		});
	});
})(jQuery);