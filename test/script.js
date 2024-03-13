var slider = document.querySelector('.slider');
var arrows = document.querySelector('.arrows');
var dots = document.querySelectorAll('.dots .dot');
var currentIndex = 0;

// Function to slide the images
function slideNext() {
    var currentImage = document.querySelector('.slide img:not([style="display: none;"])');
    var nextImage = currentImage.nextElementSibling || document.querySelector('.slide img:first-child');
    currentImage.style.display = 'none';
    nextImage.style.display = 'block';
    currentIndex = (currentIndex + 1) % dots.length;
    updateDots();
}

// Function to slide to the previous image
function slidePrev() {
    var images = document.querySelectorAll('.slide img');
    if (currentIndex > 0) {
        images[currentIndex].style.display = 'none';
        currentIndex--;
        images[currentIndex].style.display = 'block';
        updateDots();
    }
}

// Automatically slide images every 3 seconds (adjust as needed)
setInterval(slideNext, 9000);

// Add event listeners to the arrows
arrows.querySelector('.left').addEventListener('click', slidePrev);
arrows.querySelector('.right').addEventListener('click', slideNext);

// Function to hide all images except the first one
function hideImages() {
    var images = document.querySelectorAll('.slide img');
    for (var i = 1; i < images.length; i++) {
        images[i].style.display = 'none';
    }
}

// Hide all images except the first one initially
hideImages();

// Function to update the active dot
function updateDots() {
    dots.forEach(function(dot, index) {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}
document.getElementById('right').addEventListener('click', function() {
    slideNext();
});

document.getElementById('left').addEventListener('click', function() {
    slidePrev();
});

