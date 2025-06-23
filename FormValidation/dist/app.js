"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('validation');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // clearErrors();
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const password = document.getElementById('password');
        let isValid = true;
        if (!name.value.trim() || name.value.trim().length < 2) {
            showError(name, "name should be more than two characters");
            isValid = false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            showError(email, "Please enter the correct email");
            isValid = false;
        }
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone.value.trim())) {
            showError(phone, "Enter the correct phone no!");
            isValid = false;
        }
        if (password.value.length < 6) {
            showError(password, "Password must be of 6 letters");
            isValid = false;
        }
        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
        }
    });
    function showError(input, message) {
        const formControl = input.parentElement;
        formControl.classList.add('error');
        const errorDisplay = document.createElement('small');
        errorDisplay.className = 'error-message';
        errorDisplay.textContent = message;
        formControl.appendChild(errorDisplay);
    }
    function clearErrors() {
        document.querySelectorAll('.error').forEach((el) => {
            el.classList.remove('error');
        });
        document.querySelectorAll('.error-message').forEach((el) => {
            el.remove();
        });
    }
});
