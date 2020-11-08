
window.onload = function(){
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");
  editor.setOptions({
    fontSize: "13pt"
  });
  var code = localStorage.getItem("code")
  if(code == undefined || code == null){
    function SaveNewCode(){
    localStorage.setItem("code",editor.getValue())
    }
  }else{
    function SaveNewCode(){
    localStorage.setItem("code",editor.getValue())
    }
    editor.setValue(localStorage.getItem("code"))
  }

  document.getElementById("scriptingWindow").style.display = "none"; //By deafult it is hidden

  //Events of Tab Window Start
  document.getElementById("sceneView").onclick =()=>{
    document.getElementById("scenesMenu").style.display = "block";
    document.getElementById("scriptingWindow").style.display = "none";
    eval(editor.getValue())
  }
  document.getElementById("scriptView").onclick =()=>{
    document.getElementById("scenesMenu").style.display = "none";
    document.getElementById("scriptingWindow").style.display = "block";
  }
    //Events of Tab windows End
  setInterval(SaveNewCode,100)
}