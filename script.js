// Get references to the form elements
const textForm = document.getElementById("textForm");
const textInput = document.getElementById("textInput");
const saveButton = document.getElementById("saveButton");
const formWrapper = document.getElementById("formWrapper");
const presentWrapper = document.getElementById("presentWrapper")
const main = document.getElementById("main")

var countdownTime = 15; // 3 minutes * 60 seconds
var timerElement = document.getElementById('timer');
var startButton = document.getElementById('startButton');
var modal = document.getElementById('startModal');
var confirmButton = document.getElementById('confirmButton');
var cancelButton = document.getElementById('cancelButton');

// Additional vars for countdown timer in the second modal
var confirmationTime = 5; // 1 minute countdown for confirmation
var confirmationTimerElement = document.getElementById('confirmationTimer');
var confirmationConfirmButton = document.getElementById('confirmationConfirmButton');
var confirmationModal = document.getElementById('confirmationModal');
var readyForEntries = document.getElementById("readyForEntries")

presentWrapper.style.display = 'none'
readyForEntries.style.display = "none"
let entries = [];

// Add an event listener to the Save button
saveButton.addEventListener("click", function () {
    const inputText = textInput.value;

    // Check if the input is not empty
    if (inputText.trim() !== "") {
        newEntry = {
            "name": inputText,
        }
        entries.push(newEntry);
        textInput.value = "";  // Clear the input field
    }
});

// First modal configuration:
modal.style.display = 'block';  // Show the modal when the page loads

// first modal to start timer, incl. cancel button: 
confirmButton.onclick = function () {
    startCountdown();
};
cancelButton.onclick = function () {
    alert('Timer not started');
    modal.style.display = 'none';
};
startButton.onclick = function () {startCountdown()};

// countdown
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


function updateTimer() {
    var minutes = Math.floor(countdownTime / 60);
    var seconds = countdownTime % 60;

    // Add leading zeros if needed
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timerElement.textContent = minutes + ':' + seconds;
}

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
        readyForEntries.style.display = "inline"
        // confirmationConfirmButton.style.display = "inline"
        // confirmationCancelButton.style.display = "inline"
        confirmationConfirmButton.removeAttribute('disabled');
    }
}

// When the timer runs out...
function timerRunOut() {
    timerElement.textContent = '00:00';
    // Display a confirmation modal with a countdown timer
    confirmationModal.style.display = 'block';
    confirmationConfirmButton.style.display = "none"
    confirmationCancelButton.style.display = "none"
    startConfirmationTimer(); // Start the confirmation timer
}



// second modal:
// If the user clicks "OK" in the second modal, show the entries
confirmationConfirmButton.onclick = function() {
    displayEntries();
    presentWrapper.style.display = 'block'
    formWrapper.style.display = 'none'
    timerElement.style.display = 'none'
    confirmationModal.style.display = 'none'; // Hide the second modal after showing entries
};
confirmationCancelButton.onclick = function() {
    alert('Feel free to relax some more!');
};

// Display the entries when the timer runs out and user confirms
function displayEntries() {
    var myList = document.getElementById("listpresents");
    entries.forEach(function (item) {
        var li = document.createElement("li");
        li.textContent = item.name;
        myList.appendChild(li);
    });
}