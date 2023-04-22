async function fetchData() {
    let url = '/assets/json/users.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function Login() {
    let data = await fetchData();

    let username = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;

    let hasAccount = false;
    let name;

    data.forEach(db => {
        if (db.username == username && db.password == password) {
            hasAccount = true
            name = db.firstName
        }
    });

    let base = document.getElementById("AccountNotif");

    if (hasAccount == true) {
        let segment = `<div id="NotifWrapper">
            <h3><i class="fa fa-check"></i> Logged in! Welcome, ${name}</h3>
        </div>`

        base.innerHTML += segment;
    } else {
        let segment = `<div id="NotifWrapper">
            <h3><i class="fa fa-times"></i> Incorrect username or password</h3>
        </div>`

        base.innerHTML += segment;
    }

    setTimeout(() => {
        let notif = document.getElementById("AccountNotif");
        notif.removeChild(notif.firstElementChild)
    }, 1000);
}