//On error Reload Automatically

window.onerror = () => location.reload()

window.ondrag = (ev) => {
  ev.preventDefault()
  ev.stopPropagation()
}
window.onload = function (event) {
  setTimeout(()=>{
    document.getElementById("loading").style.display = "none"
  },2000)
  document.getElementById("termux-input").onchange = (e) => {
    try {
      e.preventDefault()
      iframe.contentWindow.eval(e.target.value)
      e.target.value = ""
    } catch (e) {
      document.getElementById("termux").innerHTML += `<p class = 'consoleCode'>` + e.toString() + `</p>`
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

  keyboardJS.bind("shift + alt + F", (e) => {
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
      editorHtml.resize()
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
    document.getElementById("imageMenu").style.display = "block";
    document.getElementById("consoleWindow").style.display = "none";
    document.getElementById("scenesMenu").style.display = "none";
    document.getElementById("scriptingWindow").style.display = "none";
  }
    document.getElementById("sceneView1").onclick = () => {
    document.getElementById("consoleWindow").style.display = "none";
    document.getElementById("imageMenu").style.display = "none";
    document.getElementById("scenesMenu").style.display = "block";
    document.getElementById("scriptingWindow").style.display = "none";

  }
   document.getElementById("sceneView2").onclick = () => {
    document.getElementById("consoleWindow").style.display = "none";
    document.getElementById("imageMenu").style.display = "none";
    document.getElementById("scenesMenu").style.display = "block";
    document.getElementById("scriptingWindow").style.display = "none";

  }
  document.getElementById("sceneView").onclick = () => {
    document.getElementById("consoleWindow").style.display = "none";
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
    setInterval(() => {
      if (0 == 78) {
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
       console.clear=()=>{window.parent.document.getElementById("termux").innerHTML = "<p class = 'consoleCode' style='color:grey'> >>> Console Cleared<p>"
      }
      </script>
      ` + editorHtml.getValue() + `
      <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
      <style media="all">
    `+ editorCss.getValue().toString() + `
    </style>
      </div>
      <script>`+
          editorInit.getValue()
          + `
       </script>
      </body>
      </html>`;
      }
    }, 10)
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
       console.clear=()=>{window.parent.document.getElementById("termux").innerHTML = "<p class = 'consoleCode' style='color:grey'> >>> Console Cleared<p>"
      }
      </script>
      ` + editorHtml.getValue() + `
      <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
      <style media="all">
    `+ editorCss.getValue().toString() + `
    </style>
      </div>
      <script>`+
      editorInit.getValue()
      + `
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
       console.clear=()=>{window.parent.document.getElementById("termux").innerHTML = "<p class = 'consoleCode' style='color:grey'> >>> Console Cleared<p>"
      }
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
      <script src="https://cdn.jsdelivr.net/npm/phaser@3.24.1/dist/phaser.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js"></script>
      </head>
      <style media='all'>`+
      editorCss.getValue().toString()
      + `
      </style>
      <body>
      ` + editorHtml.getValue().toString() + `
      <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
      
      </div><script>window.onload=()=>{` + editorInit.getValue().toString() + `}</script></body>
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

    document.getElementById("embededExportText").innerText = `<iframe srcdoc="` + `<html>
      <head>
      <title>Made With Gunzip Engine</title>
      <script src="https://cdn.jsdelivr.net/npm/phaser@3.24.1/dist/phaser.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js"></script>
      </head>
      <style media='all'>#html,
#initjs,
#csss {
    position: absolute;
    top: 50px;
    right: 0;
    bottom: 0;
    left: 0;
}
      </style>
      <body>
      <!DOCTYPE html>
<html>

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>Hello World</title>
    <meta http-equiv="X-UA-Compatible" content="IE=7,8,edge" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.js" integrity="sha512-GZ1RIgZaSc8rnco/8CXfRdCpDxRCphenIiZ2ztLy3XQfCbQUSCuk8IudvNHxkRA3oUg6q0qejgN/qqyG1duv5Q==" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js" integrity="sha512-c3Nl8+7g4LMSTdrm621y7kf9v3SDPnhxLNhcjFJbKECVnmZHTdo+IRO05sNLTH/D3vA6u1X32ehoLC7WFVdheg==" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

</head>

<body>
    <div class="row">
        <div class="col s12">
            <ul id="tabs" class="tabs">
                <li class="tab col s3"><a href="#html">index.html</a></li>
                <li class="tab col s3"><a class="active" href="#initjs">Init.js</a></li>
                <li class="tab col s3"><a href="#csss">main.css</a></li>
                <li class="tab col s3"><a id="preview" href="#mainpreview">Preview</a></li>
            </ul>
        </div>
        <div id="html" class="col s12">`+ editorHtml.getValue().toString() + `</div>
        <div id="csss" class="col s12">`+ editorCss.getValue().toString() + `</div>
        <div id="initjs" class="col s12">`+ editorInit.getValue().toString() + `</div>
        <div id="mainpreview" class="col s12">
            <iframe id="previeww" src="" frameborder="0"></iframe>
        </div>
    </div>
</body>

</html>
      <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
      
      </div><script>window.onload=()=>{editor1 = ace.edit("html")
editor1.session.setMode("ace/mode/html");
editor1.setTheme("ace/theme/monokai");
editor2 = ace.edit("csss")
editor2.session.setMode("ace/mode/typescript")
editor3 = ace.edit("initjs")
editor3.session.setMode("ace/mode/typescript");
editor3.setTheme("ace/theme/monokai");
editor2.setTheme("ace/theme/monokai");
editor1.setOptions({
    fontSize: "18pt"
});
editor2.setOptions({
    fontSize: "18pt"
});
editor3.setOptions({
    fontSize: "18pt"
});
console.warn("No erros :)")
document.getElementById('preview').onclick = () => {
    document.getElementById("previeww").srcdoc = editor1.getValue().toString() + "<style>" + editor2.toString() + "</style>";
    document.getElementById("previeww").contentWindow.window.eval(editor3.getValue())
}
var instance = M.Tabs.init(document.getElementById('tabs'));}</script></body>
      </html>` + `"></iframe>`;

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