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
