$(document).ready(function () {
  $("#debugger").val(Crafty.bind(this,function(ev){
    return ev.dt.toString()
  }))
  
})
window.onload = function () {
  var iframe = document.getElementById("iframe")
  iframe.srcdoc = `<!DOCTYPE html>
  <html>
  <head>
  <title>Made With Gunzip Engine</title>
  </head>
  <body>
  <canvas id='canvas'>
  
  </canvas>
  </body>
  </html>`;
  document.getElementById("editorUpdate").style.display = "none"; //by default only one editor is shown 
  var editorInit = ace.edit("editorInit");
  editorInit.setTheme("ace/theme/monokai");
  editorInit.session.setMode("ace/mode/javascript");
  editorInit.setOptions({
    fontSize: "13pt",
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
  });
  var editorUpdate = ace.edit("editorUpdate");
  editorUpdate.setTheme("ace/theme/monokai");
  editorUpdate.session.setMode("ace/mode/javascript");
  editorUpdate.setOptions({
    enableBasicAutocompletion: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    fontSize: "13pt"
  });
  codeinit = localStorage.getItem("codeInit")
  codeupdate = localStorage.getItem("codeUpdate")
  setTimeout(() => {
    editorInit.setValue(codeinit)
    editorUpdate.setValue(codeupdate)
  }, 100);
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
    setTimeout(() => {
      editorInit.setValue(codeinit)
      editorUpdate.setValue(codeupdate)
    }, 100);
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
    setTimeout(machet,100);
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
      <div id='canvas' style='position;absolute;width:100%;height:100%;'>
      
      </div><script>` + editorInit.getValue() + `;setInterval(()=>{` + editorUpdate.getValue() + `},10);` + `</script></body>
      </html>`;
    }, 1000)
  }
  document.getElementById("debug").onclick = () => {
    setTimeout(machet,100);
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
      <body style='position;absolute;width:100%;height:100%;'>
      <div id='canvas'>
      
      </div><script>window.setInterval(()=>{console.clear()},300);` + editorInit.getValue() + `;setInterval(()=>{` + editorUpdate.getValue() + `},10);` + `</script></body>
      </html>`;
    }, 1000)
  }
  document.getElementById("stop").onclick = () => {
    $("#debugger").show()
    setTimeout(() => {
      iframe.srcdoc += `<script>Crafty.pause()</script>`;
    }, 1)
  }
  document.getElementById("build").onclick = () => {
    iframe.srcdoc = `<html>
      <head>
      <title>Made With Gunzip Engine</title>
      <script type="text/javascript" src="https://rawgithub.com/craftyjs/Crafty/release/dist/crafty-min.js"></script>
      </head>
      <body>
      <div style='position;absolute;width:100%;height:100%;' id='canvas'>
      
      </div><script>` + editorInit.getValue() + `;setInterval(()=>{` + editorUpdate.getValue() + `},10);` + `</script></body>
      </html>`;
    var blob = new Blob([iframe.srcdoc.toString()], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "game.gunz.html")
  }
  //Events of Tab windows End
  setInterval(SaveNewCode, 100)
}