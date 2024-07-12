// signup.js
document.addEventListener("DOMContentLoaded", function () {
  const username = document.querySelector("#username");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const message = document.querySelector("#message");
  const btn = document.querySelector("#btn");
  const alert1 = document.querySelector("#alert1");
  const password2 = document.querySelector("#password2");
  const confpass = document.querySelector("#confpass");
  const usernameRegex = /^[a-zA-Z0-9_-]{3,15}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let users = [];

  if (localStorage.getItem("users")) {
    try {
      users = JSON.parse(localStorage.getItem("users"));
    } catch (error) {
      console.error("Error parsing users from localStorage:", error);
      users = [];
    }
  }

  function checkPasswords() {
    if (password.value !== password2.value) {
      confpass.classList.remove("d-none");
      return false;
    } else {
      confpass.classList.add("d-none");
      return true;
    }
  }

  function checkUsername() {
    if (!usernameRegex.test(username.value)) {
      alert1.classList.remove("d-none");
    } else {
      alert1.classList.add("d-none");
    }
  }

  function checkEmailAvailability() {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email.toLowerCase() === email.value.toLowerCase()) {
        message.innerHTML = `<span class="text-light my-3">Email already exists</span>`;
        return false;
      }
    }
    message.innerHTML = "";
    return true;
  }

  function showAlert() {
    message.innerHTML = "";

    if (
      username.value === "" ||
      email.value === "" ||
      password.value === "" ||
      password2.value === ""
    ) {
      message.innerHTML = `<span class="text-light my-3">All inputs are required</span>`;
      return false;
    }

    if (!usernameRegex.test(username.value)) {
      alert1.classList.remove("d-none");
      return false;
    } else {
      alert1.classList.add("d-none");
    }

    if (!emailRegex.test(email.value)) {
      message.innerHTML = `<span class="text-light my-3">Invalid email format</span>`;
      return false;
    }

    return checkEmailAvailability();
  }

  function getData() {
    let user = {
      name: username.value,
      email: email.value,
      pass: password.value,
      pass2: password2.value,
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    location.href = "./login.html";
  }

  btn.addEventListener("click", function (event) {
    event.preventDefault();
    if (checkPasswords() && showAlert()) {
      getData();
    }
  });

  username.addEventListener("input", function () {
    checkUsername();
  });

  password.addEventListener("input", function () {
    alert1.classList.add("d-none");
  });
});

// login.js// signup.js
document.addEventListener("DOMContentLoaded", function () {
  const username = document.querySelector("#username");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const message = document.querySelector("#message");
  const btn = document.querySelector("#btn");
  const alert1 = document.querySelector("#alert1");
  const password2 = document.querySelector("#password2");
  const confpass = document.querySelector("#confpass");
  const usernameRegex = /^[a-zA-Z0-9_-]{3,15}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let users = [];

  if (localStorage.getItem("users")) {
    try {
      users = JSON.parse(localStorage.getItem("users"));
    } catch (error) {
      console.error("Error parsing users from localStorage:", error);
      users = [];
    }
  }

  function checkPasswords() {
    if (password.value !== password2.value) {
      confpass.classList.remove("d-none");
      return false;
    } else {
      confpass.classList.add("d-none");
      return true;
    }
  }

  function checkUsername() {
    if (!usernameRegex.test(username.value)) {
      alert1.classList.remove("d-none");
    } else {
      alert1.classList.add("d-none");
    }
  }

  function checkEmailAvailability() {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email.toLowerCase() === email.value.toLowerCase()) {
        message.innerHTML = `<span class="text-light my-3">Email already exists</span>`;
        return false;
      }
    }
    message.innerHTML = "";
    return true;
  }

  function showAlert() {
    message.innerHTML = "";

    if (
      username.value === "" ||
      email.value === "" ||
      password.value === "" ||
      password2.value === ""
    ) {
      message.innerHTML = `<span class="text-light my-3">All inputs are required</span>`;
      return false;
    }

    if (!usernameRegex.test(username.value)) {
      alert1.classList.remove("d-none");
      return false;
    } else {
      alert1.classList.add("d-none");
    }

    if (!emailRegex.test(email.value)) {
      message.innerHTML = `<span class="text-light my-3">Invalid email format</span>`;
      return false;
    }

    return checkEmailAvailability();
  }

  function getData() {
    let user = {
      name: username.value,
      email: email.value,
      pass: password.value,
      pass2: password2.value,
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    location.href = "./login.html";
  }

  btn.addEventListener("click", function (event) {
    event.preventDefault();
    if (checkPasswords() && showAlert()) {
      getData();
    }
  });

  username.addEventListener("input", function () {
    checkUsername();
  });

  password.addEventListener("input", function () {
    alert1.classList.add("d-none");
  });
});

// login.js
document.addEventListener("DOMContentLoaded", function () {
  const email_login = document.querySelector("#email_login");
  const password_login = document.querySelector("#password_login");
  const btn_login = document.querySelector("#btn_login");
  const message2 = document.querySelector("#message2");

  let users = [];

  if (localStorage.getItem("users")) {
    try {
      users = JSON.parse(localStorage.getItem("users"));
    } catch (error) {
      console.error("Error parsing users from localStorage:", error);
      users = [];
    }
  }

  function login() {
    if (email_login.value === "" || password_login.value === "") {
      message2.innerHTML = `All inputs are required`;
      return;
    }

    for (let i = 0; i < users.length; i++) {
      if (
        email_login.value.toLowerCase() === users[i].email.toLowerCase() &&
        password_login.value === users[i].pass
      ) {
        message2.innerHTML = `Success`;
        message2.classList.remove("text-danger");
        message2.classList.add("text-success");
        localStorage.setItem('currentUser', JSON.stringify(users[i].name)); // Store username instead of email
        location.href = "./index.html";
        return;
      }
    }

    message2.innerHTML = `Invalid email or password`;
    message2.classList.remove("text-success");
    message2.classList.add("text-danger");
  }

  btn_login.addEventListener("click", function (event) {
    event.preventDefault();
    login();
  });
});


document.addEventListener("DOMContentLoaded", function () {
    const homeUser = document.querySelector("#home_user");
    const loggedUser = localStorage.getItem('currentUser');
  
    if (loggedUser) {
      homeUser.textContent = `Welcome ${JSON.parse(loggedUser)}`;
    } else {
      // Redirect the user to the login page if not logged in
      // window.location.href = "./login.html";
    }
  });
  
  
//   import axios from 'axios';
  
//   const options = {
//     method: 'GET',
//     url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',
//     params: {limit: '10'},
//     headers: {
//       'X-RapidAPI-Key': 'a920c11e59msh69642dabe5c4bffp112eacjsn19b70e650fec',
//       'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
//     }
//   };
  
//   try {
//       const response = await axios.request(options);
//       console.log(response.data);
//   } catch (error) {
//       console.error(error);
//   }

//BMI
// document.addEventListener("DOMContentLoaded", function () {
//     const heightInput = document.querySelector("#heightInput");
//     const weightInput = document.querySelector("#weightInput");
//     const calc = document.querySelector("#calc");
//     const result = document.querySelector("#result");
  
//     function calculateBMI() {
//       const height = parseFloat(heightInput.value);
//       const weight = parseFloat(weightInput.value);
//       const bmi = weight / (height * height);
//       return bmi;
//     }
  
//     calc.addEventListener("click", function (event) {
//       event.preventDefault();
//       const bmi = calculateBMI();
//       let resultMessage = "";
//       if (bmi < 18.5) {
//         resultMessage = "Underweight";
//       } else if (bmi < 25) {
//         resultMessage = "Normal";
//       } else if (bmi < 30) {
//         resultMessage = "Overweight";
//       } else {
//         resultMessage = "Obese";
//       }
//       result.innerHTML = `<p class="text-success">Your BMI is ${bmi.toFixed(2)}. You are considered ${resultMessage}.</p>`;
//     });
//   });
  