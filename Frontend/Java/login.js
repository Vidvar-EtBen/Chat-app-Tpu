let outerlogin = document.querySelector("#header-login-button");
let closeLogin = document.querySelector("#Login-close");
let loginPanel = document.querySelector("#Login");
let loginForm = document.querySelector("#Login form");

fetch("https://localhost:7263/api/User/LoginUser", {
    
});
/* show login panel */
outerlogin.addEventListener("click", () => {
  loginPanel.style.display = "flex";
});

/* close login panel */
closeLogin.addEventListener("click", (event) => {
    event.preventDefault();
    loginPanel.style.display = "none";
});



loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    // Perform login logic here
    console.log("Username:", username);
    console.log("Password:", password);

    if (false) {
        // Hide login panel after submission
        loginPanel.style.display = "none";
    }
    else {
        // Show error message
        alert("Invalid username or password");
    }

    // Clear form fields
    document.querySelector("#username").value = "";
    document.querySelector("#password").value = "";
});