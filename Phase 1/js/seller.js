document.addEventListener('DOMContentLoaded', function() {
    // Function to handle image preview
    document.getElementById('images').addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('image-preview').src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    // Function to handle form submission
    const form = document.getElementById('gameForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
    
        // Extract data from form fields
        const title = document.getElementById('title').value;
        const description = document.getElementById('caption').value;
        const price = parseFloat(document.getElementById('price').value);
        const quantity = parseInt(document.getElementById('quantity').value);
        const category = document.getElementById('category').value;
        const images = document.getElementById('images').files;
    
        // Validate form data
        if (title.trim() === '' || description.trim() === '' || isNaN(price) || isNaN(quantity) || !images.length) {
            alert('Please fill in all fields and select at least one image.');
            return;
        }
    
        // Create new game object
        const newGame = {
            "name": title,
            "categories": [category],
            "image": "images/" + images[0].name,
            "description": description,
            "price": price,
            "quantity": quantity
        };
    
        // Get existing games from local storage or initialize an empty array
        let games = JSON.parse(localStorage.getItem('games')) || [];
        // Add new game to the games array
        games.push(newGame);
        // Save the updated games array back to local storage
        localStorage.setItem('games', JSON.stringify(games));
    
        // Reset the form
        form.reset();
        // Inform the user that the game has been added successfully
        alert('New game added successfully!');
    
        // Log the updated games array
        console.log('Updated games array:', games);
    });
    
});
