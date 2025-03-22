let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let categry = document.getElementById('categry');
let create = document.getElementById('create');
// let outputs = document.getElementById('outputs');
let datepro;
let mood = "creat"
let tmp;
let searchinput = document.getElementById('search')

//code
//total
function gettotal(){
  let  result =  (+price.value + +taxes.value + +ads.value)- +discount.value 
  total.innerHTML = 'total:' + result
  if (result > 0){
    total.style.backgroundColor = '#28A745'
  }else{
    total.style.backgroundColor = '#DC3545'
    result = ''
    total.innerHTML = 'total:' + result
  }

}


// if (localStorage.product != null) {
//   datepro = JSON.parse(localStorage.product);
// } else {
//   datepro = [];
// }



datepro = JSON.parse(localStorage.getItem("product")) || [];
if (!Array.isArray(datepro)) {
    datepro = []; // إعادة تعيينه كمصفوفة إذا لم يكن مصفوفة
}

function creat() {
    let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML.slice(6),
        count: count.value,
        categry: categry.value
    };
    if(title.value != '' && price.value != '' && taxes.value != '' && ads.value != '' && discount.value != '' && total.innerHTML != 'total:' && count.value < 10000 && categry.value != ''){
      if(mood === 'creat'){
        if (newpro.count > 1) {
            for (let i = 0; i < newpro.count; i++) {
                datepro.push({ ...newpro, count: 1 }); // إنشاء نسخة جديدة مع تعيين count إلى 1
            }
        } else {
            datepro.push(newpro);
          }
        }else{
          datepro[tmp] = newpro
          mood = 'creat'
          create.innerHTML = 'create'
        }
        clearinputs();
        
      
    }else{
      console.log('error')
      
    }


    localStorage.setItem('product', JSON.stringify(datepro));
    console.log(datepro);
    
    read();
    // setTimeout(() => {
    //     let lastRow = document.querySelector("#outputs tr:last-child");
    //     if (lastRow) {
    //         lastRow.scrollIntoView({ behavior: "smooth" });
    //     }
    // }, 100);
}



read()


// clear inputes

function clearinputs(){
  title.value = ''
  price.value = ''
  taxes.value = ''
  ads.value = ''
  discount.value = ''
  total.innerHTML = 'total:'
  count.value = ''
  categry.value = ''
}
// let lwe;
// for(let j = 1; j < datepro.length; j++){
//   j = lwe
// }
//read
let lwe;
function read(){
  let table = ''

  for(let i = 0; i < datepro.length; i++){
    table += `
    <tr>
      <td>${i + 1}</td>
      <td>${datepro[i].title}</td>
      <td>${datepro[i].price}</td>
      <td>${datepro[i].taxes}</td>
      <td>${datepro[i].ads}</td>
      <td>${datepro[i].discount}</td>
      <td>${datepro[i].total}</td>
      <td>${datepro[i].categry}</td>
      <td><button onclick="updateone(${i})">update</button></td>
      <td><button onclick="deleteone(${i})">delete</button></td>
      <tr>`
  }
  
  document.getElementById('outputs').innerHTML = table;
  let deletealldiv = document.getElementsByClassName('deletealldiv')[0]
  if (datepro.length > 0) {
      deletealldiv.innerHTML = `
     <button id="deleteall" onclick="deletall()">delete all(${datepro.length})</button>`
     
      
  }else{
    deletealldiv.innerHTML = ''
  }
}
//deletall
function deletall(){
  localStorage.removeItem('product')
  datepro = []
  read()
}
read()


function deleteone(i){
    datepro.splice(i,1)
    localStorage.setItem('product', JSON.stringify(datepro))
    read()
}

function updateone(i){
    title.value = datepro[i].title
    price.value = datepro[i].price
    taxes.value = datepro[i].taxes
    ads.value = datepro[i].ads
    discount.value = datepro[i].discount
    // total.innerHTML = datepro[i].total
    gettotal()
    datepro[i].count = 1
    count.style.display = 'none'

    categry.value = datepro[i].categry
    create.innerHTML = 'update'
    mood = 'update'
    tmp = i
    scroll({
        top:0,
        behavior:'smooth'
    })
    read()
    // mood = 'creat'
    // create.innerHTML = 'create' 
}

// for(let i = 0; i < count.value; i++){
//   creat()
//   read()
// }
let searchmood = 'title';

// تعريف عناصر البحث
let btnsearchbytitle = document.getElementById('searchbtn');
let btnsearchbycategory = document.getElementById('categrybtn');
// let searchinput = document.getElementById('search');
let outputs = document.getElementById('outputs');

// وظيفة تغيير وضع البحث
function search4(id) {
    if (id === 'searchbtn') {
        searchmood = 'title';
        searchinput.placeholder = 'search by title';

    } else if (id === 'categrybtn') {
        searchmood = 'categry';
        searchinput.placeholder = 'search by categry';
    }
    searchinput.focus();
    console.log("وضع البحث:", searchmood);
}

// وظيفة البحث
function getsearch(value) {
    console.log("قيمة البحث:", value);

    let table = '';

    if (datepro.length > 0) {
        for (let i = 0; i < datepro.length; i++) {
            if (
                (searchmood === 'title' && datepro[i].title.toLowerCase().includes(value.toLowerCase())) ||
                (searchmood === 'categry' && datepro[i].categry.toLowerCase().includes(value.toLowerCase()))
            ) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${datepro[i].title}</td>
                    <td>${datepro[i].price}</td>
                    <td>${datepro[i].taxes}</td>
                    <td>${datepro[i].ads}</td>
                    <td>${datepro[i].discount}</td>
                    <td>${datepro[i].total}</td>
                    <td>${datepro[i].categry}</td>
                    <td><button onclick="updateone(${i})">delete</button></td>
                    <td><button onclick="deleteone(${i})">update</button></td>
                </tr>`;
            }
        }
    }

    // تحديث عرض النتائج
    outputs.innerHTML = table;
}

  
  
  
  
  
  
  
  
  
  // else if(searchmood === 'categry'){
    
  // }
