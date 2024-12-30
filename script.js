// script.js
function submitForm() {
    const radios = document.querySelectorAll('input[type="radio"]');
    let totalScore = 0;
    let group1Score = 0; // For questions 6, 10
    let group2Score = 0; // For questions 1, 4, 8, 13, 14, 15
    let group3Score = 0; // For questions 5, 9, 11, 12
    let group4Score = 0; // For questions 2
    let group5Score = 0; // For questions 3, 7

    const group1Questions = [6, 10];
    const group2Questions = [1, 4, 8, 13, 14, 15];
    const group3Questions = [5, 9, 11, 12];
    const group4Questions = [2];
    const group5Questions = [3, 7];

    const numQuestions = radios.length / 5;

    for (let i = 0; i < numQuestions; i++) {
        let questionScore = 0;
        const radioName = `question${i + 1}`;
        const selectedRadio = document.querySelector(`input[name="${radioName}"]:checked`);
        if (selectedRadio) {
            questionScore = parseInt(selectedRadio.value);
            totalScore += questionScore;
            if (group1Questions.includes(i + 1)) {
                group1Score += questionScore;
            } else if (group2Questions.includes(i + 1)) {
                group2Score += questionScore;
            } else if (group3Questions.includes(i + 1)) {
                group3Score += questionScore;
            } else if (group4Questions.includes(i + 1)) {
                group4Score += questionScore;
            } else if (group5Questions.includes(i + 1)) {
                group5Score += questionScore;
            }
        }
    }

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `Your total score is: ${totalScore} <br>`;

    let comment = "";
    if (totalScore <= 30) {
        comment = "Ouch. The good news is that you've got a great opportunity to improve your effectiveness at work, and your long term success! However, to realize this, you've got to fundamentally improve your time management skills.";
    } else if (totalScore <= 45) {
        comment = "You're good at some things, but there's room for improvement elsewhere. Focus on the serious issues below, and you'll most likely find that work becomes much less stressful.";
    } else if (totalScore <= 75) {
        comment = "You're managing your time very effectively! Still, check the sections below to see if there's anything you can tweak to make this even better.";
    } else {
        comment = "Thank you! We are thrilled that you loved our product.";
    }

    resultsDiv.innerHTML += `<strong>${comment}</strong> <br><br>`;

    resultsDiv.innerHTML += "Effective time management can significantly boost your productivity.<br>";
    resultsDiv.innerHTML += "By managing your time well, you can achieve more in less time.<br><br>";

    resultsDiv.innerHTML += `Goal Setting: ${group1Score} <br>`;
    resultsDiv.innerHTML += `Prioritization: ${group2Score} <br>`;
    resultsDiv.innerHTML += `Managing Interruptions : ${group3Score} <br>`;
    resultsDiv.innerHTML += `Procrastination : ${group4Score} <br>`;
    resultsDiv.innerHTML += `Scheduling: ${group5Score} <br>`;
    resultsDiv.innerHTML += `Total Group Score: ${group1Score + group2Score + group3Score + group4Score + group5Score} <br><br>`;

    const scores = [group1Score, group2Score, group3Score, group4Score, group5Score];
    const minScore = Math.min(...scores);
    const sortedScores = [...scores].sort((a, b) => a - b);
    const colors = scores.map(score => {
        if (score === minScore) return "red";
        if (score === sortedScores[1]) return "blue";
        return "grey";
    });

    let barChartHTML = "<div style='display: flex;'>";
    for (let i = 0; i < scores.length; i++) {
        barChartHTML += `<div class="bar ${colors[i]}" style="height: ${scores[i] * 10}px;">${scores[i]}</div>`;
    }
    barChartHTML += "</div>";

    resultsDiv.innerHTML += barChartHTML;

    resultsDiv.innerHTML += "<button onclick='window.print()'>Print</button>";
}

