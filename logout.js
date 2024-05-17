
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDI-WMRTcHkQz8dW4M67Xbnb1ZUFXu7pIc",
    authDomain: "chronic-kidney-disease-1436c.firebaseapp.com",
    projectId: "chronic-kidney-disease-1436c",
    storageBucket: "chronic-kidney-disease-1436c.appspot.com",
    messagingSenderId: "64335179656",
    appId: "1:64335179656:web:ff252294e76ae93c82543d",
    measurementId: "G-RQRLG22SWY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = firebase.auth();

// Logout function
function logout() {
    auth.signOut()
        .then(() => {
            // Sign-out successful.
            displayMessage('User Logged Out!');
            // Redirect to the login page
            window.location.href = 'index.html';
        })
        .catch((error) => {
            // An error happened.
            displayMessage('Error logging out: ' + error.message);
        });
}

// Function to display messages
function displayMessage(message) {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = message;
}

