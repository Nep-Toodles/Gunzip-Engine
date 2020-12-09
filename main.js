window.onload = () =>{
  document.getElementById("projectAdvancedSection").style.display = "block";
  document.getElementById("projectContainer").style.display = "none";
  document.getElementById("postsContainer").style.display = "none"


  document.querySelector("#projectmenu").onclick=(e)=>{
    e.preventDefault()
    document.getElementById("postsContainer").style.display = "none"
    document.getElementById("projectAdvancedSection").style.display = "none"
    document.getElementById("projectContainer").style.display = "block"
  }
  document.querySelector("#mainmenu").onclick=(e)=>{
    e.preventDefault()
    document.getElementById("postsContainer").style.display = "none"
    document.getElementById("projectAdvancedSection").style.display = "block"
    document.getElementById("projectContainer").style.display = "none"
  }
  document.querySelector("#posts").onclick = (e)=>{
    e.preventDefault()
    document.getElementById("postsContainer").style.display = "block"
    document.getElementById("projectAdvancedSection").style.display = "none"
    document.getElementById("projectContainer").style.display = "none"
  }
  document.querySelector(".projectmenu").onclick=(e)=>{
    e.preventDefault()
    document.getElementById("postsContainer").style.display = "none"
    document.getElementById("projectAdvancedSection").style.display = "none"
    document.getElementById("projectContainer").style.display = "block"
  }
  document.querySelector(".mainmenu").onclick=(e)=>{
    e.preventDefault()
    document.getElementById("postsContainer").style.display = "none"
    document.getElementById("projectAdvancedSection").style.display = "block"
    document.getElementById("projectContainer").style.display = "none"
  }
  document.querySelector(".posts").onclick = (e)=>{
    e.preventDefault()
    document.getElementById("postsContainer").style.display = "block"
    document.getElementById("projectAdvancedSection").style.display = "none"
    document.getElementById("projectContainer").style.display = "none"
  }
}