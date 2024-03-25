document.addEventListener("DOMContentLoaded", function () {
    const gamesWrapper = document.querySelector(".games-wrapper");

    // Retrieve games from local storage
    let games = JSON.parse(localStorage.getItem('games')) || [];

    console.log("Retrieved games:", games); // Log the retrieved games

    renderGames(games); // Initially render all games

    // Event listener for search button
    const searchInput = document.getElementById("search-box");
    const searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", function () {
        console.log("Search button clicked!");
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filteredGames = games.filter((game) => game.name.toLowerCase().includes(searchTerm));
        console.log("Filtered games:", filteredGames);
        renderGames(filteredGames);
    });

    function renderGames(games) {
        gamesWrapper.innerHTML = ""; // Clear previous games
        
        games.forEach((game) => {
            const gameCard = document.createElement("div");
            gameCard.classList.add("games");
            
            // Check if game.categories exists before joining
            const categories = game.categories ? game.categories.join(' ') : '';
    
            gameCard.setAttribute("data-category", categories);
        
            // Create game card HTML structure (similar to your existing cards)
            gameCard.innerHTML = `
                <div class="mywrapper">
                    <div class="image-container">
                        <img src="${game.image}" alt="${game.name}" class="banner-image" />
                        <span class="price">$${game.price}</span> <!-- Add price display here -->
                    </div>
                    <h1>${game.name}</h1>
                    <p>${game.description}</p>
                    <div class="quantity-wrapper">
                        <label for="quantity-${game.id}">Remaining Quantity:</label>
                        <span>${game.quantity}</span>
                    </div>
                </div>
                <div class="button-wrapper">
                    <button class="btn outline sell-new-game-button">DETAILS</button>
                </div>
            `;
        
            gamesWrapper.appendChild(gameCard);
        });
    }
    
});
