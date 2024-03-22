document.getElementById("FileAttachment").onchange = function () {
    document.getElementById("fileuploadurl").value = this.value.replace(/C:\\fakepath\\/i, '');
};
// Add this JavaScript in a script tag or in an external JS file
// Get reference to the form
const form = document.querySelector('form');

// Add event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Extract data from form fields
    const title = document.getElementById('title').value;
    const description = document.getElementById('caption').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const images = document.getElementById('images').files;

    // Validate form data
    if (title.trim() === '' || description.trim() === '' || isNaN(price) || isNaN(quantity) || !images.length) {
        alert('Please fill in all fields and select at least one image.');
        return;
    }

    // Create new game object
    const newGame = {
        "name": title,
        "categories": [], // You can add categories if needed
        "image": "images/" + images[0].name, // Assuming the first selected image will be used as the game image
        "description": description,
        "price": price,
        "quantity": quantity
    };

    // Add new game to games.json
    fetch('data/games.json')
        .then(response => response.json())
        .then(data => {
            data.push(newGame); // Add new game to existing games data
            return fetch('data/games.json', {
                method: 'PUT', // Use PUT method to update the file
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // Convert data to JSON string
            });
        })
        .then(() => {
            alert('New game added successfully!');
            form.reset(); // Reset the form after submission
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
});
