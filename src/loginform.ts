function submit() {
    const usernameInput = document.getElementById('username') as HTMLInputElement
    const name:string = usernameInput.value

    const emailInput = document.getElementById('email') as HTMLInputElement
    const email:string = emailInput.value

    const ageInput = document.getElementById('age') as HTMLInputElement
    const age:string = ageInput.value


    console.log(`Username: ${name}, Email: ${email}, Age: ${age}`);
    
    
    

}

