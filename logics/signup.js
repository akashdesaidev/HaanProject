const URL = `http://localhost:3000`
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// let dataArr = JSON.parse(localStorage.getItem('acc-data')) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let userName1 = username.value;
  let email1 = email.value;
  let password1 = password.value;
  let password2val = password2.value;

  const errors = validateInputs();

  if (errors.length > 0) {
    errors.forEach((error) => {
      const inputField = error.input;
      const errorMessage = error.message;
      setError(inputField, errorMessage);
    });
    return;
  }

  var dataObj = {
    name: userName1,
    email: email1,
    password: password1,
  };

  const res = SignupPost(dataObj);
});

const SignupPost = async (data) => {
  try {
    const response = await fetch(`${URL}/signup`, {
      method: "POST", // Specify the request method
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify(data), // Convert data to JSON string and include in the request body
    });

    const result = await response.json(); // Parse the JSON response
    console.log(result);

    if (result.message == "user already exist") {
      setError(email, "Email address already exists");
      return;
    }
    clearErrors();
    clearFields();
    showSuccessPopup();
    return result;
  } catch (error) {
    console.error("Error during SignupPost:", error.message);
    throw error; // Rethrow the error for the calling code to handle
  }
};

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const errors = [];

  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  if (usernameValue === "") {
    errors.push({ input: username, message: "Username is required" });
  } else {
    setSuccess(username);
  }

  if (emailValue === "") {
    errors.push({ input: email, message: "Email is required" });
  } else if (!isValidEmail(emailValue)) {
    errors.push({ input: email, message: "Provide a valid email address" });
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    errors.push({ input: password, message: "Password is required" });
  } else if (passwordValue.length < 8) {
    errors.push({
      input: password,
      message: "Password must be at least 8 characters",
    });
  } else {
    setSuccess(password);
  }

  if (password2Value === "") {
    errors.push({ input: password2, message: "Please confirm your password" });
  } else if (password2Value !== passwordValue) {
    errors.push({ input: password2, message: "Passwords don't match" });
  } else {
    setSuccess(password2);
  }

  return errors;
};

const clearErrors = () => {
  const errorElements = document.querySelectorAll(".error");
  errorElements.forEach((element) => {
    element.innerText = "";
    const inputControl = element.parentElement;
    inputControl.classList.remove("error");
  });
};

const clearFields = () => {
  username.value = "";
  email.value = "";
  password.value = "";
  password2.value = "";
};

const showSuccessPopup = () => {
  // alert('Account created successfully!');
  Swal.fire({
    title: "Account created successfully!",
    confirmButtonColor: "black",
    showClass: {
      popup: "animate_animated animate_fadeInDown",
    },
    hideClass: {
      popup: "animate_animated animate_fadeOutUp",
    },
  });
  window.location.href = "signin.html";
};