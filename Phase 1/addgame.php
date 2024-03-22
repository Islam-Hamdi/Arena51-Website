<?php
// Get the form data
$title = $_POST['title'];
$caption = $_POST['caption'];
$price = $_POST['price'];
$quantity = $_POST['quantity'];

// Create an array for the new game
$newGame = array(
    'title' => $title,
    'caption' => $caption,
    'price' => $price,
    'quantity' => $quantity
);

// Load the existing JSON file
$gamesJson = file_get_contents('data/games.json');
$gamesArray = json_decode($gamesJson, true);

// Add the new game to the existing array
$gamesArray[] = $newGame;

// Convert the updated array back to JSON
$updatedJson = json_encode($gamesArray, JSON_PRETTY_PRINT);

// Write the updated JSON back to the file
file_put_contents('data/games.json', $updatedJson);

// Redirect back to the seller page or display a success message
header('Location: seller_page.php?success=true');
?>
