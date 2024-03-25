document.addEventListener("DOMContentLoaded", function () {
    const gamesWrapper = document.querySelector(".games-wrapper");

    // Fetch JSON data
    fetch("data/games.json")
        .then((response) => response.json())
        .then((data) => {
            // Retrieve games from local storage
            let savedGames = JSON.parse(localStorage.getItem('games')) || [];
            // Merge fetched games with saved games
            const allGames = [...data, ...savedGames];
            renderGames(allGames); // Render all games

            // Add event listeners to category buttons
            const categoryButtons = document.querySelectorAll(".categories button");
            categoryButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    const category = button.dataset.category;
                    const filteredGames = allGames.filter((game) => category === "All" || game.categories.includes(category));
                    renderGames(filteredGames);
                });
            });

            // Event listener for buy now buttons
            const buyNowButtons = document.querySelectorAll(".btn.fill");
            buyNowButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    window.location.href = "purchase1.html";
                });
            });

            // Event listener for search button
            const searchInput = document.getElementById("search-box");
            const searchButton = document.getElementById("search-button");
            searchButton.addEventListener("click", function () {
                console.log("Search button clicked!");
                const searchTerm = searchInput.value.trim().toLowerCase();
                const filteredGames = allGames.filter((game) => game.name.toLowerCase().includes(searchTerm));
                console.log("Filtered games:", filteredGames);
                renderGames(filteredGames);
            });

            // Event listener for details buttons
            const detailsButtons = document.querySelectorAll(".btn.outline");
            detailsButtons.forEach((button, index) => {
                button.addEventListener("click", () => {
                    const selectedGame = allGames[index]; // Get the game data corresponding to the clicked button
                    const gameName = encodeURIComponent(selectedGame.name); // Encode game name for URL
                    window.location.href = `game-details.html?name=${gameName}`; // Navigate to game details page with query parameter
                });
            });

        })
        .catch((error) => console.error("Error fetching data:", error));

        function renderGames(games) {
            gamesWrapper.innerHTML = ""; // Clear previous games
        
            games.forEach((game) => {
                const gameCard = document.createElement("div");
                gameCard.classList.add("games");
        
                // Check if the categories property exists
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
                    </div>
                    <div class="button-wrapper">
                        <button class="btn outline">DETAILS</button>
                        <button class="btn fill">BUY NOW</button>
                    </div>
                `;
        
                gamesWrapper.appendChild(gameCard);
            });
        }
        
});
