var summaryEl = document.getElementById("summary")
var statusEl = document.getElementById("status")
const questions = ['age', 'bp', 'hist']
var userAnswerIDs = [];
var riskScoresArray = [];
var totalRiskScore = 0;

function insertLinebreak(element) {
    element.appendChild(document.createElement("br"));
}

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

    // scoring
    if (totalRiskScore <= 20) {
        statusEl.innerHTML = "Total score = " + totalRiskScore + " (low risk category)";
    } 
    else if (totalRiskScore <= 50) {
        statusEl.innerHTML = "Total score = " + totalRiskScore + " (moderate risk category)";
    } 
    else if (totalRiskScore <= 75) {
        statusEl.innerHTML = "Total score = " + totalRiskScore + " (high risk category)";
    } 
    else {
        statusEl.innerHTML = "Total score = " + totalRiskScore + " (uninsurable)";
    }

    document.getElementById("summaryButton").disabled = false;
    summaryEl.innerHTML = '';
}

function showSummary() {
    summaryEl.innerHTML = 'Detailed Summary:';
    insertLinebreak(summaryEl);

    for (var i = 0; i < userAnswerIDs.length; i++) {
        summaryEl.innerHTML += document.getElementById(userAnswerIDs[i]).id + ' (+ ' + riskScoresArray[i] + ' points)';
        insertLinebreak(summaryEl);
    }

    document.getElementById("summaryButton").disabled = true;
}

function reset() {
    userAnswerIDs.length = 0;
    riskScoresArray.length = 0;
    totalRiskScore = 0;

    document.getElementById("summaryButton").disabled = true;
    summaryEl.innerHTML = '';
    statusEl.innerHTML = '';

    // reset all selections (reused code used from getRiskScores)
     for (var i = 0; i < questions.length; i++) {
        for (var n = 0; n < document.getElementsByName(questions[i]).length; n++) {
            if (document.getElementsByName(questions[i])[n].checked) {
                document.getElementsByName(questions[i])[n].checked = false;
            }
        }
    }

}

//      BMI:     normal=0     overweight=30      obese/else=75
//      BMI = kg / m^2
//      weight / height^2
