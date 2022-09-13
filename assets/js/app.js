;(function ($) {
	'use strict';

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

	$(function () {
		initSidebar();
		initCheckAll();
		$(document).on('click', '.copy-value', function () {
			if ($(this).attr('data-value') != undefined) {
				initClipboardCopy($(this).attr('data-value'));
			} else {
				initClipboardCopy($(this).parent().find('input').val());
			}
		});
	});
})(jQuery);