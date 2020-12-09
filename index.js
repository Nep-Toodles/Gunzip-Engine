//On error Reload Automatically

window.onerror = ()=> location.reload()
document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('.consoleCode').forEach((block) => {
    hljs.highlightBlock(block);
  });
});

//Read Image a url
function encodeImageFileAsURL(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    document.getElementById("ImageCode").innerText = reader.result
  }
  reader.readAsDataURL(file);
}
window.ondrag = (ev) => {
  ev.preventDefault()
  ev.stopPropagation()
}
window.onload = function (event) {
  document.getElementById("termux-input").onchange = (e) => {
    try {
      e.preventDefault()
      iframe.contentWindow.eval(e.target.value)
      e.target.value = ""
    } catch (e) {
      document.getElementById("termux").innerHTML += `<p class = 'consoleCode'>` +e.toString() +`</p>`
    }

  }

  document.getElementById("iframe").contentWindow.console.log = (ev) => {
    document.getElementById("termux").innerText += ev.toString()
  }
  window.statusbar.visible = !window.statusbar.visible;
  //Saving
  //var beautify = ace.require("ace/ext/beautify")
  function beatify() {
    var val = editorInit.session.getValue();
    //Remove leading spaces
    var array = val.split(/\n/);
    array[0] = array[0].trim();
    val = array.join("\n");
    //Actual beautify (prettify) 
    val = js_beautify(val);
    //Change current text to formatted text
    editorInit.session.setValue(val);
    var val = editorCss.session.getValue();
    //Remove leading spaces
    var array = val.split(/\n/);
    array[0] = array[0].trim();
    val = array.join("\n");
    //Actual beautify (prettify) 
    val = css_beautify(val);
    //Change current text to formatted text
    editorCss.session.setValue(val);
    var val = editorHtml.session.getValue();
    //Remove leading spaces
    var array = val.split(/\n/);
    array[0] = array[0].trim();
    val = array.join("\n");
    //Actual beautify (prettify) 
    val = html_beautify(val);
    //Change current text to formatted text
    editorHtml.session.setValue(val);

  }

  keyboardJS.bind("shift + F", (e) => {
    e.preventDefault()
    beatify()
  })
  //Notification SAVE
  $.notify.defaults({
    className: "success"
  });

  myIframeForDebug = document.getElementById("iframe").contentWindow

  function updateDebugger() {
    window.onbeforeunload = function (e) {
      e.preventDefault();
      e.returnValue = 'Really want to quit the program?';
    };
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.onkeydown = function (e) {
      e = e || window.event;

      if (!e.ctrlKey) return;
      var code = e.which || e.keyCode;

      switch (code) {
        case 83:
        case 87:
          beatify()
          SaveNewCode()
          $.notify("saved", {
            autoHideDelay: 1000,
            position: 'right bottom'
          });
          e.preventDefault();
          e.stopPropagation();
          break;
      }
    };
    myIframeForDebug.document.addEventListener("mousemove", function (ev) {
      document.getElementById("downInfo").innerText = "X :" + ev.x + "\t    Y :" + ev.y + "\tScreenX:" + ev.screenX + "\tScreenY:" + ev.screenY
      ev.onerror = () => {
        alert("error")
      }
    })
  }
  setInterval(updateDebugger, 10)
  var iframe = document.getElementById("iframe")
  iframe.srcdoc = `<!DOCTYPE html>
  <html>
  <head>
  <title>Made With Gunzip Engine</title>

  </head>
  <body>
   <script>
      console.log=(ev)=>{window.parent.document.getElementById("termux").innerHTML +=  "<p style='color:white;background:green;'> >>> "+ev.toString()+"<p>"}
      console.warn=(ev)=>{window.parent.document.getElementById("termux").innerHTML += "<p style='color:white;background:yellow;'> >>>"+ev.toString()+"<p>"}
      console.error=(ev)=>{window.parent.document.getElementById("termux").innerHTML += "<p style='color:pink;background:red;'> >>>"+ev.toString()+"<p>"}
      console.clear=()=>{window.parent.document.getElementById("termux").innerHTML = "<p class = 'consoleCode' style='color:grey'> >>> Console Cleared<p>"
      }
      </script>
  <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
  </body>
  </html>`;
  var editorHtml = ace.edit("editorHtml");
  document.getElementById("editorCssContainer").style.display = "none"; //by default only one editor is shown 
  var editorInit = ace.edit("editorInit");
  editorHtml.setTheme("ace/theme/monokai");
  editorInit.setTheme("ace/theme/monokai");
  editorInit.session.setMode("ace/mode/javascript");
  editorHtml.session.setMode("ace/mode/html");
  editorHtml.setOptions({
    enableLiveAutocompletion: true,
    enableBasicAutocompletion: true,
    autoScrollEditorIntoView: true,
    enableSnippets: true,
    fontSize: "13pt",
    enableLiveAutocompletion: true
  });
  editorInit.setOptions({
    enableLiveAutocompletion: true,
    enableBasicAutocompletion: true,
    autoScrollEditorIntoView: true,
    enableSnippets: true,
    fontSize: "13pt",
    enableLiveAutocompletion: true
  });

  var editorCss = ace.edit("editorCss");
  document.getElementById("editorInitContainer").style.display = "none";
  editorCss.setTheme("ace/theme/monokai");
  editorCss.session.setMode("ace/mode/css");
  editorCss.setOptions({
    enableLiveAutocompletion: true,
    enableBasicAutocompletion: true,
    enableSnippets: true,
    fontSize: "13pt",
    autoScrollEditorIntoView: true,
    enableLiveAutocompletion: true
  });

  ace.config.loadModule('ace/ext/language_tools')

  if (typeof localStorage.getItem("codeInit") == undefined || typeof localStorage.getItem("codeInit") == null) {
      localStorage.setItem("codeInit", editorInit.getValue())
      localStorage.setItem("codeCss", editorCss.getValue())
      localStorage.setItem("codeHtml", editorHtml.getValue())
    function SaveNewCode() {
      beatify()
      localStorage.setItem("codeInit", editorInit.getValue())
      localStorage.setItem("codeCss", editorCss.getValue())
      localStorage.setItem("codeHtml", editorHtml.getValue())

    }
    editorInit.setValue(``)
    editorCss.setValue(``)
    editorHtml.setValue(`Type Html5`)
  } else {
    beatify()

    function SaveNewCode() {
      localStorage.setItem("codeHtml", editorHtml.getValue())
      localStorage.setItem("codeInit", editorInit.getValue())
      localStorage.setItem("codeCss", editorCss.getValue())
    }
    editorHtml.resize()
    editorInit.setValue(localStorage.getItem("codeInit") || "")
    editorHtml.setValue(localStorage.getItem("codeHtml") || ``)
    editorCss.setValue(localStorage.getItem("codeCss") || "")

  }

  document.getElementById("scriptingWindow").style.display = "none"; //By deafult it is hidden
  //Events of Tab Window Start
  document.getElementById("imageView").onclick = () => {
    document.getElementById("scriptView").style.width = "25.7%"
    document.getElementById("sceneView").style.width = "25%"
    document.getElementById("imageView").style.width = "36%"
    document.getElementById("imageMenu").style.display = "block";
    document.getElementById("consoleWindow").style.display = "none";
    document.getElementById("scenesMenu").style.display = "none";
    document.getElementById("scriptingWindow").style.display = "none";
  }
  document.getElementById("sceneView").onclick = () => {
    document.getElementById("consoleWindow").style.display = "none";
    document.getElementById("scriptView").style.width = "25%"
    document.getElementById("sceneView").style.width = "36%"
    document.getElementById("imageView").style.width = "25.7%"
    document.getElementById("imageMenu").style.display = "none";
    document.getElementById("scenesMenu").style.display = "block";
    document.getElementById("scriptingWindow").style.display = "none";

  }
  document.getElementById("consoleView").onclick = () => {
    document.getElementById("consoleWindow").style.display = "block";
    document.getElementById("imageMenu").style.display = "none";
    document.getElementById("scenesMenu").style.display = "none";
    document.getElementById("scriptingWindow").style.display = "none";

  }
  document.getElementById("scriptView").onclick = () => {
    document.getElementById("consoleWindow").style.display = "none";
    editorInit.resize()
    editorCss.resize()
    editorHtml.resize()
    editorHtml.setValue(localStorage.getItem("codeHtml"))
    editorHtml.focus()
    editorHtml.moveCursorTo(0, 0);
    document.getElementById("scriptView").style.width = "36%"
    document.getElementById("sceneView").style.width = "25.7%"
    document.getElementById("imageView").style.width = "25%"
    document.getElementById("imageMenu").style.display = "none";
    document.getElementById("scenesMenu").style.display = "none";
    document.getElementById("scriptingWindow").style.display = "block";

  }
  document.getElementById("html").onclick = () => {
    editorHtml.setValue(localStorage.getItem("codeHtml"))
    editorHtml.focus()
    editorHtml.moveCursorTo(0, 0);
    document.getElementById("editorHtmlContainer").style.display = "block";
    document.getElementById("editorInitContainer").style.display = "none";
    document.getElementById("editorCssContainer").style.display = "none";

  }
  document.getElementById("css").onclick = () => {
    editorCss.setValue(localStorage.getItem("codeCss"))
    editorCss.focus()
    editorCss.moveCursorTo(0, 0);
    document.getElementById("editorHtmlContainer").style.display = "none";
    document.getElementById("editorInitContainer").style.display = "none";
    document.getElementById("editorCssContainer").style.display = "block";

  }
  document.getElementById("init").onclick = () => {
    editorInit.setValue(localStorage.getItem("codeInit"))
    editorInit.focus()
    editorInit.moveCursorTo(0, 0);
    document.getElementById("editorHtmlContainer").style.display = "none";
    document.getElementById("editorInitContainer").style.display = "block";
    document.getElementById("editorCssContainer").style.display = "none";

  }

  ////@@@@ very important RUNNING THE PROGRAM
  document.getElementById("run").onclick = () => {
    setTimeout(machet, 100);
    function machet() {
      //alert("machet");
      document.getElementById("iframe").contentWindow.focus();
    }
    setInterval(()=>{
      if(0 == 78){
      iframe.srcdoc = `<html>
      <head>
      <title>Made With Gunzip Engine</title>
      <style>
      canvas{
        width:100%;
        height:100%;
        overflow : hidden;
      }
      *{
        overflow : hidden;
        padding : 0px;
        margin:0px;
      }
      </style>
      <script src="//cdn.jsdelivr.net/npm/phaser@3.24.1/dist/phaser.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/keyboardjs/2.6.2/keyboard.min.js" integrity="sha512-Q9aijJKP9BeTXgQHmb/j8AZTQ15//k9QvGXCbKMf1bt289s75awi/3SBFZ3M3J27NtD7JyU3d9d1eRPuO4BbhQ==" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js"></script>
       </head>
      <body>
      <script>
      console.log=(ev)=>{window.parent.document.getElementById("termux").innerHTML +=  "<p style='color:white;background:green;'> >>> "+ev.toString()+"<p>"}
      console.warn=(ev)=>{window.parent.document.getElementById("termux").innerHTML += "<p style='color:white;background:yellow;'> >>>"+ev.toString()+"<p>"}
      console.error=(ev)=>{window.parent.document.getElementById("termux").innerHTML += "<p style='color:pink;background:red;'> >>>"+ev.toString()+"<p>"}
      console.clear=(ev)=>{window.parent.document.getElementById("termux").innerHTML = "<p style='color:grey;'> >>>"+ev.toString()+"<p>"}
      </script>
      ` + editorHtml.getValue() + `
      <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
      <style media="all">
    `+editorCss.getValue().toString()+`
    </style>
      </div>
      <script>`+
       editorInit.getValue()
       +`
       </script>
      </body>
      </html>`;
    }
    },10)
      iframe.srcdoc = `<html>
      <head>
      <title>Made With Gunzip Engine</title>
      <style>
      canvas{
        width:100%;
        height:100%;
        overflow : hidden;
      }
      *{
        overflow : hidden;
        padding : 0px;
        margin:0px;
      }
      </style>
      <script src="//cdn.jsdelivr.net/npm/phaser@3.24.1/dist/phaser.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/keyboardjs/2.6.2/keyboard.min.js" integrity="sha512-Q9aijJKP9BeTXgQHmb/j8AZTQ15//k9QvGXCbKMf1bt289s75awi/3SBFZ3M3J27NtD7JyU3d9d1eRPuO4BbhQ==" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js"></script>
       </head>
      <body>
      <script>
      console.log=(ev)=>{window.parent.document.getElementById("termux").innerHTML +=  "<p style='color:white;background:green;'> >>> "+ev.toString()+"<p>"}
      console.warn=(ev)=>{window.parent.document.getElementById("termux").innerHTML += "<p style='color:white;background:yellow;'> >>>"+ev.toString()+"<p>"}
      console.error=(ev)=>{window.parent.document.getElementById("termux").innerHTML += "<p style='color:pink;background:red;'> >>>"+ev.toString()+"<p>"}
      </script>
      ` + editorHtml.getValue() + `
      <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
      <style media="all">
    `+editorCss.getValue().toString()+`
    </style>
      </div>
      <script>`+
       editorInit.getValue()
       +`
       </script>
      </body>
      </html>`;
  }
  document.getElementById("debug").onclick = () => {

    setTimeout(() => {
      window.open("https://editor.gunzip.repl.co/preview/")
    }, 1000)
  }
  //@Important  DEBUGGIN MODE
  document.getElementById("preview").onclick = () => {
    
    mywindow = window.open("https://editor.gunzip.repl.co/preview/", "_blank", "toolbar=no,top=500,left=500,width=400,height=400")
    document.body.style.opacity = "10%"
    var popupTick = setInterval(function () {
      if (mywindow.closed) {
        setTimeout(() => { document.body.style.opacity = "100%" }, 100)
        clearInterval(popupTick);
        document.body.style.opacity = "100%"
      } else {

      }
    }, 500);
      

  }
  // @Important Stop Stops the everything
  document.getElementById("stop").onclick = () => {
    console.clear()
    setTimeout(() => {
      iframe.srcdoc = `<html>
      <head>
      <title>Made With Gunzip Engine</title>
      <style>
      *{
        overflow : hidden;
        padding : 0px;
        margin:0px;
      }
      canvas{
        width:100%;
        height:100%;
        overflow:hiden;
      }
      *{
        overflow : hidden;
        padding : 0px;
        margin:0px;
      }
      </style>
      </head>
      <body>  <script>
      console.log=(ev)=>{window.parent.document.getElementById("termux").innerHTML +=  "<p class = 'consoleCode' style='color:white;background:green;'> >>> "+ev.toString()+"<p>"}
      console.warn=(ev)=>{window.parent.document.getElementById("termux").innerHTML += "<p class = 'consoleCode' style='color:white;background:yellow;'> >>>"+ev.toString()+"<p>"}
      console.error=(ev)=>{window.parent.document.getElementById("termux").innerHTML += "<p class = 'consoleCode' style='color:pink;background:red;'> >>>"+ev.toString()+"<p>"
      
      }
      console.clear=()=>{window.parent.document.getElementById("termux").innerHTML = "<p class = 'consoleCode' style='color:grey'> >>> Console Cleared<p>"
      }
      </script>   <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
      
      </body>
      </html>`;
    }, 1)
  }
  //@imporants It builds the program
  document.getElementById("build").onclick = () => {
    iframe.srcdoc = `<html>
      <head>
      <title>Made With Gunzip Engine</title>
      <style>
      *{
        overflow : hidden;
        padding : 0px;
        margin:0px;
      }
      canvas{
        width:100%;
        height:100%;
        overflow:hiden;
      }
      *{
        overflow : hidden;
        padding : 0px;
        margin:0px;
      }
      </style>
      <script src="//cdn.jsdelivr.net/npm/phaser@3.24.1/dist/phaser.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/keyboardjs/2.6.2/keyboard.min.js" integrity="sha512-Q9aijJKP9BeTXgQHmb/j8AZTQ15//k9QvGXCbKMf1bt289s75awi/3SBFZ3M3J27NtD7JyU3d9d1eRPuO4BbhQ==" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js"></script>
      </head>
      <style media='all'>`+
      editorCss.getValue().toString()
      +`
      </style>
      <body>
      ` + editorHtml.getValue() + `
      <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
      
      </div><script>window.onload=()=>{` + editorInit.getValue() + `</script></body>
      </html>`;

    name = prompt("Please Enter Your Game's name")
    var blob = new Blob([iframe.srcdoc.toString()], {
      type: "text/plain;charset=utf-8"
    });
    if (name !== undefined || name !== null || name !== "") {
      document.getElementById("ExportingPopup").style.display = "block"
      setTimeout(() => { document.getElementById("ExportingPopup").style.display = "none" }, 1500)
      saveAs(blob, name + ".gunz.html")
      iframe.srcdoc = `<!DOCTYPE html>
  <html>
  <head>
  <title>Made With Gunzip Engine</title>

  </head>
  <body>
   <script>
      console.log=(ev)=>{window.parent.document.getElementById("termux").innerHTML +=  "<p class = 'consoleCode' style='color:white;background:green;'> >>> "+ev.toString()+"<p>"}
      console.warn=(ev)=>{window.parent.document.getElementById("termux").innerHTML += "<p class = 'consoleCode' style='color:white;background:yellow;'> >>>"+ev.toString()+"<p>"}
      console.error=(ev)=>{window.parent.document.getElementById("termux").innerHTML += "<p class = 'consoleCode' style='color:pink;background:red;'> >>>"+ev.toString()+"<p>"}
      console.clear=()=>{window.parent.document.getElementById("termux").innerHTML = "<p class = 'consoleCode' style='color:grey'> >>> Console Cleared<p>"
      }
      </script>
  <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
  </body>
  </html>`
    } else {
      alert("Please enter a vaild name")
      document.getElementById("ExportingPopup").style.display = "block"
      setTimeout(() => { document.getElementById("ExportingPopup").style.display = "none" }, 1500)
      iframe.srcdoc = `<!DOCTYPE html>
  <html>
  <head>
  <title>Made With Gunzip Engine</title>

  </head>
  <body>
   <script>
      console.log=(ev)=>{window.parent.document.getElementById("termux").innerHTML +=  "<p class = 'consoleCode' style='color:white;background:green;'> >>> "+ev.toString()+"<p>"}
      console.warn=(ev)=>{window.parent.document.getElementById("termux").innerHTML += "<p class = 'consoleCode' style='color:white;background:yellow;'> >>>"+ev.toString()+"<p>"}
      console.error=(ev)=>{window.parent.document.getElementById("termux").innerHTML += "<p class = 'consoleCode' style='color:pink;background:red;'> >>>"+ev.toString()+"<p>"}
       console.clear=()=>{window.parent.document.getElementById("termux").innerHTML = "<p class = 'consoleCode' style='color:grey'> >>> Console Cleared<p>"
      }
      </script>
     
  <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
  </body>
  </html>`

    }
  }
  //Project Export
  document.getElementById("build2").onclick = () => {
    iframe.srcdoc = `<script>document.addEventListener('contextmenu', event => event.preventDefault());</script>`;

    name = prompt("Please Enter Your Project's name to be downloaded.")
    if (name !== undefined || name !== null || name !== "") {
      saveAs(new Blob([`localStorage.setItem('codeHtml','` + localStorage.getItem('codeHtml').toString() + `');
localStorage.setItem('codeInit','`+ localStorage.getItem('codeInit').toString() + `');
localStorage.setItem('codeCss','`+ localStorage.getItem('codeCss').toString() + `')`], { type: "text/plain" }), name + ".gunzip")
      document.getElementById("ExportingPopup").style.display = "block"
      setTimeout(() => { document.getElementById("ExportingPopup").style.display = "none" }, 1500)
      iframe.srcdoc = `<!DOCTYPE html>
  <html>
  <head>
  <title>Made With Gunzip Engine</title>

  </head>
  <body>
   <script>
      console.log=(ev)=>{window.parent.document.getElementById("termux").innerHTML +=  "<p class = 'consoleCode' style='color:white;background:green;'> >>> "+ev.toString()+"<p>"}
      console.warn=(ev)=>{window.parent.document.getElementById("termux").innerHTML += "<p class = 'consoleCode' style='color:white;background:yellow;'> >>>"+ev.toString()+"<p>"}
      console.error=(ev)=>{window.parent.document.getElementById("termux").innerHTML += "<p class = 'consoleCode' style='color:pink;background:red;'> >>>"+ev.toString()+"<p>"}
      console.clear=()=>{window.parent.document.getElementById("termux").innerHTML = "<p class = 'consoleCode' style='color:grey'> >>> Console Cleared<p>"
      }
      </script>
  <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
  </body>
  </html>`
    } else {
      alert("Please enter a vaild name")
      document.getElementById("ExportingPopup").style.display = "block"
      setTimeout(() => { document.getElementById("ExportingPopup").style.display = "none" }, 1500)
      iframe.srcdoc = `<!DOCTYPE html>
  <html>
  <head>
  <title>Made With Gunzip Engine</title>

  </head>
  <body>
   <script>
      console.log=(ev)=>{window.parent.document.getElementById("termux").innerHTML +=  "<p class = 'consoleCode' style='color:white;background:green;'> >>> "+ev.toString()+"<p>"}
      console.warn=(ev)=>{window.parent.document.getElementById("termux").innerHTML += "<p class = 'consoleCode' style='color:white;background:yellow;'> >>>"+ev.toString()+"<p>"}
      console.error=(ev)=>{window.parent.document.getElementById("termux").innerHTML += "<p class = 'consoleCode' style='color:pink;background:red;'> >>>"+ev.toString()+"<p>"}
      console.clear=()=>{window.parent.document.getElementById("termux").innerHTML = "<p class = 'consoleCode' style='color:grey'> >>> Console Cleared<p>"
      }
      </script>
  <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
  </body>
  </html>`
    }
  }
  //Export to EMBEDDED
  document.getElementById("build4").onclick = () => {
     
      document.getElementById("embeddedExportText").value = `<html>
      <head>
      <title>Made With Gunzip Engine</title>
      <style>
      *{
        overflow : hidden;
        padding : 0px;
        margin:0px;
      }
      canvas{
        width:100%;
        height:100%;
        overflow:hiden;
      }
      *{
        overflow : hidden;
        padding : 0px;
        margin:0px;
      }
      </style>
      <script src="//cdn.jsdelivr.net/npm/phaser@3.24.1/dist/phaser.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/keyboardjs/2.6.2/keyboard.min.js" integrity="sha512-Q9aijJKP9BeTXgQHmb/j8AZTQ15//k9QvGXCbKMf1bt289s75awi/3SBFZ3M3J27NtD7JyU3d9d1eRPuO4BbhQ==" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js"></script>
      </head>
      <style media='all'>`+
      editorCss.getValue().toString()
      +`
      </style>
      <body>
      ` + editorHtml.getValue() + `
      <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
      
      </div><script>window.onload=()=>{` + editorInit.getValue() + `</script></body>
      </html>`
      
      document.getElementById("ExportingPopup").style.display = "block"
      setTimeout(() => { document.getElementById("ExportingPopup").style.display = "none" }, 1500)


    }
  //Export to Gif or png
  document.getElementById("build3").onclick = () => {


    name = prompt("Please Enter Your Project's name to be downloaded.")
    if (name !== undefined || name !== null || name !== "") {
      iframe.srcdoc = `<html>
      <head>
      <title>Made With Gunzip Engine</title>
      <style>
      *{
        overflow : hidden;
        padding : 0px;
        margin:0px;
      }
      canvas{
        width:100%;
        height:100%;
        overflow:hiden;
      }
      *{
        overflow : hidden;
        padding : 0px;
        margin:0px;
      }
      </style>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js" integrity="sha512-01CJ9/g7e8cUmY0DFTMcUw/ikS799FHiOA0eyHsUWfOetgbx/t6oV4otQ5zXKQyIrQGTHSmRVPIgrgLcZi/WMA==" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js" integrity="sha512-csNcFYJniKjJxRWRV1R7fvnXrycHP6qDR21mgz1ZP55xY5d+aHLfo9/FcGDQLfn2IfngbAHd8LdfsagcCqgTcQ=="
	 crossorigin="anonymous">

      <script src="//cdn.jsdelivr.net/npm/phaser@3.24.1/dist/phaser.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/keyboardjs/2.6.2/keyboard.min.js" integrity="sha512-Q9aijJKP9BeTXgQHmb/j8AZTQ15//k9QvGXCbKMf1bt289s75awi/3SBFZ3M3J27NtD7JyU3d9d1eRPuO4BbhQ==" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js"></script>
      </head>
      <body>
      ` + editorHtml.getValue() + `
      <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
      
      </div><script>window.onload=()=>{window.onload=()=>{` + editorInit.getValue() + `};setInterval(()=>{` + editorCss.getValue() + `},10);};` + `</script>
      <script>
      window.onload =()=>{
      domtoimage.toBlob(document.querySelector('*'))
    .then(function (blob) {
        window.saveAs(blob, '`+ name.toString() + `'+'.png');
    });}</script>
    </body>
      </html>`;
      document.getElementById("ExportingPopup").style.display = "block"
      setTimeout(() => { document.getElementById("ExportingPopup").style.display = "none" }, 1500)
      iframe.srcdoc = `<!DOCTYPE html>
  <html>
  <head>
  <title>Made With Gunzip Engine</title>

  </head>
  <body>
   <script>
      console.log=(ev)=>{window.parent.document.getElementById("termux").innerHTML +=  "<p class = 'consoleCode' style='color:white;background:green;'> >>> "+ev.toString()+"<p>"}
      console.warn=(ev)=>{window.parent.document.getElementById("termux").innerHTML += "<p class = 'consoleCode' style='color:white;background:yellow;'> >>>"+ev.toString()+"<p>"}
      console.error=(ev)=>{window.parent.document.getElementById("termux").innerHTML += "<p class = 'consoleCode' style='color:pink;background:red;'> >>>"+ev.toString()+"<p>"}
      console.clear=()=>{window.parent.document.getElementById("termux").innerHTML = "<p class = 'consoleCode' style='color:grey'> >>> Console Cleared<p>"
      }
      </script>
  <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
  </body>
  </html>`
    } else {
      iframe.srcdoc = `<!DOCTYPE html>
  <html>
  <head>
  <title>Made With Gunzip Engine</title>

  </head>
  <body>
   <script>
      console.log=(ev)=>{window.parent.document.getElementById("termux").innerHTML +=  "<p class = 'consoleCode' style='color:white;background:green;'> >>> "+ev.toString()+"<p>"}
      console.warn=(ev)=>{window.parent.document.getElementById("termux").innerHTML += "<p class = 'consoleCode' style='color:white;background:yellow;'> >>>"+ev.toString()+"<p>"}
      console.error=(ev)=>{window.parent.document.getElementById("termux").innerHTML += "<p class = 'consoleCode' style='color:pink;background:red;'> >>>"+ev.toString()+"<p>"}
      console.clear=()=>{window.parent.document.getElementById("termux").innerHTML = "<p class = 'consoleCode' style='color:grey'> >>> Console Cleared<p>"
      }
      </script>
  <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
  </body>
  </html>`
      alert("Please enter a vaild name")
      document.getElementById("ExportingPopup").style.display = "block"
      setTimeout(() => { document.getElementById("ExportingPopup").style.display = "none" }, 1500)

    }

  }

  //Events of Tab windows End
  setInterval(SaveNewCode, 1000)
}