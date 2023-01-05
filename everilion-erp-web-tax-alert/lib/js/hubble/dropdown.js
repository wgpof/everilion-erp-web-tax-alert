$(document).ready(function () {
    /*0502 DROPDOWN */
    jQuery(document).click(function (event) {
        if (!jQuery(".dropdown-items-wrapper").is(event.target)) {
            jQuery(".dropdown-items-wrapper").addClass("hidden").removeClass("animated fadeIn");
            jQuery(".dropdown").find(".ui-icon").removeClass("animated rotateIcon up");
        }
    });
    jQuery(".dropdown-items-wrapper").on("click", function (event) {
        event.stopPropagation();
    });
    jQuery(".dropdown").live("click", function (event) {
        event.stopPropagation();
        if (jQuery(".dropdown-items-wrapper").not(jQuery(this).siblings(".dropdown-items-wrapper")).is(":visible")) {
            jQuery(".dropdown-items-wrapper").addClass("hidden").removeClass("animated fadeIn");
            jQuery(".dropdown").find(".ui-icon").not(jQuery(this).find(".ui-icon")).removeClass("animated rotateIcon up");
        }
        var posTop;
        var posLeft;
        var posRight;
        if (jQuery(this).hasClass("upRight")) {
            posTop = -(jQuery(this).siblings(".dropdown-items-wrapper").height() + (jQuery(this).height() / 2) + 5);
            posRight = jQuery(this).css("margin-right");
            jQuery(this).siblings(".dropdown-items-wrapper").css({ "top": posTop, "right": posRight });
            jQuery(this).find(".ui-icon").toggleClass("animated rotateIcon up")
        } else if (jQuery(this).hasClass("upLeft")) {
            posTop = -(jQuery(this).siblings(".dropdown-items-wrapper").height() + (jQuery(this).height() / 2) + 5);
            posLeft = jQuery(this).position().left + Number(jQuery(this).css("margin-left").replace("px", ""));
            jQuery(this).siblings(".dropdown-items-wrapper").css({ "top": posTop, "left": posLeft });
            jQuery(this).find(".ui-icon").toggleClass("animated rotateIcon up")
        } else if (jQuery(this).hasClass("downLeft")) {
            posTop = jQuery(this).position().top + jQuery(this).height() + 10;
            posLeft = jQuery(this).position().left + Number(jQuery(this).css("margin-left").replace("px", ""));
            jQuery(this).siblings(".dropdown-items-wrapper").css({ "top": posTop, "left": posLeft });
            jQuery(this).find(".ui-icon").toggleClass("animated rotateIcon")
        } else if (jQuery(this).hasClass("downRight")) {
            posTop = jQuery(this).position().top + jQuery(this).height() + 10;
            var nRight = jQuery(window).width()-(jQuery(this).position().left+jQuery(this).children(".dropdown-items-wrapper").width()+jQuery(this).width());
            posRight = nRight + "px";
            jQuery(this).siblings(".dropdown-items-wrapper").css({ "top": posTop, "right": posRight });
            jQuery(this).find(".ui-icon").toggleClass("animated rotateIcon")
        }
        jQuery(this).siblings(".dropdown-items-wrapper").toggleClass("hidden animated fadeIn");
        jQuery(window).on("resize", function () {
            jQuery(".dropdown").siblings(".dropdown-items-wrapper").addClass("hidden");
            jQuery(".dropdown").find(".ui-icon").removeClass("animated rotateIcon up");
        })
    });
});
      /*0502 FIN DROPDOWN */
