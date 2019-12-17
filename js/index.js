window.onload = function() {
  var cartProducts = [
    {
      "id": 1,
      "name": "英雄牌 钢笔",
      "count": 1,
      "price": 69,
      "checked": false
    },
    {
      "id": 2,
      "name": "晨光牌 铅字笔",
      "count": 2,
      "price": 5.5,
      "checked": true
    },
    {
      "id": 3,
      "name": "晨光牌 铅笔",
      "count": 1,
      "price": 2,
      "checked": false
    },
    {
      "id": 4,
      "name": "狗熊牌 橡皮擦",
      "count": 1,
      "price": 1,
      "checked": false
    },
    {
      "id": 5,
      "name": "瑞士牌 双肩书包",
      "count": 1,
      "price": 199,
      "checked": true
    },
    {
      "id": 6,
      "name": "晨光牌 作业本",
      "count": 5,
      "price": 2.5,
      "checked": false
    }
  ]

  var tbody = document.getElementById('tbMain');

  for (var i = 0; i < cartProducts.length; i++) {
    var trow = getDataRow(cartProducts[i]);
    tbody.appendChild(trow);
  }

  function getDataRow(h) {
    var row = document.createElement('tr');

    var checkCell = document.createElement('td');
    var checkBox = document.createElement("input");
    checkBox.setAttribute("class","checkbox");
    checkBox.setAttribute("type","checkbox");
    checkBox.setAttribute("id", h.id);
    checkBox.checked = h.checked;
    checkCell.appendChild(checkBox);
    row.appendChild(checkCell);

    var nameCell = document.createElement('td');
    nameCell.innerHTML = h.name;
    row.appendChild(nameCell);

    var priceCell = document.createElement('td');
    priceCell.innerHTML = h.price;
    row.appendChild(priceCell);

    var countCell = document.createElement('td');
    var countDiv = document.createElement('div');
    var reduceBtn = document.createElement('span');
    reduceBtn.setAttribute('class', 'button');
    reduceBtn.innerHTML = '-';
    var count = document.createElement('input');
    count.setAttribute('class', 'count');
    count.setAttribute("type","text");
    count.setAttribute("value", h.count);
    var addBtn = document.createElement('span');
    addBtn.setAttribute('class', 'button');
    addBtn.innerHTML = '+';
    countDiv.appendChild(reduceBtn);
    countDiv.appendChild(count);
    countDiv.appendChild(addBtn);
    countCell.appendChild(countDiv);
    row.appendChild(countCell);

    var subtotalCell = document.createElement('td');
    row.appendChild(subtotalCell);

    reduceBtn.addEventListener('click', reduce);
    reduceBtn.addEventListener('click', subtotal);
    reduceBtn.addEventListener('click', sum);
    addBtn.addEventListener('click', add);
    addBtn.addEventListener('click', subtotal);
    addBtn.addEventListener('click', sum);
    checkBox.addEventListener('click', sum);

    function reduce() {
      count.value--;
        if (count.value<=0) {
            row.parentNode.removeChild(row);
        }
    }

    function add() {
      count.value++;
    }

    function subtotal() {
      subtotalCell.innerHTML = h.price * count.value;
    }

    subtotal();

    var totalPriceDOM = document.getElementById('priceTotal');
    
    function sum() {
      var totalPrice = 0;
      var rows = document.getElementsByTagName('tr');

      for (var j = 1; j < rows.length; j++) {
        var checkValue = rows[j].childNodes[0].childNodes[0];
        if (checkValue.checked) {
          var price = rows[j].childNodes[4].innerHTML;
          totalPrice += Number(price);
        }
      }
      totalPriceDOM.innerHTML = totalPrice;
    }

    sum();

    return row;
  }
}
  

