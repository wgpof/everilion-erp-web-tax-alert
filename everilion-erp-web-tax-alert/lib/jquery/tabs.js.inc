<script src="/lib/jQuery/UI/ui/jquery.ui.core.js" type="text/javascript"></script>
<script src="/lib/jQuery/UI/ui/jquery.ui.widget.js" type="text/javascript"></script>
<script src="/lib/jQuery/UI/ui/jquery.ui.tabs.js" type="text/javascript"></script>

<script type="text/javascript">
  jQuery(document).ready(function () {
  jQuery("#tabs").tabs();
  jQuery("#tabs").attr("style", "display:run-in");
  });

  // return tabs selected from 0 to n-1
  function getTabsSelected() {
  //getter
  var selected=-1;
  jQuery(document).ready(function () {
  selected=jQuery("#tabs").tabs("option", "selected");
  });
  return selected;

  }

  //set tabs selected to 0 to n-1
  function setTabsSelected(tab) {
  jQuery(document).ready(function () {
  jQuery("#tabs").tabs("option", "selected", tab);
  });
  }

</script>