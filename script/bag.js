function showMyBag() {

    var myBag = [
        { name: "📱 스마트폰", count: 2 },
        { name: "💻 노트북", count: 1 },
        { name: "📚 책", count: 3 },
        { name: "🖊️ 펜", count: 5 },
        { name: "🎧 이어폰", count: 1 }
    ];

    var resultText = "====== 내 가방 속 물품 목록 ======\n";

    for (var i in myBag) {
        resultText += "✔️ " + myBag[i].name + " : " + myBag[i].count + "개\n";
    }

    resultText += "--------------------------\n";
    resultText += "총 물품 종류: " + myBag.length + "가지\n";
    resultText += "총 물품 수: " + myBag.reduce((total, item) => total + item.count, 0) + "개";

    alert(resultText);
}