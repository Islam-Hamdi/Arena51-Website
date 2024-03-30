// document.addEventListener('DOMContentLoaded', function () {
//     // Fetch the JSON data
//     fetch("data/game_offers.json")
//         .then(response => response.json())
//         .then(slides => {
//             // Call initSlider with the fetched slides
//             initSlider(slides);
//         })
//         .catch(error => console.error('Error fetching game offers:', error));

//     // Function to initialize the slider
//     function initSlider(slides) {
//         const slider = document.querySelector('.image-slider');
//         const sliderDots = document.querySelector('.slider-dots');

//         // Function to create slides
//         function createSlide(slide, index) {
//             const slideElement = document.createElement('div');
//             slideElement.classList.add('slide');
//             slideElement.style.backgroundImage = `url(${slide.image})`;

//             slideElement.innerHTML = `
//                 <div class="slide-content">
//                     <p>${slide.text}</p>
//                     <button>${slide.buttonText}</button>
//                 </div>
//             `;

//             slider.appendChild(slideElement);

//             // Create dots
//             const dot = document.createElement('span');
//             dot.classList.add('dot');
//             dot.setAttribute('data-slide', index);
//             sliderDots.appendChild(dot);
//         }

//         // Initialize slider
//         function initSlider() {
//             slides.forEach((slide, index) => {
//                 createSlide(slide, index);
//             });

//             const firstSlide = document.querySelector('.slide');
//             firstSlide.classList.add('active');
//             document.querySelector('.dot').classList.add('active');
//         }

//         initSlider();

//         let currentSlide = 0;
//         const slideCount = slides.length;
//         const prevButton = document.querySelector('.prev-slide');
//         const nextButton = document.querySelector('.next-slide');
//         const dots = document.querySelectorAll('.dot');

//         function showSlide(index) {
//             const slides = document.querySelectorAll('.slide');
//             const dots = document.querySelectorAll('.dot');

//             slides.forEach(slide => slide.classList.remove('active'));
//             dots.forEach(dot => dot.classList.remove('active'));

//             slides[index].classList.add('active');
//             dots[index].classList.add('active');
//         }

//         function nextSlide() {
//             currentSlide = (currentSlide + 1) % slideCount;
//             showSlide(currentSlide);
//         }

//         function prevSlide() {
//             currentSlide = (currentSlide - 1 + slideCount) % slideCount;
//             showSlide(currentSlide);
//         }

//         nextButton.addEventListener('click', nextSlide);
//         prevButton.addEventListener('click', prevSlide);

//         dots.forEach((dot, index) => {
//             dot.addEventListener('click', () => {
//                 showSlide(index);
//                 currentSlide = index;
//             });
//         });

//         // Automatic slide transition
//         setInterval(nextSlide, 5000); // Change slide every 5 seconds
//     }

//         const loginLink = document.querySelector('.account a[data-target="#modalLogin"]');
//         const modal = document.getElementById('modalLogin');
//         const overlay = document.getElementById('overlay');
//         const flashContainer = document.getElementById('flash-container');
    
//         function showFlashMessage(message) {
//             flashContainer.textContent = message;
//             flashContainer.style.display = 'block';
    
//             setTimeout(function() {
//                 flashContainer.style.display = 'none';
//             }, 3000); // Hide after 3 seconds
//         }
    
//         // Event listener to show the login modal when clicking on "Login / Sign Up" link
//         loginLink.addEventListener('click', function(event) {
//             event.preventDefault();
//             modal.classList.add('modal-active');
//             overlay.style.display = 'block'; // Show the overlay
//         });
    
//         // Close the modal when clicking on the close button
//         modal.querySelector('.close-button').addEventListener('click', function() {
//             modal.classList.remove('modal-active');
//             overlay.style.display = 'none'; // Hide the overlay
//         });
    
//         // Event listener to handle login form submission
//         document.getElementById('loginForm').addEventListener('submit', function(event) {
//             event.preventDefault();
    
//             // Get input values
//             const username = document.getElementById('username').value;
//             const password = document.getElementById('password').value;
    
//             // Fetch user data from JSON file
//             fetch('users.json')
//                 .then(response => response.json())
//                 .then(users => {
//                     // Find user with matching username
//                     const user = users.find(u => u.username === username);
    
//                     if (user) {
//                         // Check if password is correct
//                         if (user.password === password) {
//                             // Authentication successful
//                             alert('Login successful! Welcome, ' + user.username);
//                             // Redirect based on user type
//                         } else {
//                             // Password incorrect, show flash message
//                             showFlashMessage('Incorrect password. Please try again.');
//                         }
//                     } else {
//                         // Username not found, show flash message
//                         showFlashMessage('User does not exist. Please check your username.');
//                     }
//                 })
//                 .catch(error => console.error('Error fetching user data:', error));
//         });

//         const signupLink = document.querySelector('.signup');
//         const signupModal = document.getElementById('modalSignup');

//     signupLink.addEventListener('click', function(event) {
//         event.preventDefault();
//             // Hide login modal if it's active
//         modal.classList.remove('modal-active');
//             // Show sign-up modal
//         signupModal.classList.add('modal-active');

//         overlay.style.display = 'block'; // Show the overlay
//     });

//     // Close the sign-up modal when clicking on the close button
//     signupModal.querySelector('.close-button').addEventListener('click', function() {
//         signupModal.classList.remove('modal-active');
//         overlay.style.display = 'none'; // Hide the overlay
//     });

// // Event listener to handle sign-up form submission
// document.getElementById('signupForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     // Get input values
//     const username = document.getElementById('username').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const confirmPassword = document.getElementById('confirm-password').value;
//     const userType = document.getElementById('user-type').value;

//     // Perform validation
//     if (password !== confirmPassword) {
//         showFlashMessage('Passwords do not match. Please try again.');
//         return;
//     }

//     // Prepare user data
//     const userData = {
//         username: username,
//         email: email,
//         password: password,
//         userType: userType
//     };

//     // Save user data to local storage
//     let users = JSON.parse(localStorage.getItem('users')) || [];
//     users.push(userData);
//     localStorage.setItem('users', JSON.stringify(users));

//     // Show success message
//     showFlashMessage('Sign up successful! You can now log in.');

//     // Close the sign-up modal
//     const signupModal = document.getElementById('modalSignup');
//     signupModal.classList.remove('modal-active');
//     overlay.style.display = 'none'; // Hide the overlay
// });
//     });