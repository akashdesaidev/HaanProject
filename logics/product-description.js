
    let productDetails = JSON.parse(localStorage.getItem("product-det"))
    console.log(productDetails)
    document.getElementById("ans-p-img").src = productDetails.img;
    document.getElementById("ans-product-name").textContent = productDetails.name;
    document.getElementById("ans-product-price").textContent = "₹" + productDetails.price;
    document.getElementById("ans-product-d-price").textContent = "₹" + productDetails.discounted_price;
    document.getElementById("scalpay-amount").textContent = "₹" + (productDetails.discounted_price / 3).toFixed(2);
    document.getElementById("ans-product-description").textContent = productDetails.description;


    let wlArr = JSON.parse(localStorage.getItem("cart-wish-db")) || [];
    let lsArr = JSON.parse(localStorage.getItem("cartItems")) || [];
    let cardBtn = document.getElementById("ans-cart-button")
    cardBtn.addEventListener("click", function () {
            let isProductAlreadyPresent = false;
            if (lsArr.length > 0) {
                lsArr.forEach((item) => {
                    if (item.id === productDetails.id) {
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
                lsArr.push(productDetails);
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

    // similar products
    const displayData = (data) => {
        let pMainContainer = document.getElementById("similar-products-cont");
        pMainContainer.innerHTML = null;

        let productsList = document.createElement("div");
        productsList.setAttribute("class", "ans-product-list");

        let count = 0
        data.forEach((element) => {
            if (count < 4) {
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

                h3.style.cursor = "pointer"
                h3.addEventListener("click", function () {
                    localStorage.setItem("product-det", JSON.stringify(element))
                    window.location.href = "product-description.html"

                    let filteredSimilarProducts = fetchedData.filter((el) => {
                        return el.category === element.category && el.pack === element.pack
                    })
                    localStorage.setItem("similar-products-db", JSON.stringify(filteredSimilarProducts))
                })

                img.style.cursor = "pointer"
                img.addEventListener("click", function () {
                    localStorage.setItem("product-det", JSON.stringify(element))
                    window.location.href = "product-description.html"

                    let filteredSimilarProducts = fetchedData.filter((el) => {
                        return el.category === element.category && el.pack === element.pack
                    })
                    localStorage.setItem("similar-products-db", JSON.stringify(filteredSimilarProducts))
                })

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
                        

                    } 
                    else {
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

                count++;
            } //---- else e
            else {
                return;
            }
        });

        pMainContainer.append(productsList);
    };

    let similarProducts = JSON.parse(localStorage.getItem("similar-products-db"));
    console.log(similarProducts)
    displayData(similarProducts)
