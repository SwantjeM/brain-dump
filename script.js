// Get references to the form elements
const textForm = document.getElementById("textForm");
const textInput = document.getElementById("textInput");
const saveButton = document.getElementById("saveButton");
const formWrapper = document.getElementById("formWrapper");
const presentWrapper = document.getElementById("presentWrapper")
const main = document.getElementById("main")


var countdownTime = 180; // 3 minutes * 60 seconds
var timerElement = document.getElementById('timer');
var startButton = document.getElementById('startButton');
var modal = document.getElementById('startModal');
var confirmButton = document.getElementById('confirmButton');
var cancelButton = document.getElementById('cancelButton');

// Additional vars for countdown timer in the second modal
var confirmationModal = document.getElementById('confirmationModal');

presentWrapper.style.display = 'none'
// readyForEntries.style.display = "none"
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

function updateConfirmationTimer(confirmationTime) {
    var minutes = Math.floor(confirmationTime / 60);
    var seconds = confirmationTime % 60;


    // Add leading zeros if needed
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
   // var confirmationTimerElement = document.getElementById('confirmationTimer');
  //  confirmationTimerElement.textContent = minutes + ':' + seconds;
}

function startConfirmationTimer(confirmationConfirmButton, confirmationTime) {
    updateConfirmationTimer(confirmationTime);
    console.log({confirmationTime})
    if (confirmationTime > 0) {
        confirmationTime--;
        setTimeout(()=>startConfirmationTimer(confirmationConfirmButton, confirmationTime), 1000); // Update every second
    } else {
        // Enable the "OK" button after the timer runs out
        // readyForEntries.style.display = "inline"
        //  confirmationConfirmButton.style.display = "block"
        //  confirmationCancelButton.style.display = "block"
        console.log("remove disabled", {confirmationTime})
        confirmationConfirmButton.removeAttribute('disabled');
    }
}

// When the timer runs out...
function timerRunOut() {
    timerElement.textContent = '00:00';
    // Display a confirmation modal with a countdown timer

    confirmationModal.style.display = 'block';
    var confirmationTime = 30; // 1 minute countdown for confirmation
    var confirmationConfirmButton = document.getElementById('confirmationConfirmButton');
    var readyForEntries = document.getElementById("readyForEntries")
    // readyForEntries.style.display = "none"
    // confirmationConfirmButton.style.display = "none"
    // confirmationCancelButton.style.display = "none"
    startConfirmationTimer(confirmationConfirmButton, confirmationTime); // Start the confirmation timer
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