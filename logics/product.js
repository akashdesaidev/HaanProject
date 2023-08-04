let filterText = document.getElementById("ans-filter");
filterText.style.cursor = "pointer"
filterText.addEventListener("click", function () {
    let filterDiv = document.getElementById("ans-filter-div");
    let computedStyle = window.getComputedStyle(filterDiv);

    if (computedStyle.display === "none") {
        filterDiv.style.display = "block";
    } else {
        filterDiv.style.display = "none";
    }
});

let sortText = document.getElementById("ans-sort");
sortText.style.cursor = "pointer"
sortText.addEventListener("click", function () {
    let sortDiv = document.getElementById("ans-sort-div");
    let computedStyle = window.getComputedStyle(sortDiv);
    if (computedStyle.display === "none") {
        sortDiv.style.display = "block";
    } else {
        sortDiv.style.display = "none";
    }
});

// -----------------------------------------------------------------------------------------

let totalPages = null;
let pageLimit = 12;
let pageNumber = 1;
let fetchedData = null;
const fetchProducts = async (pageNum) => {
    try {
        // let result = await fetch(`http://localhost:3000/products`);
        let result = await fetch(`https://witty-shawl-hare.cyclic.app/products`)
        fetchedData = await result.json();

        // let res = await fetch(
        //     `http://localhost:3000/products?_limit=${pageLimit}&_page=${pageNum}`
        // );
        let res = await fetch(`https://witty-shawl-hare.cyclic.app/products?_limit=${pageLimit}&_page=${pageNum}`)
        let data = await res.json();
        // fetchedData = data;
        console.log(data);
        // let totalItems = data.length;
        let totalItems = res.headers.get("X-Total-Count");
        console.log("total items : " + totalItems);
        totalPages = Math.ceil(totalItems / pageLimit);
        console.log("total-pages : " + totalPages);
        // console.log(totalItems);

        document.getElementById("ans-main-product-container").innerHTML = `
            <div id="loading-img-cont">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" alt="">
            </div>`;

        setTimeout(() => {
            displayData(data);
        }, 1000);
    } catch (error) {
        console.log(error);
    }
};
fetchProducts(pageNumber);



// debouncing part
let id;
const debounce = () => {
    if(id){
        clearTimeout(id);
    }
    id = setTimeout( ()=> {
        debounceFetch()
    }, 1000)
}

const debounceFetch = async () => {
    try {
        let input = document.getElementById("search-input").value
        let res = await fetch(`https://witty-shawl-hare.cyclic.app/products?q=${input}`)
        let data = await res.json();
        console.log(data)
        document.getElementById("ans-main-product-container").innerHTML = `
        <div id="loading-img-cont">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" alt="">
        </div>`;

    setTimeout(() => {
        displayData(data);
    }, 1000);
    } catch (error) {
        console.log(error)
    }
}

//filtering part

// category
let filteredData = null;
let hanChk = document.getElementById("c-handsanitizer");
let caseChk = document.getElementById("c-case");
let comboPack = document.getElementById("p-combo");
hanChk.addEventListener("change", function () {
    if (hanChk.checked) {
        caseChk.disabled = true;
        comboPack.disabled = true;
        filteredData = fetchedData.filter((el) => {
            return el.category === "sanitizer";
        });

        // console.log(filteredData)
    } else {
        caseChk.disabled = false;
        comboPack.disabled = false;
        filteredData = null;
    }
});
caseChk.addEventListener("change", function () {
    if (caseChk.checked) {
        hanChk.disabled = true;
        comboPack.disabled = true;
        if (filteredData != null) {
            filteredData = filteredData.filter((el) => {
                return el.category === "case";
            });
        } else {
            filteredData = fetchedData.filter((el) => {
                return el.category === "case";
            });
        }
    } else {
        hanChk.disabled = false;
        comboPack.disabled = false;
        filteredData = null;
    }
});
comboPack.addEventListener("change", function () {
    if (comboPack.checked) {
        hanChk.disabled = true;
        caseChk.disabled = true;
        filteredData = fetchedData.filter((el) => {
            return el.pack === 2 || el.pack === 3;
        });
    } else {
        hanChk.disabled = false;
        caseChk.disabled = false;
        filteredData = null;
    }
});

// price
let inpPrice = document.getElementById("product-price");
inpPrice.addEventListener("input", function () {
    inpPriceValue = inpPrice.value;
    if (filteredData != null) {
        filteredData = filteredData.filter((el) => {
            return el.discounted_price > inpPriceValue;
        });
    } else {
        filteredData = fetchedData.filter((el) => {
            return el.discounted_price > inpPriceValue;
        });
    }

    filteredData = filteredData.sort((x, y) => {
        return x.discounted_price - y.discounted_price;
    });
});

let filterBtn = document.getElementById("ans-filter-btn");
filterBtn.addEventListener("click", function () {
    if (filteredData !== null) {
        displayData(filteredData);
        document.getElementById("ans-filter-div").style.display = "none";
        document.getElementById("ans-pagination-btns").style.display = "none";
    }
});

// sorting part
let sortedData = null;
let sortBtn = document.getElementById("ans-sort-btn");
let ascendingChk = document.getElementById("p-ascending");
let descendingChk = document.getElementById("p-descending");
let az = document.getElementById("a-z");
let za = document.getElementById("z-a");

ascendingChk.addEventListener("change", function () {
    if (ascendingChk.checked) {
        descendingChk.disabled = true;
        az.disabled = true;
        za.disabled = true;
        sortedData = fetchedData.sort((x, y) => {
            return x.discounted_price - y.discounted_price;
        });
        console.log(sortedData);
    } else {
        descendingChk.disabled = false;
        az.disabled = false;
        za.disabled = false;
        sortedData = null;
    }
});

descendingChk.addEventListener("change", function () {
    if (descendingChk.checked) {
        ascendingChk.disabled = true;
        az.disabled = true;
        za.disabled = true;
        sortedData = fetchedData.sort((x, y) => {
            return y.discounted_price - x.discounted_price;
        });
        console.log(sortedData);
    } else {
        ascendingChk.disabled = false;
        az.disabled = false;
        za.disabled = false;
        sortedData = null;
    }
});

az.addEventListener("change", function () {
    if (az.checked) {
        ascendingChk.disabled = true;
        descendingChk.disabled = true;
        za.disabled = true;
        sortedData = fetchedData.sort((x, y) => {
            if (x.name > y.name) return 1;
            if (x.name < y.name) return -1;
            return 0;
        });
        console.log(sortedData);
    } else {
        ascendingChk.disabled = false;
        descendingChk.disabled = false;
        za.disabled = false;
        sortedData = null;
    }
});

za.addEventListener("change", function () {
    if (za.checked) {
        ascendingChk.disabled = true;
        descendingChk.disabled = true;
        az.disabled = true;
        sortedData = fetchedData.sort((x, y) => {
            if (x.name > y.name) return -1;
            if (x.name < y.name) return 1;
            return 0;
        });
        console.log(sortedData);
    } else {
        ascendingChk.disabled = false;
        descendingChk.disabled = false;
        az.disabled = false;
        sortedData = null;
    }
});
sortBtn.addEventListener("click", function () {
    if (sortedData !== null) {
        displayData(sortedData);
        document.getElementById("ans-sort-div").style.display = "none";
        document.getElementById("ans-pagination-btns").style.display = "none";
    }
});

// pagination part
let pageNumberText = document.getElementById("ans-page-num");
pageNumberText.textContent = pageNumber;
let prevBtn = document.getElementById("ans-previous-btn");
prevBtn.disabled = true;

let nextBtn = document.getElementById("ans-next-btn");
nextBtn.addEventListener("click", function () {
    pageNumber++;
    prevBtn.disabled = false;
    if (pageNumber === totalPages) {
        nextBtn.disabled = true;
    }
    pageNumberText.textContent = pageNumber;
    window.location.href = "#ans-main-product-container";
    fetchProducts(pageNumber);
});

prevBtn.addEventListener("click", function () {
    pageNumber--;
    nextBtn.disabled = false;
    if (pageNumber === 1) {
        prevBtn.disabled = true;
    }
    pageNumberText.textContent = pageNumber;
    window.location.href = "#ans-main-product-container";
    fetchProducts(pageNumber);
});

let lsArr = JSON.parse(localStorage.getItem("cartItems")) || [];
let wlArr = JSON.parse(localStorage.getItem("cart-wish-db")) || [];
const displayData = (data) => {
    let pMainContainer = document.getElementById("ans-main-product-container");
    pMainContainer.innerHTML = null;

    let productsList = document.createElement("div");
    productsList.setAttribute("class", "ans-product-list");

    data.forEach((element) => {
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

        let wish_cart_cont = document.createElement("div")
        wish_cart_cont.setAttribute("class", "wish_cart_cont")
        // wish_cart_cont.innerHTML = `<ion-icon id="ion-icon" name="heart-outline"></ion-icon>`
        let ion_icon = document.createElement("ion-icon")
        ion_icon.setAttribute("name", "heart")
        ion_icon.setAttribute("id", "ion-icon")
        ion_icon.style.marginBottom = "-12px"
        let cardBtn = document.createElement("button");
        cardBtn.setAttribute("class", "ans-btn");
        
        cardBtn.textContent = "Add to Cart";

        img.src = element.img;
        h3.textContent = element.name;
        dp.textContent = "₹" + element.discounted_price;
        op.textContent = "₹" + element.price;
        op.setAttribute("id", "p-or-price");
        productImg.append(img);
        wish_cart_cont.append( ion_icon ,cardBtn)
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

        ion_icon.addEventListener("click", function(){
            let isProductAlreadyPresent = false;
            if (wlArr.length > 0) {
                wlArr.forEach((item) => {
                    if (item.id === element.id) {
                        isProductAlreadyPresent = true;
                        return; 
                    }
                });
            }
            if (isProductAlreadyPresent) {
                // alert("Product is already present in your wishlist.");
                Swal.fire({
                    title: 'Product is already present in your wishlist.',
                    confirmButtonColor: 'black',
                    showClass: {
                      popup: 'animate_animated animate_fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate_animated animate_fadeOutUp'
                    }
                  })


            } else {
                wlArr.push(element);
                localStorage.setItem("cart-wish-db", JSON.stringify(wlArr));
                // alert("Product added to your wishlist.");
                Swal.fire({
                    title: 'Product added to your wishlist.',
                    confirmButtonColor: 'black',
                    showClass: {
                      popup: 'animate_animated animate_fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate_animated animate_fadeOutUp'
                    }
                  })
            }
        })

 
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
                    title: 'Product is already present in the cart.',
                    confirmButtonColor: 'black',
                    showClass: {
                      popup: 'animate_animated animate_fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate_animated animate_fadeOutUp'
                    }
                  })
            } else {
                lsArr.push(element);
                localStorage.setItem("cartItems", JSON.stringify(lsArr));
                // alert("Product added to cart successfully.");
                Swal.fire({
                    title: 'Product added to cart successfully.',
                    confirmButtonColor: 'black',
                    showClass: {
                      popup: 'animate_animated animate_fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate_animated animate_fadeOutUp'
                    }
                  })
            }
        });
        cardBtn.style.cursor = "pointer";
    });
    pMainContainer.append(productsList);
};