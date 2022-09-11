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

    let initFromModule1 = function () {
        let elmWrapper = $('#createRow');
        $('#createRow').on('click', '.addRow', function () {
            let theCaoSelect = $(this).closest('.row-item').find('#theCao'),
                theCaoIndexSelected = theCaoSelect.find('option:selected').attr('data-index'),
                theCaoRender = $(this).closest('.row-item').find('#theCao').clone();

            theCaoRender.find('option').attr('selected', false);
            theCaoRender.find('option[data-index=' + theCaoIndexSelected + ']').attr('selected', true);

            let menhGiaSelect = $(this).closest('.row-item').find('#menhGia'),
                menhGiaIndexSelected = menhGiaSelect.find('option:selected').attr('data-index'),
                menhGiaRender = $(this).closest('.row-item').find('#menhGia').clone();

            menhGiaRender.find('option').attr('selected', false);
            menhGiaRender.find('option[data-index=' + menhGiaIndexSelected + ']').attr('selected', true);

            let rowRender = `<div class="row-item row row5">
                            <div class="col-lg-3 col-sm-12 col-12">
							    ${theCaoRender[0].innerHTML}
							 </div>
							<div class="col-lg-3 col-sm-6 col-12">
							    <div class="position-relative form-icon form-icon_right">
								    <input type="text" class="form-control" placeholder="Mã thẻ">
                                    <button type="button" class="copy-value form-button">
                                        <i class="fas fa-paste"></i>
                                    </button>
								</div>
							</div>
							<div class="col-lg-3 col-sm-6 col-12">
							    <div class="position-relative form-icon form-icon_right">
								    <input type="text" class="form-control" placeholder="Mã seri">
                                    <button type="button" class="copy-value form-button">
                                        <i class="fas fa-paste"></i>
                                    </button>
								</div>
							</div>
							<div class="col-lg-2 col-sm-10 col-9">
							    ${menhGiaRender[0].innerHTML}
							</div>
							<div class="col-lg-1 col-sm-2 col-3 text-right">
								<button type="button" class="btn btn-small btn-danger deleteRow w-100">
									<i class="fas fa-trash-alt"></i>
								</button>
							</div>
						</div>`;
            elmWrapper.append(rowRender);
        }).on('click', '.deleteRow', function () {
            $(this).closest('.row-item').remove();
        });
    }

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
        initFromModule1();
        initFormFloating();
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