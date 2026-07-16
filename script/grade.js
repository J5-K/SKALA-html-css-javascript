function checkGrade() {
    var subjects = ["HTML", "CSS", "JavaScript"];
    var total = 0;

    for (var i = 0; i < subjects.length; i++) {
        var score = Number(prompt(subjects[i] + " 점수를 입력하세요 (0~100):"));
        if (isNaN(score) || score < 0 || score > 100) {
            alert("유효한 점수를 입력하세요 (0~100).");
            return;
        }
        total += score;
    }

    var average = total / subjects.length;
    var result = "";
    if (average >= 60) {
        result = "합격입니다! 우수자로 선정되었습니다.";
    } else {
        result = "불합격입니다. 다음 기회에 힘내세요!";
    }
    alert(
        "====== 성적 결과 ======\n" +
        "✔️ 총점: " + total + "점\n" +
        "✔️ 평균: " + average.toFixed(1) + "점\n" +
        "--------------------------\n" +
        "✔️ 결과: " + result
    );
}