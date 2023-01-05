// JavaScript Document
jQuery(document).bind("mobileinit", function () {
    jQuery.mobile.ajaxEnabled = false;
});
jQuery(function () {
    /*INDEX AFTER LOGIN*/
    var dataTypeMenu;
    if (jQuery(".index-login").length) {
        //jQuery( "#menu" ).menu({icons: { submenu: "ic-menu-triangle" }})
        jQuery(".data-user").toggleClass("ui-state-active");
        if (dataTypeMenu != "red") {
            jQuery("#menu").show("fold", "slow", function () {
                jQuery(".data-user").off("click");
                jQuery(this).addClass("block_important");
                jQuery(".ui-item-menu-business").children("ul").css("top", (jQuery(".ui-item-menu-business").offset().top - 54))
                //jQuery(this).menu( "focus", null, jQuery("#menu").find( ".ui-item-menu-business" )).menu("expand");
            });
        }
    } else {
        //jQuery( "#menu" ).menu({icons: { submenu: "ic-menu-triangle" }})
        //jQuery( "#menu" ).hide();
    }
    /*HOME*/
    /*JQUERY UI DATA USER MENU AND SUBMENU*/
    jQuery(".menu-secondary").hide();
	/*jQuery(".data-user-text").on("click",function(event){
		jQuery( ".data-user-menu" ).toggle();
		jQuery(this).parent().toggleClass("ui-state-active");
		jQuery(".ui-menu-item").children("ul").hide();
		if(dataTypeMenu=="red"){
			jQuery(".ui-menu-item-wrapper").removeClass("ui-state-active");
		}
	});*/
    jQuery(".wrapper-a").on("click", function (event) {
        jQuery(".ui-menu-item").children("ul").hide();
        jQuery(".ui-menu-item-wrapper.ui-state-active").removeClass("ui-state-active");
        jQuery(this).addClass("ui-state-active");
        jQuery(this).parent().children("ul").show();
        jQuery(this).parent().children("ul").css("top", (jQuery(this).offset().top - 54))
        if (jQuery(this).parent().children("ul").height() > (jQuery(window).height() - jQuery(this).offset().top)) {
            jQuery(this).parent().children("ul").css("height", (jQuery(window).height() - jQuery(this).offset().top))
        }
    });
    jQuery(".index-login .ui-item-menu-business a").on("click", function () {
        jQuery(".ic-user").next().remove();
        jQuery(".ic-user").after("<img src='images/logo_rocket.png' class='bck-round-shape ic-business'>");
        jQuery(".data-user-business").text("Red rocket")
        dataTypeMenu = jQuery(this).attr("data-type");
        if (dataTypeMenu == "red") {
            jQuery(".ui-item-menu-profile").children("ul").css("top", (jQuery(".ui-item-menu-profile").offset().top - 54))
            jQuery(".ui-menu-item-wrapper.ui-state-active").removeClass("ui-state-active")
            jQuery(".wrapper-a.profile").addClass("ui-state-active")
            jQuery(".ui-menu-item").removeClass("ui-state-disabled");
            jQuery(".ui-item-menu-business").children("ul").hide();
            jQuery(".ui-item-menu-profile .ui-menu-profile").show();
            //jQuery("#menu").menu( "focus", null, jQuery("#menu").find( ".ui-item-menu-profile" )).menu("expand");
        }
    });
    /*PPAL MENU SCROLL*/
    if (jQuery(".scrollbar-inner").length) {
        jQuery(".scrollbar-inner").scrollbar();
    }
    /*CHECK IF PAGE LOADED IS INDEX*/
    if (jQuery(".grid").length) {
        jQuery("body").addClass("body-index");
    }
    /*PROFILE*/
    if (jQuery(".content", window.parent.document).contents().find(".profile").length) {
        Dropzone.options.dropzone = {
            maxFiles: 1,
            uploadMultiple: false,
            acceptedFiles: ".png,.gif,.jpg",
            init: function () {
                this.on('addedfile', function (file) {
                    if (this.files.length > 1) {
                        this.removeFile(this.files[0]);
                    }
                });
            }
        };
    }
    /*QUICK ACCESS*/
    if (jQuery(".quick-access").length) {
        //COLORPICKER PLUGIN
        var colorEnd = "#cccccc";
        jQuery('#colorpickerHolder2').ColorPicker({
            flat: true,
            color: '#cccccc',
            onShow: function (colpkr) {
                jQuery(colpkr).fadeIn(500);
                return false;
            },
            onHide: function (colpkr) {
                jQuery(colpkr).fadeOut(500);
                return false;
            },
            onChange: function (hsb, hex, rgb) {
                colorEnd = hex;
                jQuery('#colorSelector2 div').css('backgroundColor', '#' + hex);
            }
        });

        jQuery('#colorpickerHolder2>div').css('position', 'absolute');
        var widt = false;
        jQuery('#colorSelector2').bind('click', function () {
            jQuery('#colorpickerHolder2').stop().animate({ height: widt ? 0 : 173 }, 500);
            widt = !widt;
        });

        jQuery("body").addClass("body-profile");

        /*EDIT DIRECT WIDGET*/

        jQuery(".quick-access .direct-widget-item").on("click", function (event) {
            event.preventDefault();
            alert("Al hacer click que se pueda editar o que vaya a la sección")
        });

        jQuery(".direct-widget-item .ic-delete").on("click",
            function () {
                jQuery(this).parent().hide("scale", function () {
                    jQuery(this).remove();
                });
            });

        var directLinkEdit = function directLinKEdit(event) {
            event.preventDefault();
            jQuery(".direct-widget-item a").not(jQuery(this)).removeClass("active");
            jQuery(this).toggleClass("active");
            if (!jQuery(this).hasClass("active")) {
                jQuery("#selectmenu_menu").val("");
                jQuery("#selectmenu_submenu").val("")
                jQuery("#selectmenu_menu, #selectmenu_submenu").selectmenu("refresh");
                jQuery("#alias").val("")
            } else {
                jQuery("#selectmenu_menu").val(jQuery(this).find(".bck-round-shape").attr("data-type"));
                jQuery("#selectmenu_submenu").val(jQuery(this).find(".bck-round-shape").attr("data-subtype"))
                jQuery("#selectmenu_menu, #selectmenu_submenu").selectmenu("refresh");
                jQuery("#alias").val(jQuery(this).find("span").text());
            }
        }
        jQuery(".direct-widget-header .ic-accept").on("click", function (e) {
            e.preventDefault();
            var classIcon = jQuery("#selectmenu_menu option:selected").val();
            var classIconSub = jQuery("#selectmenu_submenu option:selected").val();
            var alias = jQuery("#alias").val()
            if (alias.length && classIcon.length && classIconSub.length) {
                if (jQuery(".direct-widget-item a.active").length) {
                    jQuery(".direct-widget-item a.active").attr("data-type", classIcon);
                    jQuery(".direct-widget-item a.active").attr("data-subtype", classIconSub);
                    jQuery(".direct-widget-item a.active span").text(alias);
                    jQuery(".direct-widget-item a.active").attr("title", classIcon + " > " + classIconSub + " > " + alias);
                } else {
                    jQuery(".grid2").append("<div class='col-lg-3 col-md-4 col-sm-4 col-xs-4 col-xxs-4 direct-widget-item'><a href='#' data-type='" + classIcon + "' data-subtype='" + classIconSub + "' title='" + classIcon + " > " + classIconSub + " > " + alias + "'><div class='ic-direct-widget-item' data-type='" + classIcon + "' style='background-color:#" + colorEnd + "'></div><span>" + jQuery("#alias").val() + "</span></a><div class='ic-widget ic-delete'></div></div>");
                    jQuery(".direct-widget-item .ic-delete").on("click", function () {
                        jQuery(this).parent().hide("scale", function () { jQuery(this).remove(); })
                    });
                    jQuery('#colorpickerHolder2').hide();
                }
            } else {
                jQuery("<span class='col-lg-12 ui-state-highlight errorField'>Faltan campos por rellenar</span>").prependTo(jQuery(".grid2")).hide().show("fade").delay(2000).hide("fade", function () { jQuery(this).remove() });
                jQuery(".grid2").on("click", function () {
                    jQuery(".errorField").hide("fade", function () { jQuery(this).remove(); })
                })
            }
        })
    }
    if (jQuery(".analytics-iframe").length)
    {
        jQuery(".analytics-iframe").css("height", jQuery(window).height() - 130);
        jQuery(window).on("resize", function () {
            jQuery(".analytics-iframe").css("height", jQuery(window).height() - 130);
        })
    }
    jQuery(".news-text a").on("click", function () {
        jQuery(".news").hide("fade", function () { jQuery(".news").remove(); })
        jQuery(".body-index .footer").removeClass("footerClose");
    })

    /*ILION LOGO*/
    jQuery(".img-logo").on("click", function () {
        jQuery(".menu-secondary").hide("blind", { direction: "left" }, function () {
            jQuery(".menu-secondary .menu-secondary-item").hide();
            jQuery(".menu-principal a").removeClass("active-minus");
            currentItem = "";
            currentMenu = "";
        });
    })

    /*MENU*/
    jQuery("#closemenu-secondary-btn").on("click", function () {
        jQuery(".menu-secondary").hide("blind", { direction: "left" }, function () {
            jQuery(".menu-secondary .menu-secondary-item").hide();
            jQuery(".menu-principal a").removeClass("active-minus");
            currentItem = "";
            currentMenu = "";
        });
    })



    jQuery(".menu-secondary .menu-secondary-item").hide();
    jQuery(".ic-menu").on("click", function () {
        jQuery(".menu-secondary").removeClass("paddingSearch");
        jQuery(".menu-principal").toggleClass("hiddenWidth768");
        jQuery(".menu-principal-bckMobile").toggleClass("menu-principal-bckMobile-visible");
        jQuery(this).toggleClass("rotateIcon");
        jQuery("." + jQuery(".active").attr("data-type")).show();
        if (jQuery(".menu-secondary").is(":visible")) {
            jQuery(".menu-secondary .menu-secondary-item").hide();
            jQuery(".menu-secondary").hide();
        }
        if (jQuery(".header .ic-search").is(":visible")) {
            jQuery(".panel-search-up").removeClass("widthSearch");
            jQuery(".header .ic-search").removeClass("rotateIcon");
            jQuery(".panel-search-up-wrapper").removeClass("mobile");
        }
        if (jQuery(".search-panel.open").length) {
            jQuery(".search-panel").removeClass("open")
        }
        jQuery(".menu-principal a").removeClass("active-minus");
        currentItem = "";
        currentMenu = "";
    })
    /*SEARCH HEADER*/
    jQuery(".header .ic-search").on("click", function () {
        jQuery(".panel-search-up-wrapper").toggleClass("mobile");
        jQuery(".panel-search-up").toggleClass("widthSearch");
        jQuery(".menu-secondary").addClass("paddingSearch");
        jQuery(".header .ic-search").toggleClass("rotateIcon");
        jQuery(".menu-secondary .menu-secondary-item").show();
        jQuery(".menu-secondary").scrollTop(0);
        if (jQuery(".menu-principal").css("width") != "0px" && jQuery(".menu-secondary").is(":visible")) {
            jQuery(".ic-menu").removeClass("rotateIcon");
            jQuery(".menu-principal").addClass("hiddenWidth768");
            jQuery(".menu-principal-bckMobile").toggleClass("menu-principal-bckMobile-visible");
        } else if (jQuery(".menu-principal").css("width") != "0px" && !jQuery(".menu-secondary").is(":visible")) {
            jQuery(".ic-menu").removeClass("rotateIcon");
            jQuery(".menu-principal").addClass("hiddenWidth768");
            jQuery(".menu-principal-bckMobile").toggleClass("menu-principal-bckMobile-visible");
            jQuery(".menu-secondary").show();
        } else if (jQuery(".menu-principal").css("width") == "0px") {
            jQuery(".menu-secondary").toggle("blind", { direction: "left" });
        }
    })
	/*jQuery(".data-user .ic-user").on("click", function(){
		if(jQuery(".data-user-text").is(":hidden")){
			jQuery(".data-user-text").addClass("mobile")
		}else{
			jQuery(".data-user-text").removeClass("mobile")
		}
	})*/
	/*
	jQuery(".data-user").on("click", function(){
		window.location.href="perfil.html"
	});*/
    var currentItem;
    var currentMenu = false;

    jQuery(".menu-principal a").not(jQuery(".menu-principal a[data-type='inicio']")).on("click", function (event) {
        event.preventDefault();
        
        jQuery(".menu-secondary").removeClass("search");
        jQuery(".menu-secondary .menu-secondary-item").hide();
        
        if (currentMenu != false)
        {
            currentMenu.hide();
            currentMenu = false;
            jQuery(".menu-secondary").removeAttr("style").hide();
        }

        else//gets in first time when click
        {
            jQuery("." + jQuery(this).attr("data-type")).delay(150).show("blind", { direction: "left" });
            currentMenu = jQuery("." + jQuery(this).attr("data-type"));
            jQuery(".menu-secondary").show();
        }

        if (currentItem != jQuery(this).text())//Controls erase of menu when clicked a second time
        {
            jQuery(".menu-secondary").show();
            jQuery(".menu-secondary ." + jQuery(".menu-principal .active-minus").attr("data-type")).hide();
            jQuery("." + jQuery(this).attr("data-type")).delay(150).show("blind", { direction: "left" });
            jQuery(".menu-principal a").removeClass("active-minus");
            jQuery(this).addClass("active-minus");
            currentMenu = jQuery("." + jQuery(this).attr("data-type"));
        }

        else
        {
            jQuery(this).toggleClass("active-minus");
        }
        currentItem = jQuery(this).text();
    })
    /*END OF MENU*/
    if (jQuery("#filterable").length)
    {
        jQuery("#filterable").on("focus", function () {
            jQuery(".menu-principal a").removeClass("active-minus");
            jQuery(".menu-secondary .menu-secondary-item").show();
            jQuery(".menu-secondary .menu-secondary-item").css("display", "inline-block")
            jQuery(".menu-secondary").show("blind", { direction: "left" });
            jQuery(".menu-secondary").scrollTop(0);
            currentItem = "";
            if (jQuery(".search-panel.open").length) {
                jQuery(".search-panel").removeClass("open")
                jQuery(".content.contentSearch").removeClass("contentSearch")
            }
        });
    };
    /*COMBOBOX AUTOCOMPLETE*/
    jQuery.widget("custom.combobox", {
        _create: function () {
            this.wrapper = jQuery("<span>")
                .addClass("custom-combobox")
                .insertAfter(this.element);
            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
        },
        _createAutocomplete: function () {
            var defaultItem = this.element.find("option[value='']").text();
            var selected = this.element.children(":selected"),
                value = selected.val() ? selected.text() : "";
            this.input = jQuery("<input>")
                .appendTo(this.wrapper)
                .val(value)
                .attr("title", "")
                .attr("placeholder", defaultItem)
                .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
                .autocomplete({
                    delay: 0,
                    minLength: 0,
                    source: jQuery.proxy(this, "_source")
                })
                .tooltip({
                    classes: {
                        "ui-tooltip": "ui-state-highlight"
                    }
                });
            this._on(this.input, {
                autocompleteselect: function (event, ui) {
                    ui.item.option.selected = true;
                    this._trigger("select", event, {
                        item: ui.item.option
                    });
                },
                autocompletechange: "_removeIfInvalid"
            });
        },
        _createShowAllButton: function () {
            var input = this.input,
                wasOpen = false;
            jQuery("<a>")
                .attr("tabIndex", -1)
                //.attr( "title", "Show All Items" )
                //.tooltip()
                .appendTo(this.wrapper)
                .button({
                    icons: {
                        primary: "ui-icon-triangle-1-s"
                    },
                    text: false
                })
                .removeClass("ui-corner-all")
                .addClass("custom-combobox-toggle ui-corner-right")
                .on("mousedown", function () {
                    wasOpen = input.autocomplete("widget").is(":visible");
                })
                .on("click", function () {
                    input.trigger("focus");
                    // Close if already visible
                    if (wasOpen) {
                        return;
                    }
                    // Pass empty string as value to search for, displaying all results
                    input.autocomplete("search", "");
                });
        },
        _source: function (request, response) {
            var matcher = new RegExp(jQuery.ui.autocomplete.escapeRegex(request.term), "i");
            response(this.element.children("option").map(function () {
                var text = jQuery(this).text();
                if (this.value && (!request.term || matcher.test(text)))
                    return {
                        label: text,
                        value: text,
                        option: this
                    };
            }));
        },
        _removeIfInvalid: function (event, ui) {
            // Selected an item, nothing to do
            if (ui.item) {
                return;
            }
            // Search for a match (case-insensitive)
            var value = this.input.val(),
                valueLowerCase = value.toLowerCase(),
                valid = false;
            this.element.children("option").each(function () {
                if (jQuery(this).text().toLowerCase() === valueLowerCase) {
                    this.selected = valid = true;
                    return false;
                }
            });
            // Found a match, nothing to do
            if (valid) {
                return;
            }
            // Remove invalid value
            this.input
                .val("")
                .attr("title", value + " no coincide con ningún registro")
                .tooltip("open");
            this.element.val("");
            this._delay(function () {
                this.input.tooltip("close").attr("title", "");
            }, 2500);
            this.input.autocomplete("instance").term = "";
        },
        _destroy: function () {
            this.wrapper.remove();
            this.element.show();
        }
    });
    /*END COMBOBOX AUTOCOMPLETE*/
    jQuery(".combobox").combobox();
    jQuery(".datepicker").datepicker();

    function startClock() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        m = checkTime(m);
        document.getElementById('clock').innerHTML = h + ":" + m;
        var t = setTimeout(startTime, 500);
    }

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i
        };  // add zero in front of numbers < 10
        return i;
    }
    /*CHECKBOX*/
    jQuery(".chexboxes_radios").checkboxradio();
    /*SELECT MENU*/
    jQuery(".selectmenu").selectmenu();
    jQuery(".footer .selectmenu, .search-panel-item .selectmenu").selectmenu("option", "position", { at: "center top-80" });
    /*TABS*/
    jQuery("#tabs").tabs();
    /*ACCORDION AND HOME MASONRY*/
    if (jQuery(".widget-item-content .accordion").length) {
        jQuery(".widget-item-content .accordion").accordion({ collapsible: true, heightStyle: "content", active: "false", activate: function (event, ui) { jQuery(".grid").packery('layout'); } });
        var packeryOptions = {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true,
        };
        var jQuerygrid = jQuery('.grid').packery(packeryOptions);
        var jQueryitems = jQuerygrid.find('.grid-item').not('.widget-item-content').draggable({
            handle: ".widget-item-header",
            cancel: ".widget-item-content",
            start: function () {
                if (jQuery(window).height() >= jQuery(document).height()) { jQuery(".content").css("overflow", "hidden"); }
            },
        });
        jQuerygrid.packery('bindUIDraggableEvents', jQueryitems);
        jQuerygrid.on('click', '.grid-item .widget-item-header .ic-delete',
            function (event) {
                jQuery(".grid-item3[data-type='" + jQuery(this).parent().parent().parent().attr("data-type") + "']").removeClass("active");
                jQuery(this).parent().parent().parent().hide("scale", function () {
                    jQuery(".grid").packery('layout');
                });
            }
        );
        jQuerygrid.on('dragItemPositioned',
            function (event, draggedItem) {
                jQuery(".content").css("overflow", "auto")
            }
        );
        /*FOOTER HOME*/
        jQuery(".body-index .footer .ui-button").on("click", function () {
            jQuery(".body-index .footer").toggleClass("footerClose");
            jQuery(this).find("span").toggleClass("rotateIcon180");
        })
        jQuery(".grid-item3").on("click", function gridItem3() {
            if (jQuery(this).hasClass("active")) {
                jQuery(this).addClass("disable");
                jQuery("." + jQuery(this).attr("data-type")).hide("scale", function () { jQuery(".grid").packery('layout') });
            } else {
                jQuery(this).removeClass("disable")
                jQuery("." + jQuery(this).attr("data-type")).css("z-index", "200").show("scale", function () { jQuery(".grid").packery('layout') });
            }
            jQuery(this).toggleClass("active");
        });
        /*DETECTS LOW RESOLUTIONS AND DISABLE DRAGGABLES*/
        jQuery(".grid3").sortable({
            opacity: 0.7, helper: "clone", cancel: ".disable", stop: function (event, ui) {
                if (ui.item.prev().attr("data-type") == undefined) {
                    jQuery(".grid ." + ui.item.attr("data-type")).detach().insertAfter(jQuery(".grid-sizer"));
                } else {
                    jQuery(".grid ." + ui.item.attr("data-type")).detach().insertAfter(jQuery(".grid ." + ui.item.prev().attr("data-type")));
                }
                jQuery(".grid").packery('reloadItems');
                jQuery(".grid").packery('layout');

            }
        }).disableSelection();
        if (jQuery(this).width() <= "992") {
            jQueryitems.draggable("disable");
            jQuery(".grid3").sortable({
                opacity: 0.7, helper: "clone", cancel: ".disable", stop: function (event, ui) {
                    if (ui.item.prev().attr("data-type") == undefined) {
                        jQuery(".grid ." + ui.item.attr("data-type")).detach().insertAfter(jQuery(".grid-sizer"));
                    } else {
                        jQuery(".grid ." + ui.item.attr("data-type")).detach().insertAfter(jQuery(".grid ." + ui.item.prev().attr("data-type")));
                    }
                    jQuery(".grid").packery('reloadItems');
                    jQuery(".grid").packery('layout');

                }
            }).disableSelection();
        } else {
            jQuery(".grid3").sortable("disable")
            jQueryitems.draggable("enable");
        }
        jQuery(window).on("resize", function () {
            if (jQuery(this).width() <= "992") {
                jQueryitems.draggable("disable");
                jQuery(".grid3").sortable("enable");
            } else {
                jQuery(".grid3").sortable("disable")
                jQueryitems.draggable("enable")
            }
        });
    }
    /*ACCORDIONS*/
    jQuery(".accordion").accordion({ collapsible: true, heightStyle: "content" });
    /*BUTTONS*/
    jQuery("input[type=submit], input[type=reset], button, .button").button();
    jQuery(".button-search").button({
        icon: "ui-icon-search",
        showLabel: false
    });
    /*SEARCH PANEL FOOTER*/
    function resizeContent() {
        jQuery(window).on("resize", function () {
            jQuery(".content.contentSearch").css("height", (jQuery(window).height() - 107))
        })
    }
    if (jQuery(".search-result").length) {
        jQuery(".search-result td").hide();
        if (!jQuery(".emptyTable").length) {
            jQuery(".search-result tbody").append("<tr class='emptyTable'><td colspan='6'><span class='marginAuto ic-search'></span><div>Filtra y busca resultados en el panel de búsqueda</div></td></tr>");
        }
    }

    jQuery(".footer .ic-search").on("click", function () {
        jQuery(this).hide();
        jQuery("#footer_search").hide();
        jQuery(".search-panel", window.parent.document).contents().find(".search-result td").show();
        jQuery(".search-panel", window.parent.document).contents().find(".emptyTable td").hide();
        jQuery(".content", window.parent.document).toggleClass("contentSearch");
        jQuery(".search-panel", window.parent.document).toggleClass("open");
        //jQuery(".search-panel", window.parent.document).addClass("open");
        //jQuery(".content, .footer").addClass("contentSearch");
        //jQuery(".content",window.parent.document).css("overflow-y","hidden");
        //jQuery(".content.contentSearch", window.parent.document).css("height", (jQuery(window).height()-107))
        //jQuery(".content.contentSearch", window.parent.document).css("overflow-y","auto");
        //resizeContent();
    });
    jQuery(".search-panel-item .ic-search").on("click", function () {
        jQuery(".search-panel", window.parent.document).contents().find(".search-result td").show();
        jQuery(".search-panel", window.parent.document).contents().find(".emptyTable td").hide();
    });
    jQuery(".ui-button.search-dragger").on("click", function () {
        jQuery("#footer_search, .footer .ic-search").toggle();
        jQuery(".content", window.parent.document).toggleClass("contentSearch");
        jQuery(".search-panel", window.parent.document).toggleClass("open");
        //alert("botón para abrir y arrastrar");
		/*
		if(jQuery("#footer_search").css("display")=="none" && !jQuery(".footer .ic-search").is(":visible")){
			jQuery(".footer .ic-search", window.parent.document).show();
			jQuery("#footer_search", window.parent.document).removeAttr("style")
		}else if(jQuery("#footer_search", window.parent.document).css("display")!="none" && jQuery(".footer .ic-search").is(":visible")){
			jQuery("#footer_search", window.parent.document).css("display","none");
			jQuery(".footer .ic-search", window.parent.document).toggle();
		}
		jQuery(".footer").toggleClass("contentSearch");
		jQuery(".content", window.parent.document).toggleClass("contentSearch");
		//jQuery(".content", window.parent.document).css("overflow-y","auto");
		jQuery(".search-panel",window.parent.document).toggleClass("open");
		if(!jQuery(".content", window.parent.document).hasClass("contentSearch")){
			//jQuery(".content", window.parent.document).css("overflow-y","hidden");
			//jQuery(".content", window.parent.document).css("height", "auto");
			//jQuery(".content", window.parent.document).css("overflow-y","auto");
		}else{
			jQuery(".content", window.parent.document).css("overflow-y","hidden");
			//jQuery(".content.contentSearch", window.parent.document).css("height", (jQuery(window).height()-107));
			//jQuery(".content.contentSearch", window.parent.document).css("overflow-y","auto");
			//resizeContent();
		}
		*/
    });
    /*FORMS*/
    jQuery("#saveEmission").on("click", function () {
        if (jQuery("#combobox_prices1").val() == "" || jQuery(".input-bank").val() == "") {
            if (!jQuery(".error").length) {
                jQuery("#combobox_prices1 + .custom-combobox .custom-combobox-input, .input-bank").addClass("error")
                jQuery("<span class='col-lg-12 ui-state-highlight error-field'>Este campo es obligatorio</span>").appendTo(jQuery("#combobox_prices1 + .custom-combobox .custom-combobox-input, .input-bank").parent()).hide().show("fade");
                jQuery(".error").on("click", function () {
                    jQuery(this).removeClass("error");
                    jQuery(this).siblings(".error-field").remove();
                });
            }
        };
    })
});
/*DATEPICKER REGIONAL*/
jQuery.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '< Ant',
    nextText: 'Sig >',
    currentText: 'Hoy',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: '',
    changeMonth: true,
    changeYear: true,
    customClassMonth: "hola"
};
jQuery.datepicker.setDefaults(jQuery.datepicker.regional['es']);
/*POP UP*/
function popitup(url) {
    newwindow = window.open(url, "name", "height=330,width=950");
    if (window.focus) { newwindow.focus() }
    return false;
}
