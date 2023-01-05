<script language="javascript">
var newKey = 121;
var saveKey = 113;
var searchKey = 13;

if (window.document.addEventListener)
{
    window.document.addEventListener("keydown", callkeydownhandler, false);
}
else
{
    window.document.attachEvent("onkeydown", callkeydownhandler);
}

function callkeydownhandler(evnt)
{
    ev = (evnt) ? evnt : event;
    shortkeynet(ev);
}

function shortkeynet(e)
{
    var keycode = e.keyCode;
    var checkFields = 0;
    var valueRet = true;
    if (keycode == saveKey) checkFields = 1;

    if (checkFields == 1)
    {
        try
        {
            valueRet = CheckData();
        }
        catch(err)
        {
            valueRet = true;
        }
    }
    if (valueRet)
    {
        // Event Save Key
        if (keycode == saveKey)
        {
            if (jQuery('a[id$=ibGuardar]').length != 0) document.getElementById(jQuery('a[id$=ibGuardar]').attr("id")).click();
            else if (jQuery('a[id$=ibGuardarE]').length != 0) document.getElementById(jQuery('a[id$=ibGuardarE]').attr("id")).click();
            var nTab = -1;
            try
            {
                nTab = getTabsSelected();
            }
            catch(err)
            {
                nTab=-1;
            }
            if (nTab == 0) if (jQuery('input[id$=ibAddDet0]').length != 0) document.getElementById(jQuery('input[id$=ibAddDet0]').attr("id")).click();
            if (nTab == 1) if (jQuery('input[id$=ibAddDet1]').length != 0) document.getElementById(jQuery('input[id$=ibAddDet1]').attr("id")).click();
            if (nTab == 2) if (jQuery('input[id$=ibAddDet2]').length != 0) document.getElementById(jQuery('input[id$=ibAddDet2]').attr("id")).click();
            if (nTab == 3) if (jQuery('input[id$=ibAddDet3]').length != 0) document.getElementById(jQuery('input[id$=ibAddDet3]').attr("id")).click();
            if (jQuery('input[id$=ibAddDet]').length != 0) document.getElementById(jQuery('input[id$=ibAddDet]').attr("id")).click();
            if (jQuery('a[id$=ibGuardarCenter]').length != 0) document.getElementById(jQuery('a[id$=ibGuardarCenter]').attr("id")).click();
        }
        // Event Add Key
        if (keycode == newKey)
        {
            if (jQuery('a[id$=ibAdd]').length != 0) document.getElementById(jQuery('a[id$=ibAdd]').attr("id")).click();
        }
        // Event Search Key
        if (keycode == searchKey)
        {
            if (jQuery('input[id$=ibBuscar]').length != 0) document.getElementById(jQuery('input[id$=ibBuscar]').attr("id")).click();
        }
    }
}

jQuery(document).ready(function()
{
    // Handler for .ready() called.
    if (jQuery('input[id$=txtBusqueda]').length != 0)
    {
        if (window.document.getElementById(jQuery('input[id$=txtBusqueda]').attr("id")).addEventListener)
        {
            window.document.getElementById(jQuery('input[id$=txtBusqueda]').attr("id")).addEventListener("keydown", callkeydownhandler, false);
        }
        else
        {
            window.document.getElementById(jQuery('input[id$=txtBusqueda]').attr("id")).attachEvent("onkeydown", callkeydownhandler);
        }
    }
});
</script>