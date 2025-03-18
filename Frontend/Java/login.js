let outerlogin = document.querySelector("#header-login-button");
let closeLogin = document.querySelector("#Login-close");
let loginPanel = document.querySelector("#Login");
let loginForm = document.querySelector("#Login form");
let welcome = document.querySelector("#welcome-user");
let contactList = document.querySelector("#contact-list");


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
    if (outerlogin.textContent === "Login") {
        event.preventDefault();
        fetch("https://localhost:7263/api/User/LoginUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "*/*"
            },
            body: JSON.stringify({
                username: document.querySelector("#username").value,
                password: document.querySelector("#password").value
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.id && data.message == "Login successful!") {
                console.log("ID:", data.id);
                console.log("Message:", data.message);
                let username = document.querySelector("#username").value;
                welcome.textContent = "Welcome " + username.charAt(0).toUpperCase() + username.slice(1);
                loginPanel.style.display = "none";
                outerlogin.textContent = "Logout";
                outerlogin.addEventListener("click", () => {
                    outerlogin.textContent = "Login";
                    welcome.textContent = "";
                });
                
            } 
            else {
                console.error("Unexpected response data:", data);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Login failed! Please try again.");
        });
    }
});