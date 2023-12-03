function getUserDetails() {
  let CookiesToken = getCookie("token");

  var jwtToken = CookiesToken.split(" ")[1];

  if (!jwtToken) {
    return;
  }

  const [header, payload, signature] = jwtToken.split(".");
  const decodedHeader = JSON.parse(atob(header));
  const decodedPayload = JSON.parse(atob(payload));
  const user = decodedPayload.user;
  console.log(user);
  return user;
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

const user = getUserDetails();
console.log(user);

const btn = document.createElement("div");
btn.addEventListener("click", () => {
  document.cookie = `token=""; expires=""}; path=/`;
  btn.innerText = "Sign in";
});
btn.innerText = user.username;
const navUser = document.getElementById("username");

navUser.innerHTML = "";
navUser.append(btn);

if (!user) {
  window.location.href = "signin.html";
}
