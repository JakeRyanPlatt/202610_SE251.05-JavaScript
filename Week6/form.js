// JavaScript Document

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve form & input elements
    const form = document.querySelector('form[name=info]');
    const firstNameInput = document.querySelector('#first-name');
    const lastNameInput = document.querySelector('#last-name');
    const emailInput = document.querySelector('#email');
    const emailConfirmInput = document.querySelector('#email-confirm');
    const phoneInput = document.querySelector('#phone');
    const submitButton = document.querySelector('input[type="button"]');
    // Retrieve error span elements
    const fnError = document.querySelector('#fn-error');
    const lnError = document.querySelector('#ln-error');
    const emailError = document.querySelector('#email-error');
    const emailConfirmError = document.querySelector('#email-confirm-error');
    const phoneError = document.querySelector('#phone-error');

    // Get Confirmation DIV
    const confirmationDiv = document.querySelector('#confirmation');
    const infoDisplay = document.querySelector('#info');

    // Function to show error
    function showError(errorSpan, input, message) {
        errorSpan.innerHTML = `*  ${message}`;
        errorSpan.style.color = 'red';

        //Find label from previous sibling or parents previous context 
        const paragraph = input.parentElement;
        paragraph.classList.add('error-label');
    }

    //fucntion to clear error
    function clearError(errorSpan, input){
        if (errorSpan){
            errorSpan.innerHTML = '';
        }
        const paragraph = input.parentElement;
        if (paragraph){
            paragraph.classList.remove('error-label');
        }
    }
    

    // Name validation regex
    const nameRegex = /^[A-Za-z][A-Za-z'-]*$/;

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Phone validation regex
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

    // Submit button clicker handler *fixed circular reference issue*
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        let isValid = true;   

        const fields = [
            {
                input: firstNameInput,
                error: fnError,
                message: 'First Name is Required',
                type: 'required'
            },
            {
                input: lastNameInput,
                error: lnError,
                message: 'Last Name is Required',
                type: 'required'
            },
            {
                input: emailInput,
                error: emailError,
                message: 'Valid Email Address is Required',
                type: 'email'
            },
            {
                input: emailConfirmInput,
                error: emailConfirmError,
                message: 'Emails must match',
                type: 'emailConfirm'
            },
            {
                input: phoneInput,
                error: phoneError,
                message: 'Phone Number is Required (Format: 555-555-5555)',
                type: 'phone' 
            },
       
        ];
 
        // Loop through all field and validate
        for (let field of fields){
            const value = field.input.value;
            // Validation functions for each field type
            const validationRules = {
                'required': () => value.trim() !== '' && nameRegex.test(value),
                'email': () => value.trim() !== '' && emailRegex.test(value),
                'emailConfirm': () => value === emailInput.value && value.trim() !== '',
                'phone': () => value.trim() !== '' && phoneRegex.test(value)
            };
        // Run the correct validation function
        const fieldIsValid = validationRules[field.type]();

        if (!fieldIsValid){
            showError(field.error, field.input, field.message);
            isValid = false;
        }else{
            clearError(field.error, field.input);
        }
    }
        if (isValid){
            // Create object to hold form information
            const userInfo = {
                name: `${firstNameInput.value} ${lastNameInput.value}`,
                email: emailInput.value,
                number: phoneInput.value
            };

            // Hide the form, show confirmation\
            document.querySelector('#form').style.display = 'none';
            confirmationDiv.style.display = 'block';

            // Display submitted information
            infoDisplay.innerHTML = `
                <strong>First Name:</strong> ${firstNameInput.value}<br>
                 ${userInfo.name}<br>
                 ${userInfo.email}<br>
                 ${userInfo.number}
                `;
        }
    });
}); 

