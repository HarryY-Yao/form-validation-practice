const form = document.querySelector("form");
const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");

email.addEventListener("input", (event) => {
  if (email.validity.valid) {
    emailError.textContent = ""; // Remove the message content
    emailError.className = "error"; // Removes the `active` class
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

form.addEventListener("submit", (event) => {
  // if the email field is invalid
  if (!email.validity.valid) {
    // display an appropriate error message
    showError();
    // prevent form submission
    event.preventDefault();
  } if (postalCodeField.classList.contains("invalid")) {
    checkPostalCode();
    event.preventDefault();
  } if (!passwordField.validity.valid) {
    showPasswordError();
    event.preventDefault();
  } if (!confirmPasswordField.validity.valid) {
    showConfirmPasswordError();
    event.preventDefault();
  } if (confirmPasswordField.value != passwordField.value) {
    showConfirmPasswordError();
    event.preventDefault();
  }

});

function showError() {
  if (email.validity.valueMissing) {
    // If empty
    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    // If it's not an email address,
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (email.validity.tooShort) {
    // If the value is too short,
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }
  // Add the `active` class
  emailError.className = "error active";
}

const countrySelect = document.getElementById("country");
const postalCodeField = document.getElementById("postal-code");
const postalCodeError = document.querySelector("#postal-code + span.error");

function checkPostalCode() {
  // For each country, defines the pattern that the postal code has to follow
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  };

  // Read the country id
  const country = countrySelect.value;

  // Build the constraint checker
  const constraint = new RegExp(constraints[country][0], "");
  console.log(constraint);

  // Check it!
  if (constraint.test(postalCodeField.value)) {
    // The postal code follows the constraint, we use the ConstraintAPI to tell it
    postalCodeError.textContent = "";
    postalCodeError.className = "error";
    postalCodeField.classList.remove("invalid");
  } else if (postalCodeField.validity.valueMissing) {
        postalCodeError.textContent = "You need to enter a postal code";
        postalCodeError.className = "error active";
        postalCodeField.classList.add("invalid");
} else {
    // The postal code doesn't follow the constraint, we use the ConstraintAPI to
    // give a message about the format required for this country
    postalCodeError.textContent = constraints[country][1];
    postalCodeError.className = "error active";
    postalCodeField.classList.add("invalid");
  }
}

countrySelect.addEventListener("change", checkPostalCode);
postalCodeField.addEventListener("input", checkPostalCode);

const passwordField = document.getElementById("password");
const passwordError = document.querySelector("#password + .error");

passwordField.addEventListener("input", (event) => {
    if (passwordField.validity.valid) {
        passwordError.textContent = "";
        passwordError.className = "error";
    } else {
        showPasswordError();
    }
});

function showPasswordError() {
    if (passwordField.validity.valueMissing) {
        passwordError.textContent = "You must enter a password";
    } else {
        passwordError.textContent = "Your password must be at least 8 characters";
    }

    passwordError.className = "error active";
}

const confirmPasswordField = document.getElementById("confirm-password");
const confirmPasswordError = document.querySelector("#confirm-password + .error");

confirmPasswordField.addEventListener("input", (event) => {
    if (confirmPasswordField.validity.valid && confirmPasswordField.value == passwordField.value) {
        confirmPasswordError.textContent = "";
        confirmPasswordError.className = "error";
    } else {
        showConfirmPasswordError();
    }
});

function showConfirmPasswordError() {
    if (confirmPasswordField.validity.valueMissing) {
        confirmPasswordError.textContent = "You must confirm your password";
    } else if (confirmPasswordField.value != passwordField.value) {
        confirmPasswordError.textContent = "Passwords don't match";
    }

    confirmPasswordError.className = "error active";
}