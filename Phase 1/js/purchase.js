document.addEventListener("DOMContentLoaded", function() {
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
        const purchaseForm = document.querySelector(".purchase-form");
        const authenticated_account = document.querySelector(
          ".account .authenticated"
        );
        const notauthenticated_account = document.querySelector(
          ".account .not-authenticated"
        );
        const account_username = document.querySelector(".account .account-username");
        const logout = document.getElementById("logout");
        let customer = JSON.parse(localStorage.getItem("customer"));
        let game = JSON.parse(localStorage.getItem("game"));
        if (customer && game) {
          notauthenticated_account.style.display = "none";
          authenticated_account.style.display = "block";
          account_username.textContent = customer.username;
        } else {
          window.location.href = "Arena-51-Website.html";
        }
        logout.addEventListener("click", function () {
          localStorage.removeItem("customer");
          location.reload();
        });
      
        purchaseForm.addEventListener("submit", function (event) {
          event.preventDefault();
          const purchases_history = JSON.parse(localStorage.getItem("purchases_history")) || [];
          const quantity = parseInt(document.getElementById("quantity").value);
          const phoneNumber = document.getElementById("phone").value.trim();
          const address = document.getElementById("address").value.trim();
          const zipCode = document.getElementById("zip").value.trim();
          if (quantity <= game.quantity) {
            customer["phoneNumber"] = phoneNumber;
            customer["address"] = address;
            customer["zipCode"] = zipCode;
            game["quantity"] = quantity;
            const purchaseData = {
                phone: phoneNumber,
                address: address,
                zip: zipCode,
                itemName: game.name,
                price: game.price,
                quantity: quantity,
               
            };
            purchases_history.push(purchaseData);
            localStorage.setItem("purchases_history", JSON.stringify(purchases_history));
            showFlashMessage("One Item is bought. Redirection to Purchases History", true);
            setTimeout(() => {
              window.location.href = "purchases.html";
            }, 3000);
       
          } else {
            showFlashMessage("There are no more items", false);
          }
        });
      });      
});
