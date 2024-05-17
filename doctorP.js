var firebaseConfig = {
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

// Set database variable
var database = firebase.database();

function save() {
    var patientName = document.getElementById('patientName').value;
    var patientAge = document.getElementById('patientAge').value;
    // var prescriptionDay = document.getElementById('prescriptionDay').value;
    var prescriptionMedicine = document.getElementById('prescriptionMedicine').value;
    var prescriptionInstructions = document.getElementById('prescriptionInstructions').value;

    database.ref('prescriptions/' + patientName).set({
        patientName: patientName,
        patientAge: patientAge,
        // prescriptionDay: prescriptionDay,
        prescriptionMedicine: prescriptionMedicine,
        prescriptionInstructions: prescriptionInstructions
    }).then(function () {
        displayMessage('Prescription saved successfully.');
    }).catch(function (error) {
        console.error('Error saving prescription: ', error);
        displayMessage('Error saving prescription: ' + error.message);
    });
}

function get() {
    var patientName = document.getElementById('patientDropdown').value;

    database.ref('prescriptions/' + patientName).once('value').then(function (snapshot) {
        var prescription = snapshot.val();
        if (prescription) {
            // Format prescription information
            var formattedPrescription = `
                Patient Name: ${prescription.patientName}   
                Patient Age: ${prescription.patientAge} 
                Prescription Medicine: ${prescription.prescriptionMedicine} 
                // Prescription Day: ${prescription.prescriptionDay}   
                Prescription Instructions: ${prescription.prescriptionInstructions} 
            `;
            displayMessage(formattedPrescription);
        } else {
            displayMessage('Prescription not found for the provided patient name.');
        }
    }).catch(function (error) {
        console.error('Error getting prescription: ', error);
        displayMessage('Error getting prescription: ' + error.message);
    });
}

function getdoc() {
    var patientDropdown = document.getElementById('patientDropdown');

    database.ref('prescriptions').once('value').then(function (snapshot) {
        var prescriptions = snapshot.val();
        if (prescriptions) {
            // Clear previous options
            patientDropdown.innerHTML = '';

            // Populate dropdown with patient names
            Object.keys(prescriptions).forEach(function (patientKey) {
                var option = document.createElement('option');
                option.value = prescriptions[patientKey].patientName;
                option.textContent = prescriptions[patientKey].patientName;
                patientDropdown.appendChild(option);
            });

            displayMessage('Patient names loaded successfully.');
        } else {
            displayMessage('No prescriptions found.');
        }
    }).catch(function (error) {
        console.error('Error getting prescriptions: ', error);
        displayMessage('Error getting prescriptions: ' + error.message);
    });
}

function update() {
    var patientName = document.getElementById('patientDropdown').value;
    var prescriptionMedicine = document.getElementById('prescriptionMedicine').value;
    var prescriptionInstructions = document.getElementById('prescriptionInstructions').value;

    // Retrieve the existing prescription details
    database.ref('prescriptions/' + patientName).once('value').then(function (snapshot) {
        var prescription = snapshot.val();
        if (prescription) {
            // Update prescription with new values
            var updates = {
                prescriptionMedicine: prescriptionMedicine || prescription.prescriptionMedicine,
                prescriptionInstructions: prescriptionInstructions || prescription.prescriptionInstructions
            };

            // Update the prescription in the database
            return database.ref('prescriptions/' + patientName).update(updates);
        } else {
            // Prescription not found
            displayMessage('Prescription not found for the provided patient name.');
            throw new Error('Prescription not found');
        }
    }).then(function () {
        // Success message
        displayMessage('Prescription updated successfully.');
    }).catch(function (error) {
        // Error handling
        console.error('Error updating prescription: ', error);
        displayMessage('Error updating prescription: ' + error.message);
    });
}

function remove() {
    var patientName = document.getElementById('patientDropdown').value;

    database.ref('prescriptions/' + patientName).remove().then(function () {
        displayMessage('Prescription deleted successfully.');
    }).catch(function (error) {
        console.error('Error deleting prescription: ', error);
        displayMessage('Error deleting prescription: ' + error.message);
    });
}

// Function to display messages
function displayMessage(message) {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = message;
}
