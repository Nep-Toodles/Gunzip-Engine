$(document).ready(function(){
  $("#debugger").val("fps")
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
  </html>`
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
    }, 100)
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
    setTimeout(() => {
      iframe.srcdoc = `<html>
      <head>
      <title>Made With Gunzip Engine</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/crafty/0.9.0/crafty-min.js" integrity="sha512-sDNo6LQrOvKGPViODKABhldkKVProNVaq0COGrTw8PPPlGbCvbQ5Jmx9Q5ubJvmMVEUk468fAHUHfGAl920rQA==" crossorigin="anonymous"></script>
      </head>
      <body>
      <canvas id='canvas'>
      
      </canvas><script>` + editorInit.getValue() +`setInterval(()=>{`+ editorUpdate.getValue() + `},10)` + `</script></body>
      </html>`;
    }, 1000)
  }
  document.getElementById("debug").onclick = () => {
    $("#debugger").show()
    setTimeout(() => {
      iframe.srcdoc = `<html>
      <head>
      <title>Made With Gunzip Engine</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/crafty/0.9.0/crafty-min.js" integrity="sha512-sDNo6LQrOvKGPViODKABhldkKVProNVaq0COGrTw8PPPlGbCvbQ5Jmx9Q5ubJvmMVEUk468fAHUHfGAl920rQA==" crossorigin="anonymous"></script>
      </head>
      <body>
      <canvas id='canvas'>
      
      </canvas><script>` + editorInit.getValue() +`setInterval(()=>{`+ editorUpdate.getValue() + `},10)` + `</script></body>
      </html>`;
    }, 1000)
  }
  document.getElementById("build").onclick = () => {
   
  }
  //Events of Tab windows End
  setInterval(SaveNewCode, 100)
}