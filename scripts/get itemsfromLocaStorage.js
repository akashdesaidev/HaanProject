// subTotal(0);

function caltotal(Array) {
  let total = 0;
  for (let i = 0; i < Array.length; i++) {
    total += Array[i].quantity * Array[i].price;
  }
  document.querySelector("#subTotal").innerText = total;
  // document.getElementById("grandTotalPrice").textContent = total;
  return total;
}

async function fetchCartList() {
  const URL = `http://localhost:3000`;
  let token = JSON.parse(getCookie("token"));
  const res = fetch(`${URL}/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      // DisplayCartData(result);
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.error("Error during getWishList:", error.message);
      throw error;
    });

  return res;
}

setTimeout(async () => {
  const cart = await fetchCartList();
  showData(cart);
  Total(cart);
}, 100);

async function showData(cart) {
  let ProductList = document.querySelector("#productList");
  ProductList.innerHTML = "";
  let items = cart;
  items.map(function (e) {
    let div = document.createElement("div");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let price = document.createElement("h2");
    let img = document.createElement("img");
    let product = document.createElement("h2");

    img.src = e.img;
    product.innerText = e.name + "=> " + e.quantity + "*" + e.price;
    // div2.innerText=e.pack;
    // div2.classList="quantity";
    div1.append(div2, img, product);
    price.innerText = e.quantity * e.price;
    div.append(div1, price);
    ProductList.append(div);
  });
}
// function subTotal(Discount) {
//   let subTotal = document.querySelector("#subTotal");

//   let DiscountAmount = (sum * 30) / 100;

//   //  sum= sum-DiscountAmount;
//   subTotal.innerText = sum;
// }

function Total(cart) {
  const total = caltotal(cart);
  console.log(total);
  let subTotal = Number(document.querySelector("#subTotal").innerText);
  subTotal.innerText = total;
  let shipping = document.querySelector("#shipping");
  shipping.innerText="₹ " +" "+`0`;
  let Discount = Number(document.querySelector("#Discount").innerText);
  let Total = document.querySelector("#Total");
  Total.innerText = null;
  Total.innerText = "₹ " +" "+`${ total - (total / 100) * 20}`;
  document.getElementById("Discount").innerText = (total / 100) * 20;
}

document.getElementById("DiscountButton").addEventListener("click", Discount);
function Discount() {
  let coupon = document.getElementById("Coupon").value;

  let discountVal = Number(localStorage.getItem(coupon));

  subTotal(discountVal);
  Total();
}
