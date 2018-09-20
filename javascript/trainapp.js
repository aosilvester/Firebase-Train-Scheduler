// train app javaScript file

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAa_2iGtpZRa1aoI-9iiG8ipBPw_YkAEag",
    authDomain: "in-class-test-july-cohort-2018.firebaseapp.com",
    databaseURL: "https://in-class-test-july-cohort-2018.firebaseio.com",
    projectId: "in-class-test-july-cohort-2018",
    storageBucket: "in-class-test-july-cohort-2018.appspot.com",
    messagingSenderId: "413678252667"
};
firebase.initializeApp(config);


var database = firebase.database();

$("#trainInfoButton").click(function () {
    console.log("train information submit button clicked");

    // Grabs user input
    var trainNameInput = $("#trainNameInput").val().trim();
    var destinationInput = $("#trainDestinationInput").val().trim();
    var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").format("HH:mm");
    var trainFrequencyInput = $("#trainFrequencyInput").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainNameInput,
        destination: destinationInput,
        time: trainTimeInput,
        trainFrequency: trainFrequencyInput
    };
    database.ref().push(newTrain);

    // testing to make sure all fields populate correctly
    console.log("newTrain name = " + newTrain.name);
    console.log("newTrain destination = " + newTrain.destination);
    console.log("newTrain time = " + newTrain.time);
    console.log("newTrain Frequency = " + newTrain.trainFrequency);


    //clear out the data from the text boxes
    $("#trainNameInput").val("");
    $("#trainDestinationInput").val("");
    $("#trainTimeInput").val("");
    $("#trainFrequencyInput").val("");


    // below function activates when the database is contacted


});

database.ref().on("child_added", function (childSnapshot) {
    console.log("child added");

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().trainFrequency;


// section to calculate schedule for time
    var trainTimeConverted = moment(trainTime, "HH:mm");
    console.log(trainTimeConverted);
    var currentTime = moment().format("HH:mm");

    console.log("Current time = " + currentTime);

    var timeDiff = moment().diff(moment(trainTimeConverted), "minutes");
    console.log(trainTime);
    console.log("difference in time  " + timeDiff);

    var timeRemaining = timeDiff % trainFreq;

    console.log("time remaining: " + timeRemaining);

    var trainApproach = trainFreq - timeRemaining;




    // appending firebase data back to webpage
    var newRow = $("<tr>").append(

        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainTime),
        $("<td>").text(trainFreq),
        $("<td>").text(trainApproach),

    );
    $("#trainbody").append(newRow);
});