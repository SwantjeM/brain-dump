// Get references to the form elements
const textForm = document.getElementById("textForm");
const textInput = document.getElementById("textInput");
const saveButton = document.getElementById("saveButton");

var currentDate = new Date();

let entries = [];

// Check if the array already exists in local storage
if (localStorage.getItem("entries")) {
    // If it exists, load the array from local storage
    entries = JSON.parse(localStorage.getItem("entries"));
}

// Add an event listener to the Save button
saveButton.addEventListener("click", function () {
    // Get the text input value
    const inputText = textInput.value;

    // Check if the input is not empty
    if (inputText.trim() !== "") {
        // Store the text in local storage with a specific key
        //        localStorage.setItem("userText", inputText);

        // Add a new entry to the array
        //   const newEntry = "New entry text"; // Replace with your new entry
        newEntry = {
            "name": inputText,
            "timestamp": currentDate,  // Use a valid timestamp in ISO 8601 format
        }

        entries.push(newEntry);

        // Save the updated array to local storage
        localStorage.setItem("entries", JSON.stringify(entries));
        // Optionally, provide user feedback
        //  alert("Text saved to local storage!");

        // Clear the input field
        textInput.value = "";
    }
});

// Check if the text is already stored in local storage
if (localStorage.getItem("entries")) {
    // Retrieve the stored text
    var myList = document.getElementById("listpresents");

    const storedText = localStorage.getItem("entries");
}



document.addEventListener("DOMContentLoaded", function () {
    var myList = document.getElementById("listpresents");

    // Get the current date
    var currentDate = new Date();

    // Loop through the JSON data and create list items for entries from yesterday
    entries.forEach(function (item) {
        var entryTimestamp = new Date(item.timestamp);

        // Check if the entry's timestamp is from yesterday
        if (entryTimestamp.getDate() === currentDate.getDate()) {
            var li = document.createElement("li");
            li.textContent = item.name //+ ': ' + item.timestamp;
            myList.appendChild(li);
        }

        // Loop through the JSON data and create list items
        //    entries.forEach(function (item) {
        //      var li = document.createElement("li");
        //    li.textContent = item.name + ': ' + item.timestamp;
        //  myList.appendChild(li);
    });
});

var countdownTime = 15; // 3 minutes * 60 seconds
var timerElement = document.getElementById('timer');
var startButton = document.getElementById('startButton');

function updateTimer() {
    var minutes = Math.floor(countdownTime / 60);
    var seconds = countdownTime % 60;

    // Add leading zeros if needed
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timerElement.textContent = minutes + ':' + seconds;
}

// countdown to relax
function countdown() {
    updateTimer();

    if (countdownTime > 0) {
        countdownTime--;
        setTimeout(countdown, 1000); // Update every second
    } else {
        timerElement.textContent = '00:00';
        alert('Time is up!');
    }
}

function startCountdown() {
    countdown();
    startButton.style.display = 'none'; // Hide the button after starting the timer
}

// Show a confirmation pop-up when the page loads
var confirmation = window.confirm('Welcome to the Brain Dump! you have 3 minutes to empty out your brain. Let\'s go!');

// If the user clicks "OK" in the confirmation pop-up, start the timer
if (confirmation) {
    startCountdown();
} else {
    // You can handle the case where the user clicks "Cancel" if needed
    // For example, you might want to provide another way to start the timer
}