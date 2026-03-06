// Password visibility toggle
const togglePasswordBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePasswordBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePasswordBtn.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
});

// Form validation and submission
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInputField = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const formError = document.getElementById('formError');

// Username validation
usernameInput.addEventListener('blur', function() {
    validateUsername();
});

usernameInput.addEventListener('input', function() {
    if (usernameError.classList.contains('show')) {
        usernameError.classList.remove('show');
    }
});

function validateUsername() {
    const username = usernameInput.value.trim();
    
    if (username === '') {
        showError(usernameError, 'Username or account number is required');
        return false;
    }
    
    if (username.length < 3) {
        showError(usernameError, 'Username must be at least 3 characters');
        return false;
    }
    
    hideError(usernameError);
    return true;
}

// Password validation
passwordInputField.addEventListener('blur', function() {
    validatePassword();
});

passwordInputField.addEventListener('input', function() {
    if (passwordError.classList.contains('show')) {
        passwordError.classList.remove('show');
    }
});

function validatePassword() {
    const password = passwordInputField.value;
    
    if (password === '') {
        showError(passwordError, 'Password is required');
        return false;
    }
    
    if (password.length < 6) {
        showError(passwordError, 'Password must be at least 6 characters');
        return false;
    }
    
    hideError(passwordError);
    return true;
}

// Form submission
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Hide any previous errors
    hideError(formError);
    
    // Validate all fields
    const usernameValid = validateUsername();
    const passwordValid = validatePassword();
    
    if (!usernameValid || !passwordValid) {
        return;
    }
    
    // Disable button and show loading state
    const loginButton = loginForm.querySelector('.login-button');
    const originalButtonText = loginButton.textContent;
    loginButton.disabled = true;
    loginButton.textContent = 'Logging in...';
    
    try {
        // Simulate API call with a delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Here you would typically send credentials to your backend
        const username = usernameInput.value;
        const password = passwordInputField.value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Demo authentication logic
        if (password === 'Demo123!') {
            // Simulate successful login
            console.log('Login successful', { username, rememberMe });
            
            // Show success message (in real app, redirect to dashboard)
            showSuccess(loginButton, originalButtonText);
            
            // Optional: Store remember me preference
            if (rememberMe) {
                localStorage.setItem('rememberMe', JSON.stringify({ username }));
            } else {
                localStorage.removeItem('rememberMe');
            }
            
            // Simulate redirect after a delay
            setTimeout(() => {
                alert('Login successful! Redirecting to dashboard...\n\nDemo Credentials:\nUsername: any username\nPassword: Demo123!\nRemember Me: checked');
                // window.location.href = '/dashboard';
            }, 1000);
        } else {
            // Show error for invalid credentials
            showError(formError, 'Invalid username or password. Please try again. (Demo password: Demo123!)');
            loginButton.disabled = false;
            loginButton.textContent = originalButtonText;
        }
    } catch (error) {
        console.error('Login error:', error);
        showError(formError, 'An error occurred. Please try again.');
        loginButton.disabled = false;
        loginButton.textContent = originalButtonText;
    }
});

function showError(element, message) {
    element.textContent = message;
    element.classList.add('show');
}

function hideError(element) {
    element.classList.remove('show');
    element.textContent = '';
}

function showSuccess(button, originalText) {
    button.textContent = '✓ Login successful!';
    button.style.background = 'linear-gradient(135deg, #388e3c, #2e7d32)';
}

// Load remember me data on page load
window.addEventListener('DOMContentLoaded', function() {
    try {
        const remembered = localStorage.getItem('rememberMe');
        if (remembered) {
            const data = JSON.parse(remembered);
            usernameInput.value = data.username;
            document.getElementById('rememberMe').checked = true;
        }
    } catch (error) {
        console.error('Error loading remember me data:', error);
    }
});

// Forgot password link handler
document.querySelector('.forgot-password-link').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Forgot password? Please reset your password here.\n\nThis would typically link to: https://client.schwab.com/secure/accountaccess/auth/forgotpassword');
});

// Signup link handler
document.querySelector('.signup-link').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Open an account with Charles Schwab.\n\nThis would typically link to: https://www.schwab.com/open-account');
});

// Biometric login handler
document.querySelector('.alt-login-button.biometric').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Biometric login is not available in this demo.\n\nIn a real application, this would use WebAuthn/FIDO2 authentication.');
});

// Security Center link
document.querySelector('.footer-links a:first-child').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Security Center would open here.\n\nThis provides information about securing your account.');
});

// Help link
document.querySelectorAll('.footer-links a')[1].addEventListener('click', function(e) {
    e.preventDefault();
    alert('Help & Support would open here.\n\nFor customer support: 1-800-SCHWAB-1 (1-800-734-2210)');
});

// Privacy link
document.querySelectorAll('.footer-links a')[2].addEventListener('click', function(e) {
    e.preventDefault();
    alert('Privacy Policy would open here.\n\nTo learn more about how Schwab protects your data.');
});

// Allow Enter key to submit form
loginForm.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        loginForm.dispatchEvent(new Event('submit'));
    }
});
