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
