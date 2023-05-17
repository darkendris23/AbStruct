async function fetchData() {
    let url = '/assets/json/users.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function Login(user,pass) {
    let data = await fetchData(); // Get user information from json

    let hasAccount = false; // false by default

    // Evaluate database for a match
    try {
        data.forEach(db => {
            if (db.username == user && db.password == pass) {
                hasAccount = true;

                // Store data locally
                localStorage.setItem("abstruct_loggedin", true);
                localStorage.setItem("abstruct_accountID", db.id);
                localStorage.setItem("abstruct_user", db.username);
                localStorage.setItem("abstruct_firstname", db.firstname);
                localStorage.setItem("abstruct_lastname", db.lastname);
                localStorage.setItem("abstruct_email", db.email);
                throw new Error("Account found.")
            }
        });
    } catch (error) {
        
    }
    
    // Show notification on Success or Fail
    let base = document.getElementById("AccountNotif");

    if (hasAccount == true) {
        let segment = `<div id="NotifWrapper">
            <h3><i class="fa fa-check"></i> Logged in! Welcome, ${localStorage.getItem("abstruct_firstname")}</h3>
        </div>`

        base.innerHTML += segment;

        setTimeout(() => {// go back to index after storing data
            window.location.href = "/index.html"

        }, 1000);
    } else {
        let segment = `<div id="NotifWrapper">
            <h3><i class="fa fa-times"></i> Incorrect username or password</h3>
        </div>`

        base.innerHTML += segment;

        setTimeout(() => {
            let notif = document.getElementById("AccountNotif");
            notif.removeChild(notif.firstElementChild)
        }, 1000);
    }
}

// Update index header
function loginStatus() {
    let panel = document.getElementById('userPanel');
    if (localStorage.getItem("abstruct_loggedin") == "true") {
        panel.innerHTML = `<div id="userName">
        <ul>
            <li>
                <h3><i class="fa fa-user"></i> ${localStorage.getItem("abstruct_user")}</h3>
                <ul>
                    <li>Account</li>
                    <li><a href="#" onclick="Logout();">Logout</a></li>
                </ul>
            </li>

        </ul>

    </div>`
    } else {
        panel.innerHTML = `<div id="LogRegBTN">
        <button id="LoginBTN" onclick="window.location.href='/page/account/login.html';">Login</button>
        <button id="RegisterBTN" onclick="window.location.href='https://www.facebook.com/profile.php?id=100092842984629';">Register</button>
    </div>`
    }
}

// ===========================================================================
// Register
function Register() {
    let fname = document.getElementById('firstname')
    let lname = document.getElementById('lastname')
    let uname = document.getElementById('Username')
    let sender_email = document.getElementById('Email')
    let pass = document.getElementById('Password')
    let repass = document.getElementById('RePassword')

    console.log(pass.value)

    if (repass.value !== pass.value) return alert('Password Mismatch')
    if (fname.value && lname.value && uname.value && sender_email.value && pass.value && repass.value) {
        constMail(fname.value, lname.value, uname.value, sender_email.value, pass.value)
    } else {
        alert('Form not filled up')
    }   
}

function constMail() {
    const newline = "%0D%0A";
    window.open('mailto:shuriken123.rpa@gmail.com?subject=abstruct')
}

//============================================================================
// Logout
function Logout() {
    localStorage.removeItem("abstruct_loggedin");
    localStorage.removeItem("abstruct_accountID");
    localStorage.removeItem("abstruct_user");
    localStorage.removeItem("abstruct_firstname");
    localStorage.removeItem("abstruct_lastname");
    localStorage.removeItem("abstruct_email");
    location.reload();
}