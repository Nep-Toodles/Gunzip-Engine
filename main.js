window.onload = () =>{
  
//The Imp-ortant Part
setInterval(()=>{
  document.querySelector("a").target = "_blank"
},100)

function postMessageToWeb(e){
  firebase.database().ref("posts/").push({
      text : marked(e.toString()).toString(),
      vote : 0,
      poster : localStorage.getItem("gunzipserveruserName") || "Anonymous"
    })
}

function PostMessage(){
  value = document.getElementById("postText").value.toString()
  postMessageToWeb(value)
}
 var ref = firebase.database().ref("posts/");
ref.on("value", function(snapshot) {
  document.getElementById("userPosts").innerHTML = ""
   snapshot.forEach((it,id)=>{
     document.getElementById("userPosts").innerHTML += `<div style="height:8%;width:100%;position:relative;overflow:hidden;" class="card green"><label class='white'>Posted by :::::`+it.val().poster.toString()+`:</label>`+ marked(it.val().text.toString()) + `</div><hr>`;
})
})
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

  document.getElementById("uploadPostOfUser").onclick = ()=>{
    confirmpost = confirm("Are you Sure You want to upload the post [You Cant delete the Community posts]")
    if(confirmpost){
      done = prompt("Type 'hot dogs'","hot").toLocaleLowerCase()
      if(done == "hot dogs"){
        PostMessage()
      }

    }
  }
}