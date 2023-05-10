var lbx_order;

let itemCount;

function initLightbox() {
    itemCount = document.getElementsByClassName('lbxSample').length
    lbx_order = 1;
    setOrder(lbx_order);
}

function lbx_next() {
    if ((lbx_order + 1) > itemCount) {
        lbx_order = 1;
    } else {
        lbx_order++;
    }
    setOrder(lbx_order);
}

function lbx_prev() {
    if ((lbx_order - 1) < 1) {
        console.log(lbx_order - 1);
        lbx_order = itemCount;
    } else {
        lbx_order--;
    }
    setOrder(lbx_order);

}

function setOrder(num) {
    let items = document.getElementsByClassName('lbxSample');
    let border = document.getElementById('lbxSelect');

    if (!border) { } else { border.removeAttribute('id'); }

    items[num - 1].setAttribute('id', 'lbxSelect');
    let img = items[num - 1].getElementsByTagName('img')[0].getAttribute('src');

    updateImage(img);

    // scrollbar
    const gap = 77.5;
    let scrollbar = document.getElementById('lbxItemContainer');
    scrollbar.scrollTo(gap * (num-2), 0)
}

function updateImage(img) {
    const imgBox = document.getElementById('LightboxPreview');
    imgBox.getElementsByTagName('img')[0].src = img
}

// Product Assembler
async function fetchProducts() {
    let url = '/assets/json/products.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function fetchUsers() {
    let url = '/assets/json/users.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

function dateDiff(targ) {
    let t = new Date(targ);
    let c = new Date();

    let diff = t - c
    diff = Math.ceil(diff / (1000 * 60 * 60 * 24))

    var hours = t.getHours();
    var minutes = t.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    console.log(t)
    console.log(c)
    console.log(diff)

    if (diff <= -1) return "Ended"
    if (diff == 0) return "Today at " + strTime     // if now
    if (diff == 1) return "in 1 day at " + strTime  // if in a day
    return "in " + diff + " days at " + strTime;    // if more days ahead
}

async function productLayoutAssembler() {
    // Get all placeholders
    let imgContainer = document.getElementById('lbxItemContainer');

    // Get all products from json
    let products = await fetchProducts();

    // Create storage variable
    let hasEntry;
    let extracted;

    // Extract the whole data entry matching conditions
    let currLink = window.location.pathname;
    products.forEach(data => {
        if (currLink == data.pagelink) {
            extracted = data;
            hasEntry = true
        }
    });

    // Make sure there is an entry bedore proceeding
    if (!hasEntry) return;

    // Split datas
    // Assign images to lightbox pane
    extracted.samples.forEach(img => {
        console.log(img)
        const struct = `<div class="lbxSample">
        <img src="${img}"/>
    </div>`
        imgContainer.innerHTML += struct;
    });
    

    // Initialize lightbox after page has finished preparing
    initLightbox()

    // Assign titles and details
    let title = document.getElementById('productTitle')
    let medium = document.getElementById('labelMedium')
    let size = document.getElementById('labelSize')
    let condition = document.getElementById('labelCondition')
    let details = document.getElementById('labelDetails')
    let author = document.getElementById('labelAuthor')

    title.innerHTML = extracted.title
    medium.innerHTML = extracted.info.medium
    size.innerHTML = extracted.info.size
    condition.innerHTML = extracted.info.condition
    details.innerHTML = extracted.info.details

    let user = await fetchUsers()

    user.forEach(userFind => {
        if (userFind.id = extracted.authorid) author.innerHTML = userFind.username
        console.log(author)
    });

    // Repeat process for time diff
    let diff = await dateDiff(extracted.auctiondate+'T'+extracted.auctiontime)
    console.log(diff)

    let auction = document.getElementById('productAuctionTime')
    let auctionBTN = document.getElementById('gotoAuctionBTN')
    if (diff.toLowerCase() == 'ended') {
        auction.innerHTML = ''
        auctionBTN.disabled = true
    } else if (diff.toLowerCase().includes('today')) {
        auction.innerHTML = `Auction ${diff}`
    } else {
        auction.innerHTML = `Auction ${diff}`
        auctionBTN.disabled = true
    }
}