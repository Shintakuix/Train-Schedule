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

  // function to pad start time to 4 digits

   function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}
   
   //Button for adding Trains
   $("#add-train-btn").on("click", function() {
     
   
     // Grabs user input
     var tName = $("#train-name-input").val().trim();
     var tDestination = $("#destination-input").val().trim();
     var timeFirstxy = $("#first-time-input").val().trim();
     var timeFirstx = padDigits(timeFirstxy , "4");
     var tFrequency = parseInt($("#frequency-input").val().trim());
     console.log(timeFirstx);    
   
 // Creates local "temporary" object for holding train data
     var newTrain = {
       name: tName,
       dest: tDestination,
       ftime: timeFirstx,
       freq: tFrequency
     };
   
     // Uploads employee data to the database
     database.ref().push(newTrain);
   
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
   
   //Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
   database.ref().on("child_added", function(childSnapshot) {
     console.log(childSnapshot.val());
   
     // Store everything into a variable.
     var trName = childSnapshot.val().name;
     var trDest = childSnapshot.val().dest;
     var trTime = childSnapshot.val().ftime;
     var trFreq = childSnapshot.val().freq;
     
  
     console.log(trName);
     console.log(trDest);
     console.log(trTime);
     console.log(trFreq);
   
     // Next Train 
 
     
     var currentTime = moment();
     var tFirstConverted = moment(trTime, "HH:mm").subtract(1, "years");
     console.log(currentTime);
     
     console.log(tFirstConverted);
     var diffTime = moment().diff(moment(tFirstConverted), "minutes");
     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
     console.log("DIFFERENCE IN TIME: " + diffTime);
     console.log(diffTime);
   
    var tRemainder = diffTime % trFreq;
    console.log(tRemainder);

    var tMinutes = trFreq - tRemainder;
    console.log(tMinutes);



    var nextArrival = moment().add(tMinutes, "minutes");
    var nextTrain = moment(nextArrival).format("HH:mm");





     // Create the new row
     var newRow = $("<tr>").append(
       $("<td>").text(trName),
       $("<td>").text(trDest),
       $("<td>").text(trFreq),
       $("<td>").text(nextTrain),
       $("<td>").text(tMinutes)
    
     );
   
     // Append the new row to the table
     $("#new-row-here").append(newRow);
   });
   
   