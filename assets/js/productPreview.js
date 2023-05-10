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
}