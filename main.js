const questions = ['age', 'bp', 'hist'];

const validFeet = ['3', '4', '5', '6', '7'];
const validInches = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']

const summaryEl = document.getElementById("summary");
const statusEl = document.getElementById("status");
const verifyEl = document.getElementById('verify');
const sectEl = document.getElementById('sect');

const feelEl = parseInt(document.getElementById('feet').value);
const inchEl = parseInt(document.getElementById('inches').value);
const poundsEl = parseInt(document.getElementById('weight').value);

var errOut = false;

var totalInches;
var meters;
var kilos;
var bmi;
var bmiScore;

var userAnswerIDs = [];
var riskScoresArray = [];
var totalRiskScore = 0;


function insertLinebreak(element) {
    element.appendChild(document.createElement("br"));
}


function getRiskScore() {
    //reset data each time the function is called
    errOut = false;
    userAnswerIDs.length = 0;
    riskScoresArray.length = 0;
    totalRiskScore = 0;

    // verify inputs and get BMI
    if (!validFeet.includes(document.getElementById('feet').value)) {
        verifyEl.innerHTML += 'Invalid height (feet). Reset and try again. Min is 3, max is 7.';
        insertLinebreak(verifyEl);
        errOut = true
    } if (!validInches.includes(document.getElementById('inches').value)) {
        verifyEl.innerHTML += 'Invalid height (inches). Reset and try again. Min is 0, max is 11.';
        insertLinebreak(verifyEl);
        errOut = true
    } if ( !(document.getElementById('weight').value == parseInt(document.getElementById('weight').value)) ) {
        verifyEl.innerHTML += 'Invalid weight. Reset and try again. Do not include letters or special characters.';
        insertLinebreak(verifyEl);
        errOut = true
    } if (document.getElementById('weight').value >= 800) {
        verifyEl.innerHTML += 'Invalid weight. Reset and try again. Min is 50, max is 800.';
        insertLinebreak(verifyEl);
        errOut = true
    } if (document.getElementById('weight').value <= 50) {
        verifyEl.innerHTML += 'Invalid weight. Reset and try again. Min is 50, max is 800.';
        insertLinebreak(verifyEl);
        errOut = true
    } if (errOut == true) {
        return(null);
    }
   
    totalInches = parseInt(document.getElementById('feet').value) * 12
    totalInches += parseInt(document.getElementById('inches').value)

    meters = totalInches * 0.0254;
    kilos = document.getElementById('weight').value * 0.4535924;
    bmi = kilos / (meters**2);

    if (bmi >= 30) {
        totalRiskScore += 75;
        bmiScore = 75
    } else if (bmi >= 25) {
        totalRiskScore += 30;
        bmiScore = 30
    } else {
        bmiScore = 0
    }

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
    sectEl.innerHTML = '';
}


function showSummary() {
    sectEl.innerHTML = 'Detailed Summary:';
    insertLinebreak(sectEl);

    summaryEl.innerHTML +=  'BMI: ' + (Math.round(bmi * 10) / 10) + ' ( +' + bmiScore + ' points)';
    insertLinebreak(summaryEl);

    for (var i = 0; i < userAnswerIDs.length; i++) {
        summaryEl.innerHTML += document.getElementById(userAnswerIDs[i]).id + ' ( + ' + riskScoresArray[i] + ' points)';
        insertLinebreak(summaryEl);
    }

    document.getElementById("summaryButton").disabled = true;
}


function reset() {
    userAnswerIDs.length = 0;
    riskScoresArray.length = 0;
    totalRiskScore = 0;

    document.getElementById('weight').value = '';
    document.getElementById('feet').value = '';
    document.getElementById('inches').value = '';

    sectEl.innerHTML = '';
    summaryEl.innerHTML = '';
    statusEl.innerHTML = '';
    verifyEl.innerHTML = '';

    document.getElementById("summaryButton").disabled = true;

    // reset all selections (reused code used from getRiskScores)
     for (var i = 0; i < questions.length; i++) {
        for (var n = 0; n < document.getElementsByName(questions[i]).length; n++) {
            if (document.getElementsByName(questions[i])[n].checked) {
                document.getElementsByName(questions[i])[n].checked = false;
            }
        }
    }

}