function triggerBurningEffect() {
    const fireSound = new Audio('fire-sound.mp3');
    fireSound.volume = 0.7;
    fireSound.loop = true;
    
    // Start with sound
    fireSound.play();
    
    // Add burning class to body
    document.body.classList.add('burning');
    
    // Create intense ember effect
    function createBurningEmber() {
        const ember = document.createElement('div');
        ember.className = 'ember';
        ember.style.left = Math.random() * 100 + 'vw';
        ember.style.bottom = '0';
        ember.style.animationDuration = (Math.random() * 2 + 1) + 's';
        document.body.appendChild(ember);

        ember.addEventListener('animationend', () => ember.remove());
    }

    // Create embers rapidly during the burning effect
    const emberInterval = setInterval(createBurningEmber, 30);
    
    // Stop the effect and redirect after animation
    setTimeout(() => {
        clearInterval(emberInterval);
        fireSound.pause();
        window.location.replace('success.html');
        if (!window.location.replace) {
            window.location = 'success.html';
        }
    }, 4000);
}

// Form submission handler - Temporary dev version
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Temporarily removed validation check for development
    // const isValid = this.checkValidity();
    
    // Always trigger the effect for testing
    const inputs = this.querySelectorAll('input, textarea, select, button');
    inputs.forEach(input => input.disabled = true);
    
    triggerBurningEffect();
    
    /* Original validation code - commented out for dev
    if (isValid) {
        const inputs = this.querySelectorAll('input, textarea, select, button');
        inputs.forEach(input => input.disabled = true);
        triggerBurningEffect();
    } else {
        this.reportValidity();
    }
    */
}); 