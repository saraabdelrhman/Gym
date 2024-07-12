document.addEventListener("DOMContentLoaded", function () {
  const heightInput = document.querySelector("#heightInput");
  const weightInput = document.querySelector("#weightInput");
  const calc = document.querySelector("#calc");
  const result = document.querySelector("#result");

  function calculateBMI() {
    const height = parseFloat(heightInput.value) / 100; // Convert height to meters
    const weight = parseFloat(weightInput.value);
    const bmi = weight / (height * height);
    return bmi;
  }

  calc.addEventListener("click", function (event) {
    event.preventDefault();
    const bmi = calculateBMI();
    let resultMessage = "";

    if (bmi < 18.5) {
      resultMessage = "Underweight";
    } else if (bmi < 24.9) {
      resultMessage = "Normal weight";
    } else if (bmi < 29.9) {
      resultMessage = "Overweight";
    } else {
      resultMessage = "Obese";
    }

    result.innerHTML = `<h3 mt-3 class="text-warning">Your BMI is ${bmi.toFixed(
      2
    )}. You are classified as ${resultMessage}.</h3>`;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const homeUser = document.querySelector("#home_user");
  const loggedUser = localStorage.getItem("currentUser");

  if (loggedUser) {
    homeUser.textContent = `Welcome ${JSON.parse(loggedUser)}`;
  } else {
    // Redirect the user to the login page if not logged in
    // window.location.href = "./login.html";
  }
});

function send() {
  const emailForm = document.getElementById("contactForm");
  const user_email = document.getElementById("user_email").value;
  const user_message = document.getElementById("user_message").value;

  if (user_email === "" || user_message === "") {
    alert("Please fill in all required fields.");
    return false; // Prevent form submission
  }

  const params = {
    user_email,
    user_message,
  };

  emailjs
    .send("service_s3w9gzv","template_ivqmqu6", params)
    .then(() => {
      alert("Email sent successfully!");
      emailForm.reset(); // Clear the form after successful submission
    })
    .catch(() => {
      alert("Error sending email. Please try again later.");
    });

  return false; // Prevent default form submission
}
