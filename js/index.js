var checkAll = document.getElementsByClassName('check-all');
var checkSingle = document.getElementsByClassName('check-box');

shoppingCart();
sum();

function shoppingCart() {
  var shoppingCartOutline = document.getElementById('shopping-cart-information');
  var cartProducts = [
    {
      "id": 1,
      "name": "Jay",
      "count": 1,
      "price": 148,
      "checked": false,
      "album": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576648543658&di=ca78227fb8c719c8466f9d582bb799ba&imgtype=0&src=http%3A%2F%2Fpic2.zhimg.com%2F35ca0077ad7a5c84b32aa26f85987015_b.jpg"
    },
    {
      "id": 2,
      "name": "范特西",
      "count": 2,
      "price": 150.5,
      "checked": true,
      "album": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577243710&di=9c33922a4dcdc56a076bebae0ecf44d2&imgtype=jpg&er=1&src=http%3A%2F%2Fww2.sinaimg.cn%2Flarge%2F66fbbd08tw1e6otwifyfvj215419zty8.jpg"
    },
    {
      "id": 3,
      "name": "七里香",
      "count": 1,
      "price": 149,
      "checked": false,
      "album":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576649152727&di=08fcb1ece948c5f20169febf89ddab35&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-vo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Faec379310a55b3197e67d17043a98226cffc171c.jpg"
    },
    {
      "id": 4,
      "name": "十一月的肖邦",
      "count": 1,
      "price": 155,
      "checked": false,
      "album":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576649315234&di=bd22f4bd36292943aac835570edc77fa&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-fo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Fd0c8a786c9177f3eb1dd2fd870cf3bc79e3d567e.jpg"
    },
    {
      "id": 5,
      "name": "魔杰座",
      "count": 1,
      "price": 136,
      "checked": true,
      "album":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576650753209&di=0d7d8db71bf6f6e7b95a2d01ae7de36f&imgtype=jpg&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170118%2F91e11bfa61424679a0bfa8b1abb2c193_th.jpeg"
    },
    {
      "id": 6,
      "name": "哎哟，不错哦",
      "count": 5,
      "price": 148.5,
      "checked": false,
      "album":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576650929346&di=87a26e9055a9962b2cfd850ab1a23b45&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201501%2F02%2F20150102130729_UGm2U.jpeg"
    }
  ]

  for (var i = 0; i < cartProducts.length; i++) {
    var trow = getShoppingCartInformation(cartProducts[i]);
    shoppingCartOutline.appendChild(trow);
  }
}

function getShoppingCartInformation(items) {
  var row = document.createElement('tr');

  getCheckStatus(items, row);
  getImgData(items, row);
  getPrice(items, row);
  var count = getCount(items, row);
  getSubtotalPriceData(row, items, count);

  checkAll[0].addEventListener('click', function() {
    selectAll(event);
    sum();
  });

  return row;
}

function getCheckStatus(items, row) {
  var checkCell = document.createElement('td');
  var checkBox = document.createElement('input');
  checkBox.setAttribute('class', 'check-box');
  checkBox.setAttribute('type', 'checkbox');
  checkBox.setAttribute('id', items.id);
  checkBox.checked = items.checked;
  checkCell.appendChild(checkBox);
  row.appendChild(checkCell);

  checkBox.addEventListener('click', function() {
    isSelectAll();
    sum();
  });
  
}

function getImgData(items, row) {
  var nameCell = document.createElement('td');
  var imgBlock = document.createElement('img');
  var nameBlock = document.createElement('span');
  imgBlock.setAttribute('src', items.album);
  nameBlock.innerHTML = items.name;
  nameBlock.setAttribute('class', 'album-name');
  nameCell.appendChild(nameBlock);
  nameCell.appendChild(imgBlock);
  row.appendChild(nameCell);
}

function getPrice(items, row) {
  var priceCell = document.createElement('td');
  priceCell.innerHTML = items.price;
  row.appendChild(priceCell);
}

function getCount(items, row) {
  var countCell = document.createElement('td');
  var countDiv = document.createElement('div');
  var reduceCountBtn = document.createElement('span');
  reduceCountBtn.setAttribute('class', 'button');
  reduceCountBtn.innerHTML = '-';
  var count = document.createElement('input');
  count.setAttribute('class', 'count');
  count.setAttribute('type', 'text');
  count.setAttribute('value', items.count);
  var addCountBtn = document.createElement('span');
  addCountBtn.setAttribute('class', 'button');
  addCountBtn.innerHTML = '+';
  countDiv.appendChild(reduceCountBtn);
  countDiv.appendChild(count);
  countDiv.appendChild(addCountBtn);
  countCell.appendChild(countDiv);
  row.appendChild(countCell);

  reduceCountBtn.addEventListener('click', function() {
    var subtotalCell = this.parentNode.parentNode.parentNode.childNodes[4];
    reduce(count, row);
    getSubtotalPrice(subtotalCell, items, count);
    sum();
  });

  addCountBtn.addEventListener('click', function() {
    var subtotalCell = this.parentNode.parentNode.parentNode.childNodes[4];
    add(count);
    getSubtotalPrice(subtotalCell, items, count);
    sum();
  });

  return count;
}

function getSubtotalPriceData(row, items, count) {
  var subtotalCell = document.createElement('td');
  row.appendChild(subtotalCell);
  
  getSubtotalPrice(subtotalCell, items, count);
}

function getSubtotalPrice(subtotalCell, items, count) {
  subtotalCell.innerHTML = items.price * count.value;
}

function reduce(count, row) {
  count.value--;
  if (count.value<=0) {
    row.parentNode.removeChild(row);
  }
}

function add(count) {
  count.value++;
}

function sum() {
  var totalPrice = 0;
  var totalCount = 0;
  var rows = document.getElementsByTagName('tr');
  var totalPriceDOM = document.getElementById('priceTotal');
  var totalItem = document.getElementById('item-total-count');

  for (var j = 1; j < rows.length; j++) {
    var checkValue = rows[j].childNodes[0].childNodes[0];
    if (checkValue.checked) {
      var price = rows[j].childNodes[4].innerHTML;
      var itemCount = rows[j].childNodes[3].childNodes[0].childNodes[1].value;
      totalPrice += Number(price);
      totalCount += Number(itemCount);
    }
  }
  totalPriceDOM.innerHTML = totalPrice;
  totalItem.innerHTML = totalCount;
}

function isSelectAll() {
  var isSelectAll = true;
  for (i = 0; i < checkSingle.length; i++) {
    if (!checkSingle[i].checked) {
        isSelectAll = false;
    }
  }
  checkAll[0].checked = isSelectAll;
}

function selectAll(event) {
  for (var i = 0; i < checkSingle.length; i++) {
    checkSingle[i].checked = event.target.checked;
  }
  sum();
}
