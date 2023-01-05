 <script>
   this.foot_show_hide = function(){
   jQuery("#hide").click(function () {

   jQuery("#ControlPanelFooter").hide();

   jQuery(".buttonShow").show(); //css("display", "run-in");
   jQuery(".buttonHide").hide();  //css("display", "none");

   });

   jQuery("#show").click(function () {


   jQuery("#ControlPanelFooter").css("display", "inline-block");

   jQuery(".buttonShow").hide(); //css("display", "none");
   jQuery(".buttonHide").show();  //css("display", "run-in");
   });

   };
 </script>
 