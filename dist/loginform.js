"use strict";
function submit() {
    const usernameInput = document.getElementById('username');
    const name = usernameInput.value;
    const emailInput = document.getElementById('email');
    const email = emailInput.value;
    const ageInput = document.getElementById('age');
    const age = ageInput.value;
    console.log(`Username: ${name}, Email: ${email}, Age: ${age}`);
}
