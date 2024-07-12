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
                localStorage.setItem('currentUser', JSON.stringify(users[i].name));
                location.href = "./home.html";
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
