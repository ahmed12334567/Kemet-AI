document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const username = document.getElementById("username");
  const usernameErr = document.getElementById("usernameErr");
  const email = document.getElementById("email");
  const emailErr = document.getElementById("emailErr");
  const password = document.getElementById("password");
  const passwordErr = document.getElementById("passwordErr");
  const confirmPassword = document.getElementById("Cpassword");
  const confirmPasswordErr = document.getElementById("confirmPasswordErr");

  // Password policy:
  // at least 8 chars, one lowercase, one uppercase, one digit, one special char
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  // helper to set error
  function setError(el, msg) {
    if (el) el.textContent = msg;
  }
  function clearError(el) {
    if (el) el.textContent = "";
  }

  // live validation: clear errors while typing
  [username, email, password, confirmPassword].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => {
      // clear related error
      if (input === username) clearError(usernameErr);
      if (input === email) clearError(emailErr);
      if (input === password) clearError(passwordErr);
      if (input === confirmPassword) clearError(confirmPasswordErr);
    });
  });

  form.addEventListener("submit", (e) => {
    let valid = true;

    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;

    // Username
    if (usernameValue === "" || usernameValue.length < 3) {
      setError(usernameErr, "Username must be at least 3 characters long.");
      valid = false;
    } else {
      clearError(usernameErr);
    }

    // Email
    // simple email validation (HTML email type also helps)
    if (emailValue === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setError(emailErr, "Please enter a valid email address.");
      valid = false;
    } else {
      clearError(emailErr);
    }

    // Password strength
    if (!passwordRegex.test(passwordValue)) {
      setError(passwordErr, "Password must be ≥8 chars and include uppercase, lowercase, number and special character.");
      valid = false;
    } else {
      clearError(passwordErr);
    }

    // Confirm password
    if (passwordValue !== confirmPasswordValue) {
      setError(confirmPasswordErr, "Passwords do not match.");
      valid = false;
    } else {
      clearError(confirmPasswordErr);
    }

    if (!valid) {
      e.preventDefault();
      // optionally focus first invalid field
      if (usernameErr.textContent) username.focus();
      else if (emailErr.textContent) email.focus();
      else if (passwordErr.textContent) password.focus();
      else if (confirmPasswordErr.textContent) confirmPassword.focus();
    }
  });
});
