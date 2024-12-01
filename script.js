function handleSubmit(event) {
    event.preventDefault();
    
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phone: document.getElementById('phone').value,
        major: document.getElementById('major').value,
        address: document.getElementById('address').value,
        birthdate: document.getElementById('birthdate').value,
        phobiaType: document.getElementById('phobiaType').value,
        severity: document.getElementById('severity').value,
        phobiaStart: document.getElementById('phobiaStart').value,
        dailyEffect: document.getElementById('dailyEffect').value,
        lunch: document.querySelector('input[name="lunch"]:checked')?.value || 'No response',
        timesuit: document.querySelector('input[name="timesuit"]:checked')?.value || 'No response'
    };

    // Show loading state
    const submitButton = document.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = 'Submitting...';
    submitButton.disabled = true;

    // Log the data being sent
    console.log('Sending data:', formData);

    // Create a new form data object
    const form = new FormData();
    form.append('data', JSON.stringify(formData));

    // Send as form data instead of JSON
    fetch('https://script.google.com/macros/s/AKfycbycU3nYyksdIL1YWIYcORPbavZBpLVyPGYE8ljHO_O3HxV7XI_vuVQVuQrbNa7eTbS4/exec', {  // Replace with the URL you just copied
        method: 'POST',
        body: form,
        mode: 'no-cors'
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok');
    })
    .then(data => {
        console.log('Success:', data);
        showSuccessMessage('Thank you for registering! We will contact you soon.');
        document.getElementById('registrationForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        // Try alternative method if first attempt fails
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxXZN8GRLa_jLkqx-KMwEPREKO8hgOI_TqrFVSURD5624ggeGU3LZdZ-5LzeafztVi4/exec';
        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: form
        })
        .then(response => {
            showSuccessMessage('Thank you for registering! We will contact you soon.');
            document.getElementById('registrationForm').reset();
        })
        .catch(fetchError => {
            console.error('Fetch Error:', fetchError);
            showSuccessMessage('Error submitting form. Please try again.');
        });
    })
    .finally(() => {
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.floating-icons-container');
    const imagePaths = [
        'img1.png',
        'img2.png',
        'img3.png',
        'img4.png',
        'img5.png',
        'img6.png',
        'img7.png',
        'img8.png',
        'img9.png',
        'img10.png',
        'img11.png',
        'img12.png',
        'img13.png',
        'img14.png',
        'img15.png',
        'img16.png'
    ];

    const createIcon = function(delay = 0) {
        const icon = document.createElement('div');
        icon.className = 'icon';
        
        // Random image with error handling
        const randomImage = imagePaths[Math.floor(Math.random() * imagePaths.length)];
        const img = new Image();
        img.onload = function() {
            icon.style.backgroundImage = `url('${randomImage}')`;
        };
        img.onerror = function() {
            console.warn(`Failed to load image: ${randomImage}`);
            // Try alternative path or skip
            const altPath = randomImage.replace('icons/', '');
            icon.style.backgroundImage = `url('${altPath}')`;
        };
        img.src = randomImage;
        
        // Random position and animation
        const duration = 15 + Math.random() * 20; // Increased duration range
        const verticalPos = Math.random() * 100;
        const size = 20 + Math.random() * 40; // Adjusted size range
        const startPosition = -100 - (Math.random() * 200); // Random start position
        
        icon.style.top = `${verticalPos}%`;
        icon.style.width = `${size}px`;
        icon.style.height = `${size}px`;
        icon.style.opacity = 0.3 + Math.random() * 0.3; // Random opacity
        icon.style.left = `${startPosition}px`; // Set initial position
        icon.style.animation = `floatAcross ${duration}s linear ${delay}s infinite`; // Added infinite animation
        
        container.appendChild(icon);
    };

    // Create 100 icons with slight delays
    for (let i = 0; i < 100; i++) {
        const delay = Math.random() * 20; // Random delay up to 20 seconds
        createIcon(delay);
    }

    // Remove the setInterval since we want the icons to loop infinitely
    // The animation will continue automatically due to the 'infinite' property

    // Initialize radio button handlers
    handleRadioSelection();

    // Check if header icons loaded properly
    const headerIcons = document.querySelectorAll('.header-icon');
    headerIcons.forEach(icon => {
        icon.addEventListener('load', function() {
            console.log('Icon loaded successfully');
            this.style.opacity = '1';
        });
        
        icon.addEventListener('error', function() {
            console.error('Failed to load icon:', this.src);
            // Try alternative path
            if (this.src.includes('icons/@16.png')) {
                this.src = '@16.png'; // Try without icons/ directory
            }
        });
    });
});

function showTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabId);
    selectedTab.style.display = 'block';
    
    // Handle images in the newly shown tab
    const tabImages = selectedTab.querySelectorAll('.image-container img');
    tabImages.forEach(img => {
        img.classList.remove('loaded');
        // Trigger reflow
        void img.offsetWidth;
        img.classList.add('loaded');
    });
}

function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.style.transform = 'translateX(200%)';
        setTimeout(() => messageDiv.remove(), 500);
    }, 3000);
}

function addCountdownTimer() {
    const eventDate = new Date('December 1, 2024 08:00:00').getTime();
    const timerDiv = document.createElement('div');
    timerDiv.className = 'countdown-timer';
    
    setInterval(() => {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        timerDiv.innerHTML = `Event starts in: ${days}d ${hours}h`;
    }, 1000);
    
    document.querySelector('.event-details').prepend(timerDiv);
}

function toggleLanguage() {
    const html = document.documentElement;
    const button = document.getElementById('langToggle');
    
    if (html.lang === 'en') {
        html.lang = 'ar';
        button.textContent = 'English';
        document.body.style.direction = 'rtl';
    } else {
        html.lang = 'en';
        button.textContent = 'عربي';
        document.body.style.direction = 'ltr';
    }
    
    // Force reflow of floating labels
    const inputs = document.querySelectorAll('.input-group input, .input-group textarea');
    inputs.forEach(input => {
        if (input.value) {
            const label = input.nextElementSibling;
            if (label) {
                label.style.display = 'none';
                setTimeout(() => label.style.display = '', 0);
            }
        }
    });
}

// Update severity value display
document.getElementById('severity').addEventListener('input', function(e) {
    const value = e.target.value;
    document.getElementById('severityValue').textContent = value;
    
    // Update markers
    document.querySelectorAll('.severity-marker').forEach((marker, index) => {
        if (index + 1 <= value) {
            marker.classList.add('active');
        } else {
            marker.classList.remove('active');
        }
    });
});

// Add this function to handle radio button selections
function handleRadioSelection() {
    const radioGroups = document.querySelectorAll('.radio-group');
    
    radioGroups.forEach(group => {
        const radios = group.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.addEventListener('click', function() {
                // Unselect all other radios in this group
                radios.forEach(r => {
                    if (r !== this) {
                        r.checked = false;
                    }
                });
                // Toggle the clicked radio
                this.checked = !this.dataset.wasChecked;
                this.dataset.wasChecked = this.checked;
            });
        });
    });
}

function loadIcon(iconPath) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = iconPath;
        
        img.onload = () => resolve(img);
        img.onerror = () => {
            console.error('Failed to load icon:', iconPath);
            reject(new Error(`Failed to load icon: ${iconPath}`));
        };
    });
}

document.addEventListener('scroll', function() {
    const scrollPercent = (window.scrollY) / (document.documentElement.scrollHeight - window.innerHeight);
    const body = document.body;
    
    // Update background position based on scroll
    body.style.backgroundPosition = `0 ${scrollPercent * 100}%`;
    
    // Optional: Add fade effect to floating icons
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
        icon.style.opacity = Math.max(0.1, 0.4 - (scrollPercent * 0.3));
    });
}); 