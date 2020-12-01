bib = {
  server : class Server {
    constructor(name) {
      this.prop = {
        serverName : name
      }
    }
    close(){
      server.close()
    }
    insertFile(path){
      window.open("file:///"+path)
      
      if(path.length < 10){
        alert("[BIB.JS] USING './index' is prohibited use D://myfolder/myfile.html or like that ")
      }
    }
    insertCode(e){
      window.close()
      server = window.open("","_blank")
      server.document.write(e.toString())
      server.console.clear()
      window.close()
      window.open("localhost:8080/","_blank","width=380,height=80scrollbars=no,resizable=no,left=500").document.write("<h1 align='center'>Successfully started server at about:blank</h1>")
      
    }
  },
  module: {
    import: (e) => {
      var script = document.createElement('script');
      script.onload = function() {
        alert("Script loaded and ready");
      };
      script.src = e.toString();
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  },
  browser: {
    inspector: {
      log: (e) => {
        console.log(e)
      },
      warn: (e) => {
        console.warn(e)
      },
      error: (e) => {
        console.error(e)
      },
    },
    alert: (e) => {
      alert(e)
    },
    prompt: () => {
      prompt(e)
    },
    confirm: (e) => {
      confirm(e)
    },
    window: {
      from: (url = "https://www.google.com", target = "_blank", fe = "toolbar=no,scrollbars=yes,resizable=yes,top=0,left=1000,width=600,height=400") => {
        return window.open(url, target, fe);
      }
    },
    close: () => {
      window.close()
    },
    document: window.document,
    exec: {
      javascript: (code) => {
        if (typeof code == null || code == undefined || code == "") {
          console.warn("PLEASE ENTER PROPER CODEE NOT A NUMBER OR BOOLEAN and don't leave it empty")
          console.log("Normalizing code : Trying to fix the code")
          eval(code.toString())
          console.log("Normalizing code : Success")
        } else {
          console.debug("Success executing the code")
          eval(code)
        }
      },
      html: (code) => {
        if (typeof code == null || code == undefined || code == "") {
          console.warn("PLEASE ENTER PROPER CODEE NOT A NUMBER OR BOOLEAN and don't leave it empty")
          console.log("Normalizing code : Trying to fix the code")
          document.write(code.toString())
          console.log("Normalizing code : Success")
        } else {
          console.debug("Success executing the code")
          document.write(code)
        }
      },
      css: (code) => {
        if (typeof code == null || code == undefined || code == "") {
          console.warn("PLEASE ENTER PROPER CODEE NOT A NUMBER OR BOOLEAN and don't leave it empty")
          console.log("Normalizing code : Trying to fix the code")
          document.write("<style>" + code.toString() + "</style>")
          console.log("Normalizing code : Success")
        } else {
          console.debug("Success executing the code")
          document.write(code)
        }
      }
    }
  }
}