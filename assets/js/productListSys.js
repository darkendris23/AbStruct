async function fetchProducts() {
    let url = '/assets/json/products.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

function dateDiff(targ) {
    let t = new Date(targ);

    let diff = t.getDate() - new Date().getDate();

    var hours = t.getHours();
    var minutes = t.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    if (diff < -1) return diff + " days ago"
    if (diff == -1) return "Yesterday"
    if (diff == 0) return "Today at " + strTime     // if now
    if (diff == 1) return "in 1 day at " + strTime  // if in a day
    return "in " + diff + " days at " + strTime;    // if more days ahead
}

async function loadProduct() {
    let data = await fetchProducts();

    data.forEach(item => {
        // Pass data for product card
        if (item.isDeleted) return;
        let diff = dateDiff(item.auctiondate + 'T' + item.auctiontime);
        productDisplay(item.imagelink, item.title, item.authorid, diff)
    });
}

async function productDisplay(img, title, user, timeleft) {
    let data;

    try {
        let url = '/assets/json/users.json';
        let x = await fetch(url);
        data = await x.json();
    } catch (error) {
        console.log(error)
    }

    try {
        data.forEach(auth => {
            if (auth.id == user) {
                user = auth.username;
                throw new Error("Account found.");
            }
        });
    } catch (error) {

    }

    const cardLayout = `<div class="grid-item">
    <div class="item-container">
        <div class="item-image">
            <img src="${img}" />
        </div>
        <h4 class="item-title">
            ${title}
        </h4>
        <p class="item-author"><i class="fa fa-user"></i> ${user}</p>
        <h5 class="item-date">Auction in<br />
            <p>${timeleft}</p>
        </h5>
    </div>
</div>`

    let target = document.getElementById("Listing");
    target.innerHTML += cardLayout
}