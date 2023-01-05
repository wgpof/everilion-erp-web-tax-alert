/*
Functions for correct management of bbvamultiselectDropDownlist control.
This functions were extracted to this js file, because the use of the control inside campaigns rule control causes lost of jscript in the multiselect control. 
Adding this js file in rule control the problem is fixed.
*/


// http://stackoverflow.com/questions/5821993/checkboxlist-items-using-javascript
function CheckAll(cblItemsId, checkAllId, txtId, emptytxt) {
    var name = "";

    var list = jQuery('#' + cblItemsId + ' input');
    list.each(function (index) {
        if (document.getElementById(checkAllId).checked == true) {
            this.checked = true;
            name += jQuery('label[for=' + this.id + ']').html() + ",";
        }
        else
            this.checked = false;
    });


    if (name == "") {
        name = emptytxt;
    } else {
        name = name.substring(0, name.length - 1);
    }

    document.getElementById(txtId).value = name;


}

function ClearAll(cblItemsId, checkAllId, popupId, scrollposId, txtId, emptytxt) {
    var name = "";
    var flag = 0;
    var list = jQuery('#' + cblItemsId + ' input');
    list.each(function (index) {
        if (this.checked == true) {
            flag = 1;
            name += jQuery('label[for=' + this.id + ']').html() + ",";
        }
    });



    if (flag == 0)
        document.getElementById(checkAllId).checked = false;
    else
        document.getElementById(checkAllId).checked = true;

    document.getElementById(scrollposId).value = jQuery("#" + popupId).scrollTop();


    if (name == "") {
        name = emptytxt;
    } else {
        name = name.substring(0, name.length - 1);
    }

    document.getElementById(txtId).value = name;

}


function popup(id, scrollposId) {
    if (jQuery("#" + id).attr("class") == "Panelhidden") {
        jQuery("#" + id).removeClass("Panelhidden")
        jQuery("#" + id).addClass("PanelShow");
    } else {
        jQuery("#" + id).removeClass("PanelShow")
        jQuery("#" + id).addClass("Panelhidden");
        jQuery(document).live("click", function () {
        });
    }
    if (scrollposId != "") {
        document.getElementById(scrollposId).value = 0;
    }

}

function pnlOffset(popupId, txtId, offxId, getoffx, scrollpos) {
    jQuery(document).live("click", function () {
        jQuery("#" + popupId).removeClass("PanelShow")
        jQuery("#" + popupId).addClass("Panelhidden");
    });

    jQuery("#" + txtId).live("click", function (e) {
        e.stopPropagation();
    });
    jQuery("#" + popupId).live("click", function (e) {
        e.stopPropagation();
    });


    /*Popup offset*/
    //jQuery("#" + popupId).show();
    objTxt = jQuery("#" + txtId);
    if (objTxt.offset() != null) {
        posy = jQuery("#" + txtId).offset().top;
        posx = jQuery("#" + txtId).offset().left;


        widhttext = jQuery("#" + txtId).width();
        heighttext = jQuery("#" + txtId).outerHeight();

        if (getoffx == 1) {
            oleft = parseFloat(posx);
            document.getElementById(offxId).value = posx.toString();
        } else {
            oleft = parseFloat(document.getElementById(offxId).value);
        }
        otop = parseFloat(posy) + parseFloat(heighttext);

        jQuery("#" + popupId).offset({ top: otop, left: oleft });



    }

    //jQuery("#" + popupId).animate({ scrollTop: scrollpos }, 0);
    //jQuery("#" + popupId).scrollTop(scrollpos);

}



function tmp_ofset(id) {

    //extender = $find(id);
    //event.cancelBubble = true;
    extender = jQuery("#" + id);
    extender._offsetX = 10;
    extender._offsetY = 10;
}



