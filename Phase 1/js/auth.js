document.addEventListener('DOMContentLoaded', async function () {
    document.addEventListener("DOMContentLoaded", function () {
        const flashContainer = document.getElementById("flash-container");
        function showFlashMessage(message, status) {
        flashContainer.textContent = message;
        flashContainer.style.display = "block";
        if (status == true) flashContainer.style.backgroundColor = "green";
        else flashContainer.style.backgroundColor = "#f44336";
        
        
        setTimeout(function () {
        flashContainer.style.display = "none";
        }, 3000); // Hide after 3 seconds
        }
        const authenticated_account = document.querySelector(
        ".account .authenticated"
        );
        const notauthenticated_account = document.querySelector(
        ".account .not-authenticated"
        );
        const account_username = document.querySelector(".account .account-username");
        const logout = document.getElementById("logout");
        let customer = JSON.parse(localStorage.getItem("customer"));
        if (customer) {
        notauthenticated_account.style.display = "none";
        authenticated_account.style.display = "block";
        account_username.textContent = customer.username;
        } else {
        notauthenticated_account.style.display = "block";
        authenticated_account.style.display = "none";
        }
        logout.addEventListener("click", function () {
        localStorage.removeItem("customer");
        location.reload();
        });
        
        
        const loginLink = document.querySelector(
        '.account a[data-target="#modalLogin"]'
        );
        const modal = document.getElementById("modalLogin");
        const overlay = document.getElementById("overlay");
        
        
        // Event listener to show the login modal when clicking on "Login / Sign Up" link
        loginLink.addEventListener("click", function (event) {
        event.preventDefault();
        modal.classList.add("modal-active");
        overlay.style.display = "block"; // Show the overlay
        });
        
        
        // Close the modal when clicking on the close button
        modal.querySelector(".close-button").addEventListener("click", function () {
        modal.classList.remove("modal-active");
        overlay.style.display = "none"; // Hide the overlay
        });
        
        
        // Event listener to handle login form submission
        document
        .getElementById("loginForm")
        .addEventListener("submit", function (event) {
        event.preventDefault();
        
        
        // Get input values
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        
        // Fetch user data from JSON file
        fetch("data/users.json")
        .then((response) => response.json())
        .then((users) => {
        
        
        // Find user with matching username
        const user = users.find((u) => u.username === username);
        
        
        console.log(user);
        
        
        if (user) {
        // Check if password is correct
        if (user.password === password) {
        // Authentication successful
        showFlashMessage(
        "Login successful! Welcome, " + user.username,
        true
        );
        localStorage.setItem("customer", JSON.stringify(user));
        setTimeout(function () {
        location.reload();
        }, 3000); // Reload after 3 seconds
        // Redirect based on user type
        } else {
        // Password incorrect, show flash message
        showFlashMessage("Incorrect password. Please try again.", false);
        }
        } else {
        // Username not found, show flash message
        showFlashMessage(
        "User does not exist. Please check your username."
        );
        }
        })
        .catch((error) => console.error("Error fetching user data:", error));
        });
        });
});
