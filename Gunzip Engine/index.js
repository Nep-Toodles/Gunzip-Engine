window.onload = function (event) {
 $.notify.defaults({ className: "success" });

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
              $.notify("saved",{autoHideDelay: 1000,position: 'right bottom'});
              e.preventDefault();
              e.stopPropagation();
              break;
      }
  };
    myIframeForDebug.document.addEventListener("mousemove", function (ev) {
      document.getElementById("downInfo").innerText = "X :" + ev.x + "\t    Y :" + ev.y + "\tScreenX:"+ev.screenX+ "\tScreenY:"+ev.screenY
      ev.onerror =()=>{
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
  <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
  <div id='canvas'>
  
  </div>
  </body>
  </html>`;
  document.getElementById("editorUpdate").style.display = "none"; //by default only one editor is shown 
  var editorInit = ace.edit("editorInit");
  editorInit.setTheme("ace/theme/monokai");
  editorInit.session.setMode("ace/mode/typescript");
  editorInit.setOptions({
    enableLiveAutocompletion: true,
    enableBasicAutocompletion: true,
    enableSnippets: true,
    fontSize: "13pt",
    enableLiveAutocompletion: true
  });
  var editorUpdate = ace.edit("editorUpdate");
  editorUpdate.setTheme("ace/theme/monokai");
  editorUpdate.session.setMode("ace/mode/javascript");
  editorUpdate.setOptions({
    enableLiveAutocompletion: true,
    enableBasicAutocompletion: true,
    enableSnippets: true,
    fontSize: "13pt",
    enableLiveAutocompletion: true
  });
  ace.config.loadModule('ace/ext/language_tools')
  codeinit = localStorage.getItem("codeInit")
  codeupdate = localStorage.getItem("codeUpdate")
  editorInit.setValue(codeinit)
  editorUpdate.setValue(codeupdate)

  if (codeinit == undefined || codeinit == null) {
    function SaveNewCode() {
      localStorage.setItem("codeInit", editorInit.getValue())
      localStorage.setItem("codeUpdate", editorUpdate.getValue())
    }
  } else {
    function SaveNewCode() {
      localStorage.setItem("codeInit", editorInit.getValue())
      localStorage.setItem("codeUpdate", editorUpdate.getValue())
    }

    editorInit.setValue(codeinit)
    editorUpdate.setValue(codeupdate)

  }

  document.getElementById("scriptingWindow").style.display = "none"; //By deafult it is hidden

  //Events of Tab Window Start
  document.getElementById("sceneView").onclick = () => {
    document.getElementById("scenesMenu").style.display = "block";
    document.getElementById("scriptingWindow").style.display = "none";
    /*setTimeout(() => {
      eval(editorInit.getValue() + editorUpdate.getValue())
    }, 1000)*/
  }
  document.getElementById("scriptView").onclick = () => {
    document.getElementById("scenesMenu").style.display = "none";
    document.getElementById("scriptingWindow").style.display = "block";

  }
  document.getElementById("update").onclick = () => {
    document.getElementById("editorInit").style.display = "none";
    document.getElementById("editorUpdate").style.display = "block";

  }
  document.getElementById("init").onclick = () => {
    document.getElementById("editorInit").style.display = "block";
    document.getElementById("editorUpdate").style.display = "none";

  }
  document.getElementById("run").onclick = () => {
    $("#debugger").hide()
    setTimeout(machet, 100);

    function machet() {
      //alert("machet");
      document.getElementById("iframe").contentWindow.focus();
    }
    setTimeout(() => {

      iframe.srcdoc = `<html>
      <head>
      <title>Made With Gunzip Engine</title>
      <script type="text/javascript" src="https://rawgithub.com/craftyjs/Crafty/release/dist/crafty-min.js"></script>
      </head>
      <body>
      <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
      <div id='canvas' style='position;absolute;width:100%;height:100%;'>
      
      </div><script>window.onload=()=>{` + editorInit.getValue() + `;setInterval(()=>{` + editorUpdate.getValue() + `},10);};` + `</script></body>
      </html>`;
    }, 1000)
  }
  document.getElementById("debug").onclick = () => {
    setTimeout(machet, 100);

    function machet() {
      //alert("machet");
      document.getElementById("iframe").contentWindow.focus();
    }
    $("#debugger").show()
    setTimeout(() => {

      iframe.srcdoc = `<html>
      <head>
      <title>Made With Gunzip Engine</title>
      <script type="text/javascript" src="https://rawgithub.com/craftyjs/Crafty/release/dist/crafty-min.js"></script>
      </head>
      <body>
      <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
      <div id='canvas' style='position;absolute;width:100%;height:100%;'>
      
      </div><script>window.onload=()=>{` + editorInit.getValue() + `;setInterval(()=>{` + editorUpdate.getValue() + `},10);};` + `</script></body>
      </html>`;
    }, 1000)

  }
  document.getElementById("stop").onclick = () => {
    $("#debugger").show()
    setTimeout(() => {
      iframe.srcdoc = `<h1 align='center'>Stopped Process </h1><p align='center'>Game Exited and All threads closed.</p>`;
    }, 1)
  }
  document.getElementById("build").onclick = () => {
    iframe.srcdoc = `<html>
      <head>
      <title>Made With Gunzip Engine</title>
      <script type="text/javascript" src="https://rawgithub.com/craftyjs/Crafty/release/dist/crafty-min.js"></script>
      </head>
      <body>
      <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
      <div id='canvas' style='position;absolute;width:100%;height:100%;'>
      
      </div><script>window.onload=()=>{` + editorInit.getValue() + `;setInterval(()=>{` + editorUpdate.getValue() + `},10);};` + `</script></body>
      </html>`;

    name = prompt("Please Enter Your Game's name")
    var blob = new Blob([iframe.srcdoc.toString()], {
      type: "text/plain;charset=utf-8"
    });
    if (name != undefined || name != null) {
      saveAs(blob, name + ".gunz.html")
    } else {
      alert("From Now on enter a vaild name")
    }
  }
  //Events of Tab windows End
  setInterval(SaveNewCode, 1000)
  //console.clear()
}