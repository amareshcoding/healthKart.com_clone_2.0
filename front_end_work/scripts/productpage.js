// let product_profile_data = JSON.parse(localStorage.getItem("product_profile_data")) || [];


//cart length
async function fetch_and_update_cart() {
  try {
    let url = `http://localhost:4500/cart`;
    let responce = await fetch(url);
    let data = await responce.json();
    // console.log(data);
    document.getElementById("cart_quantity").innerText = data.length;
  } catch (err) {
    console.log(err);
  }
}
fetch_and_update_cart();


//fetch to show products
fetch_product_list_1();
async function fetch_product_list_1() {
  let url = `http://localhost:4500/product`;
  try {
    let responce = await fetch(url);
    let data = await responce.json();

    appendFucn(data);
  } catch (err) {
    console.log(err);
  }
}

function appendFucn(productArr) {
  let div_product = document.getElementById("product");
     //   console.log(productArr);
  productArr.forEach(function (products) {
    let div = document.createElement("div");
    let price = document.createElement("div");

    let name = document.createElement("h4");
    name.innerText = products.name;

    let price1 = document.createElement("b");
    price.innerText = "₹" + products.price;

    let button = document.createElement("button");
    button.innerHTML = "🛒 ADD";
    button.addEventListener("click", async function () {
      try {
        let obj = {
          title: products.title,
          name: products.name,
          discount: products.discount,
          price: products.price,
          avtar: products.avtar,
          rating: products.rating,
          premiumprice: products.premiumprice,
        };
        await fetch("http://localhost:4500/cart", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify(obj), // body data type must match "Content-Type" header
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.log(error);
      }
      async function fetch_and_update_cart() {
        try {
          let url = `http://localhost:4500/cart`;
          let responce = await fetch(url);
          let data = await responce.json();
          // console.log(data);
          document.getElementById("cart_quantity").innerText = data.length;
        } catch (err) {
          console.log(err);
        }
      }
      fetch_and_update_cart();

    });

    let discount = document.createElement("h5");
    discount.innerText = products.discount;

    let image = document.createElement("img");
    image.src = products.avtar;
    image.addEventListener("click", async()=>{
      try {
        let obj = {
          title: products.title,
          name: products.name,
          discount: products.discount,
          price: products.price,
          avtar: products.avtar,
          rating: products.rating,
          premiumprice: products.premiumprice,
        };
        
        await fetch("http://localhost:4500/productprofile", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify(obj), // body data type must match "Content-Type" header
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.log(error);
      }
      window.location.href = "product_profile.html";
    })

    let premiumprice1 = document.createElement("h6");
    premiumprice1.innerText = products.premiumprice + " 🔒";

    let rating = document.createElement("img");
    rating.innerHTML = "★ " + products.rating;

    price.append(price1, button);
    div.append(image, discount, name, rating, price, premiumprice1);
    div_product.append(div);
  });
}

let select_opt = document.getElementById("select");

select_opt.addEventListener("change", sortFunc);
function sortFunc() {
  if (select_opt.value == "1") {
    let lthArr = productData.sort((a, b) => a.rate - b.rate);
    appendFucn(lthArr);
    console.log(lthArr);
  } else if (select_opt.value == "2") {
    let htlArr = productData.sort((a, b) => b.rate - a.rate);
    appendFucn(htlArr);
    console.log(htlArr);
  }
}

