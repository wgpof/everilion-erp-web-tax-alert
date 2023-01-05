// JavaScript Document
$(function () {
    Init();
});

function showCaducity() {
    $(".backGround").fadeIn();
    $(".modalPopUp").fadeIn("fade");

};
function hideCaducity() {
    $(".backGround").fadeOut();
    $(".modalPopUp").fadeOut("fade");
    $("#ifmCaducity").removeAttr("src");
    $("#ifmRedeem").removeAttr("src");
    $("#ifmRedeemMiles").removeAttr("src");
    $("#ifmRedeemDiscount").removeAttr("src");
    $("#ifmSimulator").removeAttr("src");
    $("#ifmTransferPoints").removeAttr("src");
    $("#ifmPoll").removeAttr("src");
    $("#ifmExtrac").removeAttr("src");

    $("#lnkCloseModal").hide();
    $("#divIframe").hide();
    $("#divIframeRedeem").hide();
    $("#divIframeRedeemMiles").hide();
    $("#divIframeRedeemDiscount").hide();
    $("#divIframeSimulator").hide();
    $("#divIframeTransferPoints").hide();
    $("#divIframePoll").hide();
    $("#divIframeExtract").hide();
}

function Init() {
    $("#divSearchMaster").hide();
    $("#lnkCloseModal").hide();
    $("#divIframe").hide();
    $(".backGround").hide();
    $(".welcome-icons-content div").hide();
    $(".modalPopUp").hide();
    $(".modalPopUp").hide();
    $("[class^=accordion-info]").hide();
    $('.accordion').click(function (event) {
        var idOperation = $(this).attr("data-idoperation");
        $(".accordion-info" + idOperation).toggle("fade");
        $(this).find(".ic-collapse").toggleClass("ic-expand");
    });
    $('.welcome-icons-content').on("mouseenter mouseleave", function (event) {

        $(this).find("div").fadeToggle("fast");
    });
    $('.order-up').click(function (event) {
        $(this).toggleClass("order-down");
    });

    $('#caducity-link1').click(showCaducity);
    $('#caducity-link2').click(showCaducity);
    $('.modal-close').click(hideCaducity);
    if ($(".datepicker").length) {
        $(".datepicker").datepicker({
            showOn: "button",
            buttonImage: "/lib/estilos/Product/images/ic_calendar.png",
            buttonImageOnly: true,
            buttonText: "Select date",
            dateFormat: "dd/mm/yy",
            monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            dayNamesMin: ["do", "lu", "ma", "mi", "ju", "vi", "sa"],
            firstDay: 1,
            maxDate: '0'
            //minDate: $("#inpMinimumDate").val()
        });
    }
    $(".datepickerNet").keydown(function () {
        return false;
    });

    //Ventana emergente para la caducidad de puntos
    $(".showPopupCaducity").click(function () {
        $("#ifmCaducity").attr("src", $(this).attr("pagetoshow"));
        $.blockUI();
    });

    $("#ifmCaducity").load(function () {
        if ($(this).attr("src") != null && $(this).attr("src") != '') {
            $("#lnkCloseModal").show();
            $("#divIframe").show();
            $(window).resize();
            $('[id^="popupCaducity"]').show();
            $.unblockUI();
        }
    });

    //Ventana emergente para la redencion en cashback
    $(".showPopupCashback").click(function () {
        $("#ifmRedeem").attr("src", $(this).attr("pagetoshow"));
        $.blockUI();
    });

    $("#ifmRedeem").load(function () {
        if ($(this).attr("src") != null && $(this).attr("src") != '') {
            $("#lnkCloseModalRedeem").show();
            $("#divIframeRedeem").show();
            $(window).resize();
            $('[id^="popupCashback"]').show();
            $.unblockUI();
        }
    });

    //Ventana emergente para la redencion en descuento cuota de manejo.
    $(".showPopupDiscount").click(function () {
        $("#ifmRedeemDiscount").attr("src", $(this).attr("pagetoshow"));
        $.blockUI();
    });

    $("#ifmRedeemDiscount").load(function () {
        if ($(this).attr("src") != null && $(this).attr("src") != '') {
            $("#lnkCloseModalRedeemDiscount").show();
            $("#divIframeRedeemDiscount").show();
            $(window).resize();
            $('[id^="popupDiscount"]').show();
            $.unblockUI();
        }
    });

    //Ventana emergente para la redencion en millas.
    $(".showPopupMiles").click(function () {
        $("#ifmRedeemMiles").attr("src", $(this).attr("pagetoshow"));
        $.blockUI();
    });

    $("#ifmRedeemMiles").load(function () {
        if ($(this).attr("src") != null && $(this).attr("src") != '') {
            $("#lnkCloseModalRedeemMiles").show();
            $("#divIframeRedeemMiles").show();
            $(window).resize();
            $('[id^="popupMiles"]').show();
            $.unblockUI();
        }
    });

    //Ventana emergente para el extracto mensual
    $(".showPopupExtract").click(function () {
        $("#ifmExtrac").attr("src", $(this).attr("pagetoshow"));
        $.blockUI();
    });

    $("#ifmExtrac").load(function () {
        if ($(this).attr("src") != null && $(this).attr("src") != '') {
            $("#lnkCloseModalExtract").show();
            $("#divIframeExtract").show();
            $(window).resize();
            $('[id^="popupExtract"]').show();
            $.unblockUI();
        }
    });

    //Ventana emergente para la transferencia de puntos entre clientes.
    $(".showPopupTransferPoints").click(function () {
        $("#ifmTransferPoints").attr("src", $(this).attr("pagetoshow"));
        $.blockUI();
    });

    $("#ifmTransferPoints").load(function () {
        if ($(this).attr("src") != null && $(this).attr("src") != '') {
            $("#lnkCloseModalTransferPoints").show();
            $("#divIframeTransferPoints").show();
            $(window).resize();
            $('[id^="popupTransferPoints"]').show();
            $.unblockUI();
        }
    });

    //Ventana emergente para las encuestas
    $(".showPopupPoll").click(function () {
        $("#ifmPoll").attr("src", $(this).attr("pagetoshow"));
        $.blockUI();
    });

    $("#ifmPoll").load(function () {
        if ($(this).attr("src") != null && $(this).attr("src") != '') {
            $("#lnkCloseModalPoll").show();
            $("#divIframePoll").show();
            $(window).resize();
            $('[id^="popupPoll"]').show();
            $.unblockUI();
        }
    });

    //Ventana emergente para el simulador de puntos
    $(".showPopupSimulator").click(function () {
        $("#ifmSimulator").attr("src", $(this).attr("pagetoshow"));
        $.blockUI();
    });

    $("#ifmSimulator").load(function () {
        if ($(this).attr("src") != null && $(this).attr("src") != '') {
            $("#lnkCloseModalSimulator").show();
            $("#divIframeSimulator").show();
            $(window).resize();
            $('[id^="popupSimulator"]').show();
            $.unblockUI();
        }
    });

    //Resize para todas las ventanas emergentes
    $(window).resize(function () {
        $('[id^="popupPoll_fore"]').css({
            left: ($(window).width() - $('[id^="popupPoll_fore"]').outerWidth()) / 2,
            top: ($(window).height() - $('[id^="popupPoll_fore"]').outerHeight()) / 2
        });

        $('[id^="popupSimulator_fore"]').css({
            left: ($(window).width() - $('[id^="popupSimulator_fore"]').outerWidth()) / 2,
            top: ($(window).height() - $('[id^="popupSimulator_fore"]').outerHeight()) / 2
        });

        $('[id^="popupTransferPoints_fore"]').css({
            left: ($(window).width() - $('[id^="popupTransferPoints_fore"]').outerWidth()) / 2,
            top: ($(window).height() - $('[id^="popupTransferPoints_fore"]').outerHeight()) / 2
        });

        $('[id^="popupMiles_fore"]').css({
            left: ($(window).width() - $('[id^="popupMiles_fore"]').outerWidth()) / 2,
            top: ($(window).height() - $('[id^="popupMiles_fore"]').outerHeight()) / 2
        });

        $('[id^="popupDiscount_fore"]').css({
            left: ($(window).width() - $('[id^="popupDiscount_fore"]').outerWidth()) / 2,
            top: ($(window).height() - $('[id^="popupDiscount_fore"]').outerHeight()) / 2
        });

        $('[id^="popupCashback_fore"]').css({
            left: ($(window).width() - $('[id^="popupCashback_fore"]').outerWidth()) / 2,
            top: ($(window).height() - $('[id^="popupCashback_fore"]').outerHeight()) / 2
        });

        $('[id^="popupExtract_fore"]').css({
            left: ($(window).width() - $('[id^="popupExtract_fore"]').outerWidth()) / 2,
            top: ($(window).height() - $('[id^="popupExtract_fore"]').outerHeight()) / 2
        });

        $('[id^="popupCaducity_fore"]').css({
            left: ($(window).width() - $('[id^="popupCaducity_fore"]').outerWidth()) / 2,
            top: ($(window).height() - $('[id^="popupCaducity_fore"]').outerHeight()) / 2
        });
    });
}

function ConfirmDialog(Message, ElementID) {
    var confirmDialog = $(document.createElement('div'));
    confirmDialog.html(Message);
    window.parent.$(".modal-close").hide();
    // Define the Dialog and its properties.
    confirmDialog.dialog({
        resizable: false,
        modal: true,
        draggable: false,
        title: "Confirmaci\u00F3n requerida",
        height: 250,
        width: 450,
        buttons: {
            "Aceptar": function () {
                var find = '_';
                var re = new RegExp(find, 'g');

                ElementID = ElementID.replace(re, '$');

                __doPostBack(ElementID, '');

                $(this).dialog('close');
                window.parent.$(".modal-close").show();
            },
            "Cancelar": function () {
                $(this).dialog('close');
                window.parent.$(".modal-close").show();
                return false;
            }
        },
        close: function (event, ui) {
            window.parent.$(".modal-close").show();
        }
    });

    return false;
}

function Message(Message) {
    var alert = $(document.createElement('div'));
    alert.html(Message);

    // Define the Dialog and its properties.
    alert.dialog({
        resizable: false,
        modal: true,
        draggable: false,
        title: "Mensaje",
        height: 250,
        width: 450,
        buttons: {
            "Aceptar": function () {
                $(this).dialog('close');
            },
        }
    });
}

//Validates the namber of commas on a decimal input (CssClass="decimal")
function validateCommas() {
    $('.decimal, .decimalInput').on('blur', function () {
        var count = 0;
        var value = $(this).val();

        for (var i = 0; i < value.length; i++) {
            if (value.charAt(i) == ',') count++;
        }

        if (count > 1) {
            $(this).val('0,00');
        }
    });
}

function ReziseMonthlyStatement() {
    document.getElementById('frReporting').style.height = (jQuery(document).height() - jQuery('#pnlRedeemPoints').height() - 115) + 'px';
    $("#frReporting").contents().find("div[id*='ReportViewerControl']").css("overflow", "visible");

    $("#frReporting").contents().find(".ToolbarExport .MenuBarBkGnd div a").each(function () {
        if ($(this).text().contains("PDF") == false) {
            $(this).hide();
        }
    });
}

var repId = "";
var footId = "";
var doresize = "0";

function resizeReport(HeaderID, ReportId) {

    doresize = '1';
    document.getElementById(ReportId).style.height = (jQuery(document).height() - jQuery('#' + HeaderID).height() - 50) + 'px';
    repId = ReportId;
    footId = HeaderID;

}
function OnResizeReport() {
    resizeReport(footId, repId);
}

jQuery(window).resize(function () {
    if (doresize == "1") {
        resizeReport(footId, repId);
    }
});