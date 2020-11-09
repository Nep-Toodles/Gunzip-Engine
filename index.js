window.onload = function () {
  document.getElementById("editorUpdate").style.display = "none"; //by default only one editor is shown 

  var editorInit = ace.edit("editorInit");
  editorInit.setTheme("ace/theme/monokai");
  editorInit.session.setMode("ace/mode/javascript");
  editorInit.setOptions({
    fontSize: "13pt"
  });
  var editorUpdate = ace.edit("editorUpdate");
  editorUpdate.setTheme("ace/theme/monokai");
  editorUpdate.session.setMode("ace/mode/javascript");
  editorUpdate.setOptions({
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
    setTimeout(()=>{editorInit.setValue(codeinit)
      editorUpdate.setValue(codeupdate)},100)
  }

  document.getElementById("scriptingWindow").style.display = "none"; //By deafult it is hidden

  //Events of Tab Window Start
  document.getElementById("sceneView").onclick = () => {
    document.getElementById("scenesMenu").style.display = "block";
    document.getElementById("scriptingWindow").style.display = "none";
    setTimeout(()=>{eval(editorInit.getValue() + editorUpdate.getValue())},2000)
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

  //Events of Tab windows End
  setInterval(SaveNewCode, 100)
}