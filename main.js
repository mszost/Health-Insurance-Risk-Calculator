const questions = ['age', 'bp', 'hist']
var userAnswerIDs = [];
var riskScoresArray = [];
var totalRiskScore = 0;

function getRiskScore() {
    //reset data each time the function is called
    userAnswerIDs.length = 0;
    riskScoresArray.length = 0;
    totalRiskScore = 0;

    //iterates over array containing element group names
    for (var i = 0; i < questions.length; i++) {
        // nested loop iterates all IDs inside each name group
        for (var n = 0; n < document.getElementsByName(questions[i]).length; n++) {
            if (document.getElementsByName(questions[i])[n].checked) {
                // adds corresponding ID to userAnswerIDs if the element is checked
                userAnswerIDs.push(document.getElementsByName(questions[i])[n].id);
            }
        }
    }

    // get numerical values corresponding to each ID in userAnswerIDs, adds them to riskScoresArray
    for (var i = 0; i < userAnswerIDs.length; i++) {
        riskScoresArray.push((document.getElementById(userAnswerIDs[i]).value));
    }

    // adding up individual scores to get total
    for (var i = 0; i < riskScoresArray.length; i++) {
        totalRiskScore += parseInt(riskScoresArray[i]);
    }

    // debugging
    console.log('userAnswerIDs: ' + userAnswerIDs);
    console.log('riskScoresArray: ' + riskScoresArray);
    console.log('total score: ' + totalRiskScore);

    // summary
    if (totalRiskScore <= 20) {
        document.getElementById("msg").innerHTML = "Low risk";
    } 
    else if (totalRiskScore <= 50) {
        document.getElementById("msg").innerHTML = "Moderate risk";
    } 
    else if (totalRiskScore <= 75) {
        document.getElementById("msg").innerHTML = "High risk";
    } 
    else {
        document.getElementById("msg").innerHTML = "Uninsurable";
    }

}

//      BMI:     normal=0     overweight=30      obese/else=75