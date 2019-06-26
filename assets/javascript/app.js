// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBLQ7Y7k6U51cjKK2t5XjNbLqUSqo-p5pk",
    authDomain: "traintime-b040f.firebaseapp.com",
    databaseURL: "https://traintime-b040f.firebaseio.com",
    projectId: "traintime-b040f",
    storageBucket: "",
    messagingSenderId: "321959062429",
    appId: "1:321959062429:web:d1a1a3c52d759165"
  };
   
   firebase.initializeApp(config);
   
   var database = firebase.database();
   
   // 2. Button for adding Employees
   $("#add-train-btn").on("click", function(event) {
     event.preventDefault();
   
     // Grabs user input
     var tName = $("#train-name-input").val().trim();
     var tDestination = $("#destination-input").val().trim();
     var timeFirstx = parseInt($("#first-time-input").val().trim());
     var tFrequency = parseInt($("#frequency-input").val().trim());

     var tFirstConverted = moment(timeFirstx , "HH:mm").subtract(1, "years");

     console.log(tName);
     console.log(tDestination);
     console.log(timeFirstx);

     console.log(tFrequency);
     console.log(tFirstConverted);
   
 // Creates local "temporary" object for holding train data
     var newTrain = {
       name: tName,
       dest: tDestination,
       ftime: timeFirstx,
       freq: tFrequency
     };
   
     // Uploads employee data to the database
     database.ref().push(newTrain);
   
     // Logs everything to console
     console.log(newTrain.name);
     console.log(newTrain.dest);
     console.log(newTrain.ftime);
     console.log(newTrain.freq);
   
     alert("Train successfully added");
   
     // Clears all of the text-boxes
     $("#train-name-input").val("");
     $("#destination-input").val("");
     $("#first-time-input").val("");
     $("#frequency-input").val("");
   });
   
   // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
   database.ref().on("child_added", function(childSnapshot) {
     console.log(childSnapshot.val());
   
     // Store everything into a variable.
     var trName = childSnapshot.val().name;
     var trDest = childSnapshot.val().dest;
     var trTime = childSnapshot.val().ftime;
     var trFreq = childSnapshot.val().freq;
   
     // Employee Info
     console.log(trName);
     console.log(trDest);
     console.log(trTime);
     console.log(trFreq);
   
     // Prettify the employee start
/*      var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");
   
     // Calculate the months worked using hardcore math
     // To calculate the months worked
     var empMonths = moment().diff(moment(empStart, "X"), "months");
     console.log(empMonths);
   
     // Calculate the total billed rate
     var empBilled = empMonths * empRate;
     console.log(empBilled); */
   
     // Create the new row
     var newRow = $("<tr>").append(
       $("<td>").text(trName),
       $("<td>").text(trDest),
       $("<td>").text(trTime),
       $("<td>").text(trFreq),
       $("<td>").text("hello")
    
     );
   
     // Append the new row to the table
     $("#new-row-here").append(newRow);
   });
   
   // Example Time Math
   // -----------------------------------------------------------------------------
   // Assume Employee start date of January 1, 2015
   // Assume current date is March 1, 2016
   
   // We know that this is 15 months.
   // Now we will create code in moment.js to confirm that any attempt we use meets this test case
