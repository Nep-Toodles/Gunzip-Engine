iframe = document.getElementById("iframe")
iframe.srcdoc = `<html>
            <head>
            <script src="//cdn.jsdelivr.net/npm/phaser@3.24.1/dist/phaser.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/keyboardjs/2.6.2/keyboard.min.js" integrity="sha512-Q9aijJKP9BeTXgQHmb/j8AZTQ15//k9QvGXCbKMf1bt289s75awi/3SBFZ3M3J27NtD7JyU3d9d1eRPuO4BbhQ==" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js"></script>
            <style>
            `+ localStorage.getItem("codeCss").toString() + `
            </style>
            </head>
            <body>
            ` + localStorage.getItem("codeHtml") + `
            <script>document.addEventListener('contextmenu', event => event.preventDefault());</script>
            </div><script>window.onload=()=>{` + localStorage.getItem("codeInit") + `}` + `</script></body>
            </html>
            `;