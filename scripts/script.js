// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  myStorage = window.localStorage;

  if(myStorage.getItem("items") == null)
  {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => myStorage.setItem("items", JSON.stringify(data)))
  }

  let cart = 0;

  if(myStorage.getItem("count") == null)
  {
    myStorage.setItem("count", cart);
  }else if(myStorage.getItem("count") != null)
  {
    cart = myStorage.getItem("count");
    document.getElementById('cart-count').innerHTML = cart; 
  }

  let products = JSON.parse(myStorage.getItem("items"));
  for(let i = 0; i < products.length; i++)
  {
    let curr = products[i];
    let item = document.createElement("product-item");
    const shadow = item.shadowRoot;

    shadow.querySelector('.price').textContent = "$" + curr.price;
    shadow.querySelector('.title').textContent = curr.title;
    shadow.querySelector('img').src = curr.image;
    shadow.querySelector('img').alt = curr.title;
    shadow.querySelector('button').id = i;

    if(localStorage.getItem(i) != null)
    {
      shadow.querySelector('button').setAttribute('add', true);
      shadow.querySelector('button').textContent = "Remove From Cart";
    }

     shadow.querySelector('button').onclick = function(){ChangeCart(this)}
    document.getElementById('product-list').appendChild(item);
  }

  function ChangeCart(item)
  {
    if(item.getAttribute('add') == "false")
    {
      alert("Added to Cart!");
      cart++;
      myStorage.setItem("count", cart);
      document.getElementById("cart-count").innerHTML = cart;
      item.textContent = "Remove from Cart"
      item.setAttribute('add', true); 
      myStorage.setItem(item.id, "in cart");
    }else if(item.getAttribute('add') == "true"){
      alert("Remove from Cart!");
      cart--;
      myStorage.setItem("count", cart);
      document.getElementById("cart-count").innerHTML = cart;
      item.textContent = "Add To Cart"
      item.setAttribute('add', false);
      myStorage.removeItem(item.id);
    }
  }
});