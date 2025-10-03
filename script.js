const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValide = validateInputs();
    if (allValide) resetForm();
});

function validateInputs() {
    const inputs = form.querySelectorAll('input');
    let isFormValid = true;

    inputs.forEach(input => {
        const value = input.value.trim();

        if (value === '') {
            showError(input, `${input.placeholder} cannot be empty`);
            isFormValid = false;
        } else if (input.type === 'email' && !isValidEmail(value)) {
            showError(input, 'Looks like this is not an email', true);
            isFormValid = false;
        } else {
            showSuccess(input);
        }
    });
    return isFormValid;
}

function showError(input, message, isEmail = false) {
    // remove old error if exists
    let existingError = input.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();

    // style the input
    input.classList.add('border-red-500');
    input.classList.remove('border-gray-900');

    // add error icon inside input
    input.style.backgroundImage = "url('./images/icon-error.svg')";
    input.style.backgroundRepeat = "no-repeat";
    input.style.backgroundPosition = "right 1rem center";

    //email place holder error
    if (!isEmail && input.type === 'email') {
        input.value = ''; // clear wrong input
        input.placeholder = "email@example/com";
        input.classList.remove('placeholder-gray-400');
        input.classList.add('placeholder-red-500');
    }


    // create error text
    const error = document.createElement('p');
    error.className = 'error-message text-red-500 text-sm mt-1 text-right italic';
    error.innerText = message;

    // make sure error displays under the input
    input.insertAdjacentElement('afterend', error);
}

function showSuccess(input) {
    let existingError = input.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();

    //remove border style 
    input.classList.remove('border-red-500');
    input.classList.add('border-gray-900');

    // remove icon + reset placeholder
    input.classList.remove('placeholder-red-500');
    input.classList.add('placeholder-gray-400');

    //remove the icon
    input.style.backgroundImage = "";
    input.style.backgroundRepeat = "";
    input.style.backgroundPosition = "";
}

function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}


// reset function
function resetForm() {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('border-red-500', 'placeholder-red-500');
        input.classList.add('border-gray-900', 'placeholder-gray-400');

        input.style.backgroundImage = "";
        input.style.backgroundRepeat = "";
        input.style.backgroundPosition = "";

        let existingError = input.parentNode.querySelector('.error-message');
        if (existingError) existingError.remove();
    });
}
