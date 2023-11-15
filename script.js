// Get references to the form elements
const textForm = document.getElementById("textForm");
const textInput = document.getElementById("textInput");
const saveButton = document.getElementById("saveButton");

var countdownTime = 15; // 3 minutes * 60 seconds
var timerElement = document.getElementById('timer');
var startButton = document.getElementById('startButton');
var modal = document.getElementById('myModal');
var confirmButton = document.getElementById('confirmButton');
var cancelButton = document.getElementById('cancelButton');


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

        // Optionally, provide user feedback
        // alert("Text saved temporarily!");

        // Clear the input field
        textInput.value = "";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    var myList = document.getElementById("listpresents");

    // Get the current date
    var currentDate = new Date();

    // Loop through 
    entries.forEach(function (item) {
        var entryTimestamp = new Date(item.timestamp);

        // Check if the entry's timestamp is from today
        if (entryTimestamp.getDate() === currentDate.getDate()) {
            var li = document.createElement("li");
            li.textContent = item.name //+ ': ' + item.timestamp;
            myList.appendChild(li);
        }
    });
});

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
   // alert('Time is up!');

    // Display a confirmation dialog
    var confirmation = window.confirm('Do you want to see your entries?');

    if (confirmation) {
        displayEntries();
    }
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