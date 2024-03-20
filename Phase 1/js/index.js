document.addEventListener("DOMContentLoaded", function () {
    const gamesWrapper = document.querySelector(".games-wrapper");
 
    // Fetch JSON data
    fetch("data/games.json")
        .then((response) => response.json())
        .then((data) => {
            renderGames(data); // Initially render all games
 
            // Add event listeners to category buttons
            const categoryButtons = document.querySelectorAll(".categories button");
            categoryButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    const category = button.dataset.category;
                    const filteredGames = data.filter((game) => category === "All" || game.categories.includes(category));
                    renderGames(filteredGames);
                });
            });
        })
        .catch((error) => console.error("Error fetching data:", error));
        const buyNowButtons = document.querySelectorAll(".btn.fill");
            buyNowButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    window.location.href = "purchase.html";
                });
            });
        })
        .catch((error) => console.error("Error fetching data:", error));
 
    function renderGames(games) {
        gamesWrapper.innerHTML = ""; // Clear previous games
 
        games.forEach((game) => {
            const gameCard = document.createElement("div");
            gameCard.classList.add("games");
            gameCard.setAttribute("data-category", game.categories.join(' '));
 
            // Create game card HTML structure (similar to your existing cards)
            gameCard.innerHTML = `
                <div class="mywrapper">
                    <div class="image-container">
                        <img src="${game.image}" alt="${game.name}" class="banner-image" />
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