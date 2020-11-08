
window.onload = function(){
  document.getElementById("scriptingWindow").style.display = "none"; //By deafult it is hidden

  //Events of Tab Window Start
  document.getElementById("sceneView").onclick =()=>{
    document.getElementById("scenesMenu").style.display = "block";
    document.getElementById("scriptingWindow").style.display = "none";
  }
  document.getElementById("scriptView").onclick =()=>{
    document.getElementById("scenesMenu").style.display = "none";
    document.getElementById("scriptingWindow").style.display = "block";
  }
    //Events of Tab windows End
  
}