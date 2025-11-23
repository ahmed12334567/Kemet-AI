document.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        let email = document.getElementById('email');
        let password = document.getElementById('password');
        let emailErr = document.querySelector('#emailErr');
        let passwordErr = document.querySelector('#passwordErr');
        let emailValue = email.value.trim();
        let passwordValue = password.value.trim();

        let valid = true;

        if (emailValue === '' ||
            /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(emailValue) == false) {
            emailErr.textContent = 'Please enter a valid email address.';
            valid = false;

        } else {
            emailErr.textContent = '';
        }

        if (passwordValue === '' ||
            /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/ .test(passwordValue) == false) {

            passwordErr.textContent = 'Please enter a valid password.';
            valid = false;
        } else {
            passwordErr.textContent = '';
        }

        if (!valid) e.preventDefault();

    });
});
