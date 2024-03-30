document.addEventListener("DOMContentLoaded", function () {
  // document.addEventListener("DOMContentLoaded", function () {
    let games = JSON.parse(localStorage.getItem('games'));

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
  let user = JSON.parse(localStorage.getItem("user"));
  let game = JSON.parse(localStorage.getItem("game"));
  if (user && game) {
    notauthenticated_account.style.display = "none";
    authenticated_account.style.display = "block";
    account_username.textContent = user.username;
  } else {
    window.location.href = "Arena-51-Website.html";
  }
  logout.addEventListener("click", function () {
    localStorage.removeItem("user");
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
      user["phoneNumber"] = phoneNumber;
      user["address"] = address;
      user["zipCode"] = zipCode;
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
      
      // Update the game data in local storage
      //  // Decrement the quantity attribute of the game
      // game.quantity -= quantity;
      // localStorage.setItem("games", JSON.stringify(game));

// Find the index of the game with the corresponding ID
const index = games.findIndex(g => g.id === game.id);

// Check if the game exists in the games array
if (index !== -1) {
    // Update the quantity of the game
    games[index].quantity -= quantity;
    
    // Save the updated games array back to the local storage
    localStorage.setItem('games', JSON.stringify(games));
} else {
    console.error('Game not found in the local storage');
}
      showFlashMessage("One Item is bought. Redirection to Purchases History", true);
      
      setTimeout(() => {
        window.location.href = "purchases.html";
      }, 3000);
    } else {
      showFlashMessage("There are no more items", false);
    }
  });
});
// });
