// Header scroll effect
window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    header.style.backgroundColor = window.scrollY > 50 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.8)';
});

// Gallery slider functionality
const gallery = document.querySelector('.gallery');
const galleryContainer = document.querySelector('.gallery-container');
const galleryItems = document.querySelectorAll('.gallery-item');
const prevBtn = document.querySelector('.gallery-nav.prev');
const nextBtn = document.querySelector('.gallery-nav.next');

// Clone first and last three items
const firstClone = galleryItems[0].cloneNode(true);
const secondClone = galleryItems[1].cloneNode(true);
const thirdClone = galleryItems[2].cloneNode(true);
const lastClone = galleryItems[galleryItems.length - 1].cloneNode(true);
const secondLastClone = galleryItems[galleryItems.length - 2].cloneNode(true);
const thirdLastClone = galleryItems[galleryItems.length - 3].cloneNode(true);

// Append clones
galleryContainer.appendChild(firstClone);
galleryContainer.appendChild(secondClone);
galleryContainer.appendChild(thirdClone);
galleryContainer.insertBefore(lastClone, galleryItems[0]);
galleryContainer.insertBefore(secondLastClone, lastClone);
galleryContainer.insertBefore(thirdLastClone, secondLastClone);

// Recalculate gallery items after cloning
const allGalleryItems = document.querySelectorAll('.gallery-item');

let currentPosition = 0;
const itemWidth = allGalleryItems[0].offsetWidth;
const gap = 40; // Make sure this matches the gap in your CSS
const totalWidth = itemWidth + gap;
let moveSpeed = 0.5; // Pixels per frame, adjust for faster/slower movement
let isAutoPlaying = false;
let animationId = null;

function animateGallery() {
    currentPosition -= moveSpeed;
    if (currentPosition <= -totalWidth * galleryItems.length) {
        currentPosition += totalWidth * galleryItems.length;
    }
    galleryContainer.style.transform = `translateX(${currentPosition}px)`;
    animationId = requestAnimationFrame(animateGallery);
}

function startAutoPlay() {
    if (!isAutoPlaying) {
        isAutoPlaying = true;
        animateGallery();
    }
}

function stopAutoPlay() {
    isAutoPlaying = false;
    cancelAnimationFrame(animationId);
}

function moveToNext() {
    stopAutoPlay();
    currentPosition -= totalWidth;
    if (currentPosition <= -totalWidth * galleryItems.length) {
        currentPosition += totalWidth * galleryItems.length;
    }
    galleryContainer.style.transition = 'transform 0.3s ease-in-out';
    galleryContainer.style.transform = `translateX(${currentPosition}px)`;
    setTimeout(() => {
        galleryContainer.style.transition = 'none';
    }, 300);
}

function moveToPrev() {
    stopAutoPlay();
    currentPosition += totalWidth;
    if (currentPosition > 0) {
        currentPosition -= totalWidth * galleryItems.length;
    }
    galleryContainer.style.transition = 'transform 0.3s ease-in-out';
    galleryContainer.style.transform = `translateX(${currentPosition}px)`;
    setTimeout(() => {
        galleryContainer.style.transition = 'none';
    }, 300);
}

function speedUp() {
    moveSpeed = Math.min(moveSpeed * 1.5, 2); // Cap the maximum speed
}

function slowDown() {
    moveSpeed = Math.max(moveSpeed * 0.5, 0.1); // Cap the minimum speed
}

// Event listeners for arrows
nextBtn.addEventListener('click', moveToNext);
prevBtn.addEventListener('click', moveToPrev);

nextBtn.addEventListener('dblclick', startAutoPlay);
prevBtn.addEventListener('dblclick', stopAutoPlay);

nextBtn.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    speedUp();
});

prevBtn.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    slowDown();
});

// Responsive behavior
window.addEventListener('resize', () => {
    const newItemWidth = allGalleryItems[0].offsetWidth;
    const newTotalWidth = newItemWidth + gap;
    currentPosition = (currentPosition / totalWidth) * newTotalWidth;
    totalWidth = newTotalWidth;
});

// Initialize gallery
startAutoPlay();