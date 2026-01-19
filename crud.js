let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');

let mood = 'create';
let tel;

function addData() {
    if (price.value !== '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#040'
    } else{
        total.innerHTML = '';
        total.style.backgroundColor = '#ff0000c0'
    }
}


// check localstorage
let dataPro;
let mainProduct = localStorage.getItem('option-product');

if (mainProduct !== null) {
    dataPro = JSON.parse(mainProduct);
} else{
    dataPro = [];
}

create.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value !== '' && price.value !== '' && category.value !== '') {
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            }
        } else{
            dataPro[tel] = newPro;
            create.innerHTML = 'create';
        }
        clearData();
    }

    localStorage.setItem('option-product', JSON.stringify(dataPro));
    showData();
    total.style.backgroundColor = '#ff0000c0';
}

function showData() {
    let table = '';
    let deletaAll = document.getElementById('deleteAll');
        for (let i = 0; i < dataPro.length; i++) {
            table += `<tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick='updateData(${i})'>update</button></td>
                        <td><button onclick='deleteData(${i})'>delete</button></td>
                    </tr>`
        }
        document.getElementById('tbody').innerHTML = table;
    if (dataPro.length > 0){
        deletaAll.innerHTML = `<button onclick='deleteAll()'>deleteAll(${dataPro.length})</button>`;
    }else{
        deletaAll.innerHTML = '';
    }
}

showData();

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

function deleteData(e) {
    dataPro.splice(e, 1);
    localStorage.setItem('option-product', JSON.stringify(dataPro));
    showData();
}

function deleteAll() {
    localStorage.clear();
    dataPro = [];
    showData();
}

function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    count.style.display = 'none'
    category.value = dataPro[i].category;

    create.innerHTML = 'update';
    total.style.backgroundColor = '#040'

    scroll({
        top: 0,
        behavior: 'smooth'
    })
    mood = 'update';
    tel = i;
    addData();
}

let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id === 'searchTitle') {
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }

    search.focus();
    search.placeholder = `search by ${searchMood}`;
    search.value = '';
    showData();
}

// هعمل فانشن واشغلها لما اكتب فى السيرش حاجة
function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood === 'title') {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `<tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick='updateData(${i})'>update</button></td>
                        <td><button onclick='deleteData(${i})'>delete</button></td>
                    </tr>`
            }
        } else{
            if (dataPro[i].category.includes(value.toLowerCase())){
            table += `<tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick='updateData(${i})'>update</button></td>
                        <td><button onclick='deleteData(${i})'>delete</button></td>
                    </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}