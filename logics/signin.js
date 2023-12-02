const URL = `http://localhost:3000`;
const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
let token = JSON.parse(localStorage.getItem("token")) || "";
let dataArr = JSON.parse(localStorage.getItem("acc-data")) || [];

const SignInPost = async (data) => {
  try {
    const response = await fetch(`${URL}/login`, {
      method: "POST", // Specify the request method
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify(data), // Convert data to JSON string and include in the request body
    });

    const result = await response.json(); // Parse the JSON response

    localStorage.setItem("token", JSON.stringify(`Bearer ${result.token}`));
    return result;
  } catch (error) {
    console.error("Error during SignupPost:", error.message);
    throw error; // Rethrow the error for the calling code to handle
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  const errors = validateInputs();

  if (errors.length > 0) {
    errors.forEach((error) => {
      const inputField = error.input;
      const errorMessage = error.message;
      setError(inputField, errorMessage);
    });
    return;
  }

  const user = {
    email: emailValue,
    password: passwordValue,
  };

  var response = await SignInPost(user);
  console.log(response);
  if (response.token) {
    //   // alert('Sign in Successful');
    Swal.fire({
      title: "Sign in Successful",
      confirmButtonColor: "black",
      showClass: {
        popup: "animate_animated animate_fadeInDown",
      },
      hideClass: {
        popup: "animate_animated animate_fadeOutUp",
      },
    });

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
    email.value = "";
    password.value = "";
  } else {
    setError(email, "Incorrect email or password");
    setError(password, "Incorrect email or password");
  }
});

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

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (emailValue === "") {
    errors.push({ input: email, message: "Email is required" });
  } else if (!isValidEmail(emailValue)) {
    errors.push({ input: email, message: "Provide a valid email address" });
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    errors.push({ input: password, message: "Password is required" });
  } else {
    setSuccess(password);
  }

  return errors;
};
