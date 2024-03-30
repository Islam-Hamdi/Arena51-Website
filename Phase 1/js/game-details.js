function navigateToGameDetails(gameName) {
    window.location.href = `game-details.html?name=${gameName}`;
}
document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from games.json
    fetch("data/games.json")
        .then(response => response.json())
        .then(games => {
            // Get game name from query parameter
            const params = new URLSearchParams(window.location.search);
            const gameName = params.get('name');

            // Find the game by name
            const game = games.find(g => g.name === gameName);

            if (game) {
                // Populate game details
                const gameDetails = document.querySelector('.game-details');
                const html = `
                    <div class="game">
                        <img src="${game.image}" alt="${game.name}">
                        <div class="game-info">
                        <h2>${game.name}</h2>
                        <p>${game.description}</p>
                        <p>Price: $${game.price}</p>
                        <p>Quantity Available: ${game.quantity}</p>
                        <button class ="btn fill buy-now" >Buy Now</button>
                        </div>
                    </div>
                `;
                gameDetails.innerHTML = html;

                // // Add event listener for add to cart button
                // document.querySelector('.buy-now').addEventListener('click', function() {
                //     // Handle adding to cart
                //     alert('Added to cart: ' + game.name);
                // });
            // Event listener for buy now buttons
            const buyNowButtons = document.querySelectorAll(".buy-now");
            buyNowButtons.forEach((button) => {
                button.addEventListener("click", (event) => {
                    if (user) {
                        let user_balance = user.balance;
                        let game_id = event.target.dataset.gameid;
                        let game = data.find((u) => u.id == game_id);
                        if (user_balance > game.price) {
                            localStorage.setItem("game", JSON.stringify(game));
                            window.location.href = "purchase1.html";
                        } else {
                            showFlashMessage("Your balance is not enough", false);
                        }
                    } else {
                        showFlashMessage("You must login to be able to buy", false);
                    }
                });
            });
                // Filter other games from the same category
                const otherGames = games.filter(g => g.categories.includes(game.categories[0]) && g.name !== game.name);

                if (otherGames.length > 0) {
                    // Add heading for other games
                    const heading = document.createElement('h3');
                    heading.textContent = `Other ${game.categories[0]} Games`;
                    heading.classList.add('text-right', 'heading');
                    gameDetails.appendChild(heading);

                    // Line after the heading
                    const line = document.createElement('div');
                    line.classList.add('line');
                    gameDetails.appendChild(line);

                    // Render other games using the same cards as the main page
                    const gamesWrapper = document.createElement('div');
                    gamesWrapper.classList.add('games-wrapper');
                    otherGames.forEach(otherGame => {
                        const gameCard = document.createElement('div');
                        gameCard.classList.add('games');
                        gameCard.setAttribute('data-category', otherGame.categories.join(' '));
                        gameCard.innerHTML = `
                            <div class="mywrapper">
                                <div class="image-container">
                                    <img src="${otherGame.image}" alt="${otherGame.name}" class="banner-image" />
                                    <span class="price">$${otherGame.price}</span>
                                </div>
                                <h1>${otherGame.name}</h1>
                                <p>${otherGame.description}</p>
                            </div>
                            <div class="button-wrapper">
                            <button class="btn outline" onclick="navigateToGameDetails('${encodeURIComponent(otherGame.name)}')">DETAILS</button>
                            <button class="btn fill">BUY NOW</button>
                            </div>
                        `;
                        gamesWrapper.appendChild(gameCard);
                    });
                    gameDetails.appendChild(gamesWrapper);

                }
            } else {
                // Game not found
                const gameDetails = document.querySelector('.game-details');
                gameDetails.innerHTML = '<p>Game not found.</p>';
            }
        })
        .catch(error => console.error('Error fetching game data:', error));
});



