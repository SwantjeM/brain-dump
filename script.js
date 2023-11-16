// Get references to the form elements
const textForm = document.getElementById("textForm");
const textInput = document.getElementById("textInput");
const saveButton = document.getElementById("saveButton");

var countdownTime = 15; // 3 minutes * 60 seconds
var timerElement = document.getElementById('timer');
var startButton = document.getElementById('startButton');
var modal = document.getElementById('startModal');
var confirmButton = document.getElementById('confirmButton');
var cancelButton = document.getElementById('cancelButton');

// Additional code for countdown timer in the second modal
var confirmationTime = 5; // 1 minute countdown for confirmation
var confirmationTimerElement = document.getElementById('confirmationTimer');
var confirmationConfirmButton = document.getElementById('confirmationConfirmButton');
var confirmationModal = document.getElementById('confirmationModal');


var currentDate = new Date();

let entries = [];

// Add an event listener to the Save button
saveButton.addEventListener("click", function () {
    // Get the text input value
    const inputText = textInput.value;

    // Check if the input is not empty
    if (inputText.trim() !== "") {
        newEntry = {
            "name": inputText,
            "timestamp": currentDate,
        }

        entries.push(newEntry);

        // Clear the input field
        textInput.value = "";
    }
});

// document.addEventListener("DOMContentLoaded", function () {
//     var myList = document.getElementById("listpresents");

//     // Get the current date
//     var currentDate = new Date();

//     // Loop through 
//     entries.forEach(function (item) {
//     // var entryTimestamp = new Date(item.timestamp);

//         // Check if the entry's timestamp is from today
//         //if (entryTimestamp.getDate() === currentDate.getDate()) {
//             var li = document.createElement("li");
//             li.textContent = item.name 
//             myList.appendChild(li);
//     // }
//     });
// });

// Display the entries when the timer runs out and user confirms
function displayEntries() {
    var myList = document.getElementById("listpresents");

    entries.forEach(function (item) {
        var li = document.createElement("li");
        li.textContent = item.name;
        myList.appendChild(li);
    });
}

// When the timer runs out...
function timerRunOut() {
    timerElement.textContent = '00:00';

    // Display a confirmation modal with a countdown timer
    confirmationModal.style.display = 'block';
    startConfirmationTimer(); // Start the confirmation timer
}

// If the user clicks "OK" in the modal, start the timer
confirmButton.onclick = function () {
    startCountdown();
};

// If the user clicks "Cancel" in the modal, you can handle this case as needed
cancelButton.onclick = function () {
    alert('Timer not started');
    modal.style.display = 'none';
};

// Show the modal when the page loads
modal.style.display = 'block';



function updateTimer() {
    var minutes = Math.floor(countdownTime / 60);
    var seconds = countdownTime % 60;

    // Add leading zeros if needed
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timerElement.textContent = minutes + ':' + seconds;
}

function startCountdown() {
    countdown();
    startButton.style.display = 'none'; // Hide the button after starting the timer
    modal.style.display = 'none'; // Hide the modal after starting the timer
}

function countdown() {
    updateTimer();

    if (countdownTime > 0) {
        countdownTime--;
        setTimeout(countdown, 1000); // Update every second
    } else {
        timerElement.textContent = '00:00';
        timerRunOut();
    }
}

// Show the modal when the page loads
modal.style.display = 'block';

// If the user clicks "OK" in the modal, start the timer
confirmButton.onclick = function() {
    startCountdown();
};

// If the user clicks "Cancel" in the modal, you can handle this case as needed
cancelButton.onclick = function() {
    // Handle the cancellation, for example, provide another way to start the timer
    alert('Timer not started');
    modal.style.display = 'none';
};



function updateConfirmationTimer() {
    var minutes = Math.floor(confirmationTime / 60);
    var seconds = confirmationTime % 60;

    // Add leading zeros if needed
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    confirmationTimerElement.textContent = minutes + ':' + seconds;
}

function startConfirmationTimer() {
    updateConfirmationTimer();

    if (confirmationTime > 0) {
        confirmationTime--;
        setTimeout(startConfirmationTimer, 1000); // Update every second
    } else {
        // Enable the "OK" button after the timer runs out
        confirmationConfirmButton.removeAttribute('disabled');
    }
}


// If the user clicks "OK" in the second modal, show the entries
confirmationConfirmButton.onclick = function() {
    displayEntries();
    confirmationModal.style.display = 'none'; // Hide the second modal after showing entries
};

// If the user clicks "Cancel" in the second modal, you can handle this case as needed
confirmationCancelButton.onclick = function() {
    alert('Feel free to relax some more!');
   // confirmationModal.style.display = 'none';
};