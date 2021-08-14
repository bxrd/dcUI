(() => {
    let createWindow = (width, height) => {
        let left = window.screenLeft + (screen.width - width) / 2;
        let top = window.screenTop + (screen.height - height) / 2;
        return window.open("", "", `width=${width}, height=${height}, top=${top}, left=${left}`);
    };
    
    let popup = createWindow(550, 350);
    if(!popup) return console.error("Popups are blocked.");
    popup.document.write(`
        <html>
            <head>
                <title>Discord Injections</title>
                <style>
                    body {background-color: #111;color: #FFFFFF;font-family: Monospace;overflow: hidden;}
                    button {color: #fff;background: #BF0A30;border: 1px solid white;border-radius: 5px;font-size: 15px;width: 150px;height: 75px;}
                    div {text-align: center;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);width: 100%;}
                    span {margin: 2.5px;}
                    hr {width: 50%;}
                    *:focus {outline: none;}
                </style>
            </head>
            <body>
                <div>
                    <span>
                        <button id="extract">Extract Token</button>
                        &nbsp;
                        <button id="inject">Inject Token</button>
                    </span>
                    <br><br>
                    <span>
                        <button id="verif">Verification Bypass</button>
                        &nbsp;
                        <button id="pass">Create Token</button>
                    </span>
                </div>
            </body>
        </html>
    `);

    let options = () => {
        return {
            method: "POST",
            body: JSON.stringify({
                "email": popup.prompt("Email"),
                "password": popup.prompt("Password")
            }),
            
            headers: {
                "Content-Type":"application/json"
            }
        };
    };

    popup.document.getElementById("extract").addEventListener("click", async () => {
        popup.alert(document.body.appendChild(document.createElement("iframe")).contentWindow.localStorage.token);
    });

    popup.document.getElementById("inject").addEventListener("click", async() => {
        let login = (token) => {
            setInterval(() => {
                document.body.appendChild(document.createElement("iframe")).contentWindow.localStorage.token = `"${token}"`;
            }, 50);
            
            setTimeout(() => {location.reload()}, 2500);
        };
        
        login(popup.prompt("Token"));
    });

    popup.document.getElementById("verif").addEventListener("click", async () => {
        let login = (token) => {
            setInterval(() => {
                document.body.appendChild(document.createElement("iframe")).contentWindow.localStorage.token = `"${token}"`;
            }, 50);
            
            setTimeout(() => {location.reload()}, 2500);
        };

        login((await (await fetch("https://discord.com/api/v7/auth/login", options())).json()).token);
    });

    popup.document.getElementById("pass").addEventListener("click", async () => {
        popup.alert((await (await fetch("https://discord.com/api/v7/auth/login", options())).json()).token);
    });
    
    return "vinny says: don't use this for evil!";
})();
