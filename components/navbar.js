const navbar = () => {
  return `

  <div class="account" >
  <a href="signin.html" class="Account"> <span class="material-symbols-outlined" > person </span>
  <div style="color:white;"id="username">
  <div>Sign in</div>
  </div>
  </a>
</div>

<div class="logo">
<h1><a href="index.html" class="header_logo">HAAN</a> </h1>
<span class="material-symbols-outlined" style="color: teal; font-size: 2.2rem;">
  temp_preferences_eco
</span>
</div>
   <nav class="nav" id="nav-menu">
   <ion-icon name="close" class="header_close" id="close-menu"></ion-icon>

   <ul class="nav_list">
     <li class="nav_item"><a href="product.html" class="nav_link">Shop</a></li>
     <li class="nav_item"><a href="wishlist.html" class="nav_link">Collection</a></li>
     <li class="nav_item"><a href="about.html" class="nav_link">About Us</a></li>
     <li class="nav_item">
       <a href="" class="nav_link">Sobremesa Talks</a>
     </li>
     <li class="nav_item">
       <a href="" class="nav_link">Refill Station</a>
     </li>

     <h1 class="nav_item">
       <a href="" class="nav_link"><ion-icon name="search">🔎</ion-icon></a>
     </h1>
     <h1 class="nav_item heart">
       <a href="wishlist.html" class="nav_link"><ion-icon name="heart">❤️</ion-icon></a>
     </h1>
     <h1 class="nav_item">
       <a class="nav_link"><ion-icon name="cart" onclick="showhaanCart()">🧺</ion-icon></a>
     </h1>
   </ul>
 </nav>
   

   <ion-icon name="menu" class="header_toggle" id="toggle-menu" ></ion-icon>

`;
};

const navBar = (document.getElementById("navHeader").innerHTML = navbar());
