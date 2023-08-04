document.querySelector("button").addEventListener("click", check);
var cart = JSON.parse(localStorage.getItem("cartItems")) || [];


function getPrdouctCard(productName, productQty, discountPrice, productImage, index) {
  return `
  <div style="border-radius: 10px; border: 1px solid rgb(0 19 37 / 8%); margin: 15px;">
        <div style="display: flex; justify-content: space-between; padding: 10px;">
          <div style="display: flex;">
            <div style="width: 40%; overflow: hidden;">
              <img style="width: 100%;" src="${productImage}">
            </div>
            <div style="width: 60%; padding: 0 10px; text-align: left; font-size: 14px; color:white;">
              <div>${productName}</div>
              <div></div>
            </div>
          </div>
          <div>
            <i onclick="delrow(${index})"class="fa fa-trash" style="cursor: pointer; color: white; font-size: 16px;"></i>
          </div>
        </div>
        <div style="padding: 0px 5px;">
          <hr style="border: none; border-bottom: 1px solid rgb(112 112 112 / 19%);">
        <div style="display: flex; justify-content: space-between;padding: 10px;">
          <div style="color:white; font-size: 16px;">
            Quantity : <span class="productQty"><select onchange="updateQty(event, ${index})" style="border: none;outline: none;font-size: 18px;">
                <option ${productQty === 1 ? "selected" : ""} value="1">1</option>
                <option ${productQty === 2 ? "selected" : ""} value="2">2</option>
                <option ${productQty === 3 ? "selected" : ""} value="3">3</option>
                <option ${productQty === 4 ? "selected" : ""} value="4">4</option>
                <option ${productQty === 5 ? "selected" : ""} value="5">5</option>
              </select>
            </span>
          </div>
          <div style="color: white; font-size: 16px; font-weight: 600;">
             <span class="discountPrice" >₹${discountPrice}</span>
          </div>
        </div>
        </div>
      </div>`;
}

const couponHTML = `
<div id="Offer">    
      <div style="text-align: center;">
        <div id="trp">
          <p> Coupons </p>
          <span class="material-symbols-outlined" style=color:white;>
          percent
          </span> 
          <g id="Group_334290" data-name="Group 334290" transform="translate(7899 572)">
            <rect id="Rectangle_114329" data-name="Rectangle 114329" width="28" height="28" transform="translate(-7899 -572)" fill="none"></rect>
            <path id="Union_39" data-name="Union 39" d="M1254.15-20139.615l-.511-.6a1.267,1.267,0,0,0-1.245-.4l-.764.182a2.748,2.748,0,0,1-3.38-2.453l-.061-.785a1.243,1.243,0,0,0-.769-1.053l-.724-.3a2.748,2.748,0,0,1-1.29-3.973l.41-.674a1.259,1.259,0,0,0,0-1.3l-.41-.668a2.747,2.747,0,0,1,1.29-3.973l.724-.3a1.244,1.244,0,0,0,.769-1.059l.061-.783a2.755,2.755,0,0,1,3.38-2.455l.764.182a1.256,1.256,0,0,0,1.245-.4l.511-.6a2.747,2.747,0,0,1,4.18,0l.506.6a1.259,1.259,0,0,0,1.245.4l.764-.182a2.755,2.755,0,0,1,3.38,2.455l.061.783a1.244,1.244,0,0,0,.769,1.059l.724.3a2.747,2.747,0,0,1,1.29,3.973l-.41.668a1.259,1.259,0,0,0,0,1.3l.41.674a2.748,2.748,0,0,1-1.29,3.973l-.724.3a1.243,1.243,0,0,0-.769,1.053l-.061.785a2.748,2.748,0,0,1-3.38,2.453l-.764-.182a1.271,1.271,0,0,0-1.245.4l-.506.6a2.735,2.735,0,0,1-2.09.963A2.736,2.736,0,0,1,1254.15-20139.615Zm.627-1.574.511.6a1.244,1.244,0,0,0,1.9,0l.511-.6a2.756,2.756,0,0,1,2.732-.885l.764.182a1.245,1.245,0,0,0,1.533-1.113l.066-.785a2.738,2.738,0,0,1,1.685-2.322l.724-.3a1.246,1.246,0,0,0,.587-1.807l-.41-.668a2.759,2.759,0,0,1,0-2.869l.41-.674a1.248,1.248,0,0,0-.587-1.807l-.724-.3a2.753,2.753,0,0,1-1.685-2.324l-.066-.783a1.252,1.252,0,0,0-1.533-1.119l-.764.188a2.759,2.759,0,0,1-2.732-.891l-.511-.6a1.249,1.249,0,0,0-1.9,0l-.511.6a2.754,2.754,0,0,1-2.727.891l-.764-.187a1.254,1.254,0,0,0-1.538,1.119l-.061.783a2.777,2.777,0,0,1-1.69,2.324l-.724.3a1.251,1.251,0,0,0-.587,1.807l.41.674a2.759,2.759,0,0,1,0,2.869l-.41.668a1.25,1.25,0,0,0,.587,1.807l.724.3a2.761,2.761,0,0,1,1.69,2.322l.061.785a1.247,1.247,0,0,0,1.538,1.113l.764-.182a2.733,2.733,0,0,1,.638-.076A2.752,2.752,0,0,1,1254.777-20141.189Zm-2.07-5.607a.744.744,0,0,1,0-1.057l6-6a.746.746,0,0,1,1.058,0,.746.746,0,0,1,0,1.059l-6,6a.73.73,0,0,1-.527.221A.742.742,0,0,1,1252.708-20146.8Zm5.677-1.031a1,1,0,0,1,1-1,1,1,0,0,1,1,1,1,1,0,0,1-1,1A1,1,0,0,1,1258.385-20147.828Zm-6-5a1,1,0,0,1,1-1,1,1,0,0,1,1,1,1,1,0,0,1-1,1A1,1,0,0,1,1252.384-20152.828Z" transform="translate(-9141.001 19591.826)" fill="#1A2024" stroke="#000000" stroke-miterlimit="10" stroke-width="1" stroke-opacity="0"></path>
          </g>
        </svg>
        </svg>
        </div>
        <input placeholder="Enter Coupon Code" type="text" id="promo" style="margin-bottom:50%;">
        <button onclick="check()">Apply</button>
      </div> <br>
    </div>
`;


function updateQty(event, position) {
  var cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  cart.forEach((item, index) => {
    if (index === position) {
      item.productQty = parseInt(event.target.value);
    }
  });
  localStorage.setItem("cartItems", JSON.stringify(cart))
  displayCart(cart);
  caltotal(cart);
  displayCartItemsCount(cart);
}
var itemscount = localStorage.getItem("countitem")
function displayCartItemsCount(cart) {
  var cartItemsCount = cart && cart.length;
  var cartCountValue = "";

   if  (cartItemsCount === 0) {
    cartCountValue = "• No item";
  }

  else if  (cartItemsCount === 1) {
    cartCountValue = " 1 item";

  } else if (cartItemsCount > 1) {
    cartCountValue = " " + cartItemsCount + " items";

  }
  document.getElementById("per").innerHTML = cartCountValue;
  localStorage.setItem("countitem", cartCountValue)
}



function displayCart(cart) {
  document.querySelector("#bagItems").innerHTML = "";
  cart.map(function (elem, index) {
    var card = getPrdouctCard(elem.name, elem.productQty || 1, elem.price, elem.img, index);
    var div = document.createElement("div");
    div.innerHTML = card;
    document.querySelector("#bagItems").append(div);
  });
  if (cart && cart.length) {
    var couponDiv = document.createElement("div")
    couponDiv.innerHTML = couponHTML;
    document.querySelector("#bagItems").append(couponDiv);
  }
}

function delrow(index) {
  var cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  cart = cart.filter((item, i) => i !== index);
  localStorage.setItem("cartItems", JSON.stringify(cart))
  displayCart(cart);
  caltotal(cart);
  displayCartItemsCount(cart);
  if (cart.length === 0) {
    document.getElementById("grandTotalParent").style.display = "none";
    document.getElementById("child").style.display = "block";
    document.getElementById("pngImage").style.display = "none";
    var offerElement = document.getElementById("Offer");
    if (offerElement)
      offerElement.style.display = "none";
  }
}
var pert = localStorage.getItem("cartvalue");
function caltotal() {
  var cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  var carval = 0;
  for (var i = 0; i < cart.length; i++) {
    carval += parseInt(cart[i].price) * (cart[i] && cart[i].productQty || 1);

  }
  document.getElementById("grandTotalPrice").textContent = carval;
  localStorage.setItem("cartvalue", carval);

}

function check() {
  var cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  var total = 0;
  cart.forEach((item) => {
    total = total + Number(item.price);
  });

  //------------------------------------------------------------------------- for  discount------------------------------------------------------------------------------------------ 

  var ch = document.getElementById("promo").value;
  if (ch == "Haan10") {
    var temp = document.createElement("p");
    temp.setAttribute("class", "krp");

    // alert(temp = " 25% off applied");
    Swal.fire({
      title: 'Hurray!!! 🎉 30% off applied..',
      confirmButtonColor: 'black',
      showClass: {
        popup: 'animate_animated animate_fadeInDown'
      },
      hideClass: {
        popup: 'animate_animated animate_fadeOutUp'
      }
    })

    var change = (total * 3) / 10;
    document.getElementById("grandTotalPrice").textContent = total - change;
  }
}

//------------------------------------------------------------------------------ for calling cart---------------------------------------------------------------------------------------------------------------------------------------------------------------
function showhaanCart() {
    console.log(`hiii`);
  var cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  var offerElement = document.getElementById("Offer");
  if (cart && cart.length > 0) {
    document.getElementById("child").style.display = "none";
    document.getElementById("grandTotalParent").style.display = "block";
    document.getElementById("pngImage").style.display = "block";
   
    if (offerElement)
      document.getElementById("Offer").style.display = "block";
  } else {
    document.getElementById("grandTotalParent").style.display = "none";
    document.getElementById("child").style.display = "block";
    document.getElementById("pngImage").style.display = "none";

    if (offerElement)
      document.getElementById("Offer").style.display = "none";
      document.getElementById("pngImage").style.display = "none";
  }
  var cartelements = document.getElementsByClassName("haanCart");
  for (let i = 0; i < cartelements.length; i++) {
    var element = cartelements[i];
    if (element.style.display === "block") {
      element.style.display = "none";
      document.querySelector(".haancartinnerdiv").style.display = "none";
    } else {
      displayCartItemsCount(cart);
      caltotal(cart)
      displayCart(cart);
      element.style.display = "block";

      if (element.id === "haantcartdiv") {
        setTimeout(() => {
          document.querySelector(".haancartinnerdiv").style.display = "block";
        }, 10);
      }
    }
  };
}