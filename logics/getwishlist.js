const URL = "http://localhost:3000";
let pMainContainer = document.getElementById("ans-main-product-container");

const fetchWishList = () => {
  let token = JSON.parse(getCookie("token"));
  fetch(`${URL}/wishlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      displayData(result);
    })
    .catch((error) => {
      console.error("Error during getWishList:", error.message);
      throw error;
    });
};

const RemoveFromWishList = (id) => {
  let token = JSON.parse(getCookie("token"));
  fetch(`${URL}/wishlist/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      displayData(result);
    })
    .catch((error) => {
      console.error("Error during getWishList:", error.message);
      throw error;
    });
};

const displayData = (data) => {
  pMainContainer.innerHTML = null;

  let productsList = document.createElement("div");
  productsList.setAttribute("class", "ans-product-list");

  if (data.length !== 0) {
    data.forEach((element, index) => {
      let productCard = document.createElement("div");
      productCard.setAttribute("class", "ans-product-card");
      let productImg = document.createElement("div");
      productImg.setAttribute("class", "prodct-img-cont");
      let img = document.createElement("img");

      let productBody = document.createElement("div");
      productBody.setAttribute("class", "prodct-body");
      let h3 = document.createElement("h3");
      h3.setAttribute("class", "product-name");
      let dp = document.createElement("p");
      let op = document.createElement("p");

      let wish_cart_cont = document.createElement("div");
      wish_cart_cont.setAttribute("class", "wish_cart_cont");
      // wish_cart_cont.innerHTML = `<ion-icon id="ion-icon" name="heart-outline"></ion-icon>`
      let ion_icon = document.createElement("ion-icon");
      ion_icon.setAttribute("name", "trash-outline");
      ion_icon.setAttribute("id", "ion-icon");
      ion_icon.style.marginBottom = "-12px";
      let cardBtn = document.createElement("button");
      cardBtn.setAttribute("class", "ans-btn");

      cardBtn.textContent = "Add to Cart";

      img.src = element.img;
      h3.textContent = element.name;
      dp.textContent = "₹" + element.discounted_price;
      op.textContent = "₹" + element.price;
      op.setAttribute("id", "p-or-price");
      productImg.append(img);
      wish_cart_cont.append(ion_icon, cardBtn);
      productBody.append(h3, dp, op, wish_cart_cont);
      productCard.append(productImg, productBody);
      productsList.append(productCard);

      h3.style.cursor = "pointer";
      h3.addEventListener("click", function () {
        localStorage.setItem("product-det", JSON.stringify(element));
        window.location.href = "product-description.html";

        let filteredSimilarProducts = fetchedData.filter((el) => {
          return el.category === element.category && el.pack === element.pack;
        });
        localStorage.setItem(
          "similar-products-db",
          JSON.stringify(filteredSimilarProducts)
        );
      });

      img.style.cursor = "pointer";
      img.addEventListener("click", function () {
        localStorage.setItem("product-det", JSON.stringify(element));
        window.location.href = "product-description.html";

        let filteredSimilarProducts = fetchedData.filter((el) => {
          return el.category === element.category && el.pack === element.pack;
        });
        localStorage.setItem(
          "similar-products-db",
          JSON.stringify(filteredSimilarProducts)
        );
      });

      ion_icon.addEventListener("click", function () {
        //delete call
        RemoveFromWishList(element.id);
      });

      cardBtn.addEventListener("click", function () {
        let isProductAlreadyPresent = false;
        if (lsArr.length > 0) {
          lsArr.forEach((item) => {
            if (item.id === element.id) {
              isProductAlreadyPresent = true;
              return;
            }
          });
        }
        if (isProductAlreadyPresent) {
          // alert("Product is already present in the cart.");
          Swal.fire({
            title: "Product is already present in the cart.",
            confirmButtonColor: "black",
            showClass: {
              popup: "animate_animated animate_fadeInDown",
            },
            hideClass: {
              popup: "animate_animated animate_fadeOutUp",
            },
          });
        } else {
          lsArr.push(element);
          localStorage.setItem("cartItems", JSON.stringify(lsArr));
          // alert("Product added to cart successfully.");
          Swal.fire({
            title: "Product added to cart successfully..",
            confirmButtonColor: "black",
            showClass: {
              popup: "animate_animated animate_fadeInDown",
            },
            hideClass: {
              popup: "animate_animated animate_fadeOutUp",
            },
          });
        }
      });
      cardBtn.style.cursor = "pointer";
    });
    pMainContainer.append(productsList);
  } else {
    pMainContainer.innerHTML = `<div style="display: flex; justify-content: center; width: 100%;">
<img src="HAAN-img/Wishlist.png" alt="Empty!">
</div>
`;
  }
};

document.getElementById("ans-main-product-container").innerHTML = `
<div id="loading-img-cont">
    <img src="HAAN-img/Wishlist.png" alt="">
</div>`;



fetchWishList();
