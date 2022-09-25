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
            if ($(this).is(':checked')) {
                $('.check-only').each(function () {
                    $(this).prop('checked', true);
                });
            } else {
                $('.check-only').each(function () {
                    $(this).prop('checked', false);
                });
            }
        });

        $('.check-only').click(function () {
            if(!$(this).is(':checked')) {
                $('.check-all').prop('checked', false);
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


    let handleFormBooking = function () {
        /* Clear input và đóng các step */
        $('#popupBooking').on('show.bs.modal', function (e) {
            $('#find-guest, #step-2 input').val('');
            $('#result-loading, #result-button, #result-list > *, #step-2, #step-3').hide();
        });

        /* Find data */
        if ($('#find-guest').length) {
            $('#find-guest').keyup(function () {
                let valFindGuest = $(this).val();

                if (valFindGuest.length) {
                    $('#result-loading').show();
                    $('#result-button, #result-list > *, #step-2, #step-3').hide();

                    if (valFindGuest == 1) {
                        $('#result-loading, #result-button, #result-list .no-result, #step-2, #step-3').hide();
                        setTimeout(function () {
                            $('#result-list .booking-result_list-item').fadeIn();
                        }, 300)
                    } else {
                        $('#result-loading, #result-list .booking-result_list-item, #step-2, #step-3').hide();
                        setTimeout(function () {
                            $('#result-button, #result-list .no-result').fadeIn();
                        }, 300);
                    }
                } else {
                    $('#result-loading, #result-button, #result-list > *, #step-2, #step-3').hide();
                }
            });
        }

        /* Button chọn data */
        $('.booking-choose').click(function (e) {
            e.preventDefault();
            let elmThis = $(this),
                elmValue = elmThis.attr('data-name');

            $('#find-guest').val(elmValue);
            $('#result-loading, #result-button, #result-list > *').hide();
            $('#step-2').fadeIn();
        });

        /* Delete data */
        $('.booking-delete').click(function (e) {
            e.preventDefault();
            let elmThis = $(this);
            elmThis.closest('.booking-result_list-item').fadeOut(function () {
                elmThis.closest('.booking-result_list-item').remove();
            });
        });

        /* Bước 2 */
        $('#btn-step-2').click(function () {
            $('#step-3').fadeIn();
        });

        /* Button recreate*/
        $('#btn-reCreate').click(function () {
            $('#find-guest, #step-2 input').val('');
            $('#result-loading, #result-button, #result-list > *, #step-2, #step-3').hide();
        });

        /* Popup add mới */
        if ($('#popupAdd').length) {
            $('#popupAdd').on('show.bs.modal', function (e) {
                $('#popupAdd #fullname, #popupAdd #phone, #popupAdd #email').val('');
                $('#popupAdd #fullname').val($('#find-guest').val());
            });

            $('#button-add').click(function (e) {
                $('#step-2').fadeIn();
                $('#step-2 #confirm-phone').val($('#popupAdd #phone').val());
                $('#step-2 #confirm-email').val($('#popupAdd #email').val());
                $('#result-loading, #result-button, #result-list > *').hide();
                $('#popupAdd').modal('hide');
            });
        }

        /* Add Service */
        if ($('#popupService').length) {
            $('#popupService .service-add').click(function () {
                $('#popupService').modal('hide');
                $('#popupDetail').modal('show');
            });
        }

        /* Delete Detail */
        $('#delete-detail').click(function () {
            Swal.fire({
                title: 'Delete a reservation?',
                text: "Here you can enter a reason for deleting the reservation.",
                icon: 'warning',
                buttonsStyling: false,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                customClass: {
                    confirmButton: 'btn btn-danger mx-1',
                    cancelButton: 'btn btn-light mx-1'
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Delete success',
                        icon: 'success',
                        buttonsStyling: false,
                        showCancelButton: false,
                        confirmButtonText: 'Close',
                        customClass: {
                            confirmButton: 'btn btn-light mx-1',
                        },
                    })
                }
            })
        });
    }

    let initMultiModal = function () {
        if ($('.modal').length) {
            $('.modal').each(function () {
                $(this).on('hidden.bs.modal', function (e) {
                    if ($('.modal.show').length) {
                        $('body').addClass('modal-open').css('padding-right', 17 + 'px');
                    }
                })
            });
        }
    }

    $(function () {
        initSidebar();
        initCheckAll();
        initSelect2();
        initSelectDay();
        initMultiModal();
        handleFormBooking();

        $(document).on('click', '.copy-value', function () {
            if ($(this).attr('data-value') != undefined) {
                initClipboardCopy($(this).attr('data-value'));
            } else {
                initClipboardCopy($(this).parent().find('input').val());
            }
        });
    });
})(jQuery);