document.addEventListener('DOMContentLoaded', function () {
    // Fetch the JSON data
    fetch("data/game_offers.json")
        .then(response => response.json())
        .then(slides => {
            // Call initSlider with the fetched slides
            initSlider(slides);
        })
        .catch(error => console.error('Error fetching game offers:', error));

    // Function to initialize the slider
    function initSlider(slides) {
        const slider = document.querySelector('.image-slider');
        const sliderDots = document.querySelector('.slider-dots');

        // Function to create slides
        function createSlide(slide, index) {
            const slideElement = document.createElement('div');
            slideElement.classList.add('slide');
            slideElement.style.backgroundImage = `url(${slide.image})`;

            slideElement.innerHTML = `
                <div class="slide-content">
                    <p>${slide.text}</p>
                    <button>${slide.buttonText}</button>
                </div>
            `;

            slider.appendChild(slideElement);

            // Create dots
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('data-slide', index);
            sliderDots.appendChild(dot);
        }

        // Initialize slider
        function initSlider() {
            slides.forEach((slide, index) => {
                createSlide(slide, index);
            });

            const firstSlide = document.querySelector('.slide');
            firstSlide.classList.add('active');
            document.querySelector('.dot').classList.add('active');
        }

        initSlider();

        let currentSlide = 0;
        const slideCount = slides.length;
        const prevButton = document.querySelector('.prev-slide');
        const nextButton = document.querySelector('.next-slide');
        const dots = document.querySelectorAll('.dot');

        function showSlide(index) {
            const slides = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.dot');

            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slideCount;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            showSlide(currentSlide);
        }

        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                currentSlide = index;
            });
        });

        // Automatic slide transition
        setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
});
