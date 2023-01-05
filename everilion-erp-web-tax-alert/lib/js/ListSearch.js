
//from search page to open the register in main frame on central.asp (pantalla and botones
function Edit(pageBody, pageFoot) {
    var ipad = navigator.userAgent;
    
    if (ipad.indexOf("iLion App") != -1) {
        document.location = pageBody;
        parent.botones.document.location = pageFoot;
        parent.document.body.rows = "*,50px";
    }
    else {
        parent.window.main.pantalla.location = pageBody;
        parent.window.main.botones.location = pageFoot;
    }

}


//from central.asp: pantalla or botones to browse in search page and open it
function SearchPage(page,open) {

    var ipad = navigator.userAgent;
    
    if (ipad.indexOf("iLion App") != -1) {
          parent.pantalla.document.location=page;
          parent.document.body.rows = "100%,0";
      }
      else {
          //open search page
          if (open == 1) {
              parent.parent.open_west();
              // alert(parent.parent.window.left.document);
              if (parent.parent.window.left.document.getElementById("waitBoxOculto") != null) {
                parent.parent.window.left.document.getElementById("waitBoxOculto").style.visibility = "visible";
               }

          }

          //locationObj = page;
          parent.parent.window.left.location = page;

      }

  }


