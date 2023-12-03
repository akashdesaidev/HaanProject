let user = getUserDetails();
function getUserDetails() {
  let CookiesToken = getCookie("token");

  var jwtToken = CookiesToken.split(" ")[1];

  if (!jwtToken) {
    return;
  }

  const [header, payload, signature] = jwtToken.split(".");
  const decodedHeader = JSON.parse(atob(header));
  const decodedPayload = JSON.parse(atob(payload));
  let cookiesuser = decodedPayload.user;

  if (window.location == "http://localhost:5500/product.html") {
    if (!cookiesuser) {
      window.location.href = "signin.html";
    }
  }

  return cookiesuser;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}
window.getCookie = getCookie;
const btn = document.createElement("div");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  document.cookie = `token=""; expires=""}; path=/`;
  btn.innerText = "Sign in";
  const user = getUserDetails();
});

if (user) {
  btn.innerText = user.username;
}

const navUser = document.getElementById("username");

navUser.innerHTML = "";
navUser.append(btn);
