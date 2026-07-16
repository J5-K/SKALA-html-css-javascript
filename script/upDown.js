function startGame() {

    var computerNum = Math.floor(Math.random()*50) + 1;
    var count = 0;

    console.log("이번 판 컴퓨터의 비밀 숫자: " + computerNum);

    while(true) {
        var userGuess = Number(prompt("1부터 50 사이의 숫자 중 컴퓨터가 생각한 숫자는 무엇일까요?"));

        if(userGuess === 0) {
            alert("게임이 취소되었습니다.");
            break;
        }

        count += 1;

        if(userGuess === computerNum) {
            alert("정답입니다! 시도 횟수: " + count + "번 만에 맞추셨습니다.");
            break;
        } else if(userGuess < computerNum) {
            alert("UP! 더 큰 숫자를 입력하세요.(현재 " + count + "번 시도)");
        } else if(userGuess > computerNum && userGuess <= 50) {
            alert("DOWN! 더 작은 숫자를 입력하세요.(현재 " + count + "번 시도)");
        } else {
            alert("잘못된 입력입니다. 1부터 50 사이의 숫자를 입력하세요.");
        }
    }
}
