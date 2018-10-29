//[Dict] Images File Path
var imageDict= {
    "original-none" : "images/original.png",
    "original-sugarmilk" : "images/sugarmilk.png",
    "original-vanillamilk" : "images/vanillamilk.png",
    "original-doublechocolate" : "images/doublechocolate.png",
    "blackberry-none":"images/blackberry.png",
    "blackberry-sugarmilk" : "images/sugarmilk.png",
    "blackberry-vanillamilk":"images/vanillamilk.png",
    "blackberry-doublechocolate":"images/doublechocolate.png",
    "walnut-none":"images/walnut.png",
    "walnut-sugarmilk":"images/sugarmilk.png",
    "walnut-vanillamilk":"images/vanillamilk.png",
    "walnut-doublechocolate":"images/doublechocolate.png",
    "original (gluten free)-none":"images/original-gluten-free.png",
    "original (gluten free)-sugarmilk":"images/sugarmilk.png",
    "original (gluten free)-vanillamilk":"images/vanillamilk.png",
    "original (gluten free)-doublechocolate":"images/doublechocolate.png",
    "caramel pecan-none":"images/caramel-pecan.png",
    "caramel pecan-sugarmilk":"images/sugarmilk.png",
    "caramel pecan-vanillamilk":"images/vanillamilk.png",
    "caramel pecan-doublechocolate":"images/doublechocolate.png",
    "pumpkin spice-none":"images/pumpkin-spice.png",
    "pumpkin spice-sugarmilk":"images/sugarmilk.png",
    "pumpkin spice-vanillamilk":"images/vanillamilk.png",
    "pumpkin spice-doublechocolate":"images/doublechocolate.png",
};

//[Dict] Prices for different products
var productPrice = {
    "original" : "4.99",
    "blackberry" : "5.99",
    "walnut" : "5.99",
    "original (gluten free)" : "4.99",
    "caramel pecan" : "4.99",
    "pumpkin spice":"4.99"
};

//Change prodcut price when users change quantity
function changeQuantity() {
    var currentPrice = document.getElementById("current-price");
    var currentQuantity = document.getElementById("quantity-select");
    var currentProduct = document.getElementById("product-title");
    console.log(currentProduct.innerText.toLowerCase().replace(/(\r\n|\n|\r)/gm," "));
    currentPrice.innerText = "$" + currentQuantity.value * productPrice[currentProduct.innerText.toLowerCase().replace(/(\r\n|\n|\r)/gm," ")];
}

//Change product image when users change flavor
function changeFlavor() {
    var currentFlavor = document.getElementById("flavor-select");
    var productImage = document.getElementById("product-image");
    var currentProduct = document.getElementById("product-title");
    productImage.src = imageDict[currentProduct.innerText.toLowerCase().replace(/(\r\n|\n|\r)/gm," ") + "-" + currentFlavor.value];
}

//An Object constructor for cart items
function CartItem(product, flavor, quantity, price) {
    this.product = product;
    this.flavor = flavor;
    this.quantity = quantity;
    this.price = price;
}

//Add current product to cart and save items' info (product name, flavor, quantity, price) to localStorage
function addToCart() {
    var currentFlavor = document.getElementById("flavor-select");
    var currentPrice = document.getElementById("current-price");
    var currentQuantity = document.getElementById("quantity-select");
    var currentProduct = document.getElementById("product-title");

    var newCartItem = new CartItem(currentProduct.innerText, currentFlavor.value, currentQuantity.value, currentPrice.innerText.substr(1));

    if (localStorage.getItem("cart") === null || localStorage.getItem("cart").length <= 0) {
        var currentCartArray = [newCartItem];
        localStorage.setItem("cart", JSON.stringify(currentCartArray))
    } else {
        var currentCartArray = JSON.parse(localStorage.getItem("cart"));
        currentCartArray.push(newCartItem);
        localStorage.setItem("cart", JSON.stringify(currentCartArray));
    }
}

//Update subtotal, tax, and total price when users change quantity (at the same time, updating localStorage)
function cartChangeQuantity(event) {
    var currentCartArray = JSON.parse(localStorage.getItem("cart"));
    var cartItemNumber = event.id.match(/\d+/g)[0];
    currentCartArray[cartItemNumber-1].quantity = event.value;
    currentCartArray[cartItemNumber-1].price = event.value * productPrice[currentCartArray[cartItemNumber-1].product.toLowerCase()];

    var currentPrice = document.getElementById("cart-item-" + cartItemNumber +"-price");
    currentPrice.innerText = "$" + currentCartArray[cartItemNumber-1].price;

    localStorage.setItem("cart", JSON.stringify(currentCartArray));

    updateCartPrice();
}

//Update localStorage when users change flavor
function cartChangeFlavor(event) {
    var currentCartArray = JSON.parse(localStorage.getItem("cart"));
    var cartItemNumber = event.id.match(/\d+/g)[0];
    currentCartArray[cartItemNumber-1].flavor = event.value;
    localStorage.setItem("cart", JSON.stringify(currentCartArray))
}

//Update subtotal, tex and total price from localStorage
function updateCartPrice() {
    var currentCartArray = JSON.parse(localStorage.getItem("cart"));
    var subtotal = 0;
    var tax = 0;
    var total = 0;
    for (var i = 0; i < currentCartArray.length; i++) {
        if (currentCartArray[i] === null) {continue;}
        subtotal += Number(currentCartArray[i].price);
    }
    tax = subtotal * 0.07;
    total = Number(subtotal) + Number(tax);

    var currentSubtotalNum = document.getElementById("subtotal-num");
    var currentTaxNum = document.getElementById("tax-num");
    var currentTotalNum = document.getElementById("total-num");

    currentSubtotalNum.innerText = "$" + Number(subtotal).toFixed(2);
    currentTaxNum.innerText =  "$" + Number(tax).toFixed(2);
    currentTotalNum.innerText =  "$" + Number(total).toFixed(2);
}

//Update cart items, subtotal, tax, and total price when users delete an item (at the same time, updating localStorage)
function cartDelete(event) {

    var currentCartArray = JSON.parse(localStorage.getItem("cart"));
    //currentCartArray.splice(event.id.substring(10, event.id.length-7)-1, 1);
    delete currentCartArray[event.id.substring(10, event.id.length-7)-1];
    localStorage.setItem("cart", JSON.stringify(currentCartArray));

    var currentNode = document.getElementById(event.id.substring(0, event.id.length-7));
    currentNode.parentNode.removeChild(currentNode);
    var cart = document.getElementById("cart-items");

    if (currentCartArray === null || currentCartArray.length <= 0 || currentCartArray.every(checkNull)) {
        cart.innerHTML = '<div class="empty-cart-message">Your shopping cart is empty. <a href="cakes.html">Go shopping!</a></div>';
    }
    updateCartPrice();
}

//Check whether an object is null
function checkNull(object) {
    return object === null;
}

//Load cart items from localStorage
function loadCartItems() {
    var currentCartArray = JSON.parse(localStorage.getItem("cart"));
    var cart = document.getElementById("cart-items");

    if (currentCartArray === null || currentCartArray.length <= 0 || currentCartArray.every(checkNull)) {
        cart.innerHTML = '<div class="empty-cart-message">Your shopping cart is empty. <a href="cakes.html">Go shopping!</a></div>';
    } else {
        var content;

        for (var i = 0; i < currentCartArray.length; i++) {
            if (currentCartArray[i] === null) {continue;}
            var flavorDict = {
                "none":"",
                "sugarmilk":"",
                "vanillamilk": "",
                "doublechocolate":""
            };
            var quantityDict = {
                "1":"",
                "3":"",
                "6": "",
                "12":""
            };
            flavorDict[currentCartArray[i].flavor] = "selected";
            quantityDict[currentCartArray[i].quantity] = "selected";
            content =
                '<div id="cart-item-' + parseInt(i + 1) + '" class="cart-item">' +
                '<div id="cart-item-' + parseInt(i + 1) + '-name" class="cart-item-name">' + currentCartArray[i].product + '</div>' +
                '<div class="cart-item-flavor">' +
                '<div class="cart-item-flavor-text">Flavor:</div>' +
                '<div class="cart-item-flavor-select">' +
                '<select id="cart-item-' + parseInt(i + 1) + '-flavor-select" onchange="cartChangeFlavor(this)">' +
                '<option value="none"' + flavorDict["none"] + '>None</option>' +
                '<option value="sugarmilk"' + flavorDict["sugarmilk"] + '>Sugar-milk</option>' +
                '<option value="vanillamilk"' + flavorDict["vanillamilk"] + '>Vanilla-milk</option>' +
                '<option value="doublechocolate"' + flavorDict["doublechocolate"] + '>Double-chocolate</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '<div class="cart-item-quantity">' +
                '<div class="cart-item-quantity-text">Quantity:</div>' +
                '<div class="cart-item-quantity-select">' +
                '<select id="cart-item-' + parseInt(i + 1) + '-quantity-select" onchange="cartChangeQuantity(this)">' +
                '<option value="1"' + quantityDict["1"] +'>1</option>' +
                '<option value="3"' + quantityDict["3"] +'>3</option>' +
                '<option value="6"' + quantityDict["6"] +'>6</option>' +
                '<option value="12"' + quantityDict["12"] +'>12</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '<div id="cart-item-' + parseInt(i + 1) + '-price" class="cart-item-price">' + '$' + currentCartArray[i].price + '</div>' +
                '<button id="cart-item-' + parseInt(i + 1) + '-delete" class="cart-item-delete" onclick="cartDelete(this)"><i class="fas fa-times"></i></button>' +
                '</div>';
            cart.innerHTML += content;
            flavorDict[currentCartArray[i].flavor] = "";
            flavorDict[currentCartArray[i].quantity] = "";
            updateCartPrice();
        }
    }
}