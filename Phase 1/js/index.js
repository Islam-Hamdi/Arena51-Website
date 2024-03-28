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
    let customer = JSON.parse(localStorage.getItem("customer"));
    const gamesWrapper = document.querySelector(".games-wrapper");
    fetch("data/game_offers.json")
    .then((response) => response.json())
    .then((slides) => {
    // Call initSlider with the fetched slides
    initSlider(slides);
    })
    .catch((error) => console.error("Error fetching game offers:", error));
    // Function to initialize the slider
    function initSlider(slides) {
    const slider = document.querySelector(".image-slider");
    const sliderDots = document.querySelector(".slider-dots");
    
    
    // Function to create slides
    function createSlide(slide, index) {
    const slideElement = document.createElement("div");
    slideElement.classList.add("slide");
    slideElement.style.backgroundImage = `url(${slide.image})`;
    
    
    slideElement.innerHTML = `
    <div class="slide-content">
    <p>${slide.text}</p>
    <button>${slide.buttonText}</button>
    </div>
    `;
    
    
    slider.appendChild(slideElement);
    
    
    // Create dots
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.setAttribute("data-slide", index);
    sliderDots.appendChild(dot);
    }
    
    
    // Initialize slider
    function initSlider() {
    slides.forEach((slide, index) => {
    createSlide(slide, index);
    });
    
    
    const firstSlide = document.querySelector(".slide");
    firstSlide.classList.add("active");
    document.querySelector(".dot").classList.add("active");
    }
    
    
    initSlider();
    
    
    let currentSlide = 0;
    const slideCount = slides.length;
    const prevButton = document.querySelector(".prev-slide");
    const nextButton = document.querySelector(".next-slide");
    const dots = document.querySelectorAll(".dot");
    
    
    function showSlide(index) {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    
    
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));
    
    
    slides[index].classList.add("active");
    dots[index].classList.add("active");
    }
    
    
    function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    showSlide(currentSlide);
    }
    
    
    function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    showSlide(currentSlide);
    }
    
    
    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);
    
    
    dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
    showSlide(index);
    currentSlide = index;
    });
    });
    
    
    // Automatic slide transition
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    
    // Fetch JSON data
    fetch("data/games.json")
    .then((response) => response.json())
    .then((data) => {
    // Retrieve games from local storage
    let savedGames = JSON.parse(localStorage.getItem("games")) || [];
    // Merge fetched games with saved games
    const allGames = [...data, ...savedGames];
    renderGames(allGames); // Render all games
    
    
    // Add event listeners to category buttons
    const categoryButtons = document.querySelectorAll(".categories button");
    categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
    const category = button.dataset.category;
    const filteredGames = allGames.filter(
    (game) => category === "All" || game.categories.includes(category)
    );
    renderGames(filteredGames);
    });
    });
    
    
    // Event listener for buy now buttons
    const buyNowButtons = document.querySelectorAll(".buy-now");
    buyNowButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
    if(customer) {
    let customer_balance = customer.balance;
    let game_id = event.target.dataset.gameid;
    let game = data.find((u) => u.id == game_id);
    if(customer_balance > game.price) {
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
    
    
    // Event listener for search button
    const searchInput = document.getElementById("search-box");
    const searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", function () {
    console.log("Search button clicked!");
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredGames = allGames.filter((game) =>
    game.name.toLowerCase().includes(searchTerm)
    );
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
    const categories = game.categories ? game.categories.join(" ") : "";
    
    
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
    <button class="btn fill buy-now" data-gameid="${game.id}">BUY NOW</button>
    </div>
    `;
    gamesWrapper.appendChild(gameCard);
    });
    }
    });    