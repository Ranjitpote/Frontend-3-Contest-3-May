// Signup page
const signupForm = document.getElementById("signup-form");
const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get form input values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Perform form validation
  if (!name || !email || !password) {
    errorMessage.textContent = "All fields are mandatory";
    errorMessage.style.display = "block";
    return;
  }

  // Generate access token
  const accessToken = generateAccessToken();

  // Create user object
  const user = {
    name: name,
    email: email,
    password: password,
    accessToken: accessToken,
  };

  // Save user object to local storage
  localStorage.setItem("user", JSON.stringify(user));

  // Display success message
  successMessage.textContent = "Signup successful! Redirecting to profile...";
  successMessage.style.display = "block";

  // Redirect to profile page after a short delay
  setTimeout(() => {
    window.location.href = "/profile.html";
  }, 2000);

  // Clear the form fields
  signupForm.reset();

  // Clear error message
  errorMessage.style.display = "none";
});

// Profile page
const profileContainer = document.getElementById("profile-container");
const nameElement = document.getElementById("name");
const emailElement = document.getElementById("email");
const logoutButton = document.getElementById("logout-button");

// Check if user is authenticated
const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  // User is authenticated, display profile details
  nameElement.textContent = `Name: ${user.name}`;
  emailElement.textContent = `Email: ${user.email}`;
  profileContainer.style.display = "block";
} else {
  // User is not authenticated, redirect to signup page
  window.location.href = "/signup.html";
}

// Logout functionality
logoutButton.addEventListener("click", () => {
  // Clear user state from local storage
  localStorage.removeItem("user");
  // Redirect to signup page
  window.location.href = "/signup.html";
});

// Generate random 16-byte access token
function generateAccessToken() {
  const tokenLength = 16;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";

  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
}
