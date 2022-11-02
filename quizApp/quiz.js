function Sorular(soruMetni, soruCevaplari, dogruCevap) {
    this.soruMetni = soruMetni;
    this.soruCevaplari = soruCevaplari;
    this.dogruCevap = dogruCevap;
}
let sorular = [
    new Sorular("Which one is it js library?", { "A": "Angular", "B": ".net", "C": "Chainer", "D": "Jackson" }, "A"),
    new Sorular("Which one is it c# library?", { "A": "Vue.js", "B": ".net", "C": "Chainer", "D": "JUnit" }, "B"),
    new Sorular("Which one is it python library?", { "A": "JQuery", "B": ".net", "C": "Maven", "D": "Chainer" }, "D"),
    new Sorular("which one is it java library ?", { "A": "JQuery", "B": ".net", "C": "Maven", "D": "Chainer" }, "C"),
    new Sorular("which one is it c++ library ?", { "A": "Boost", "B": "Chainer", "C": "Maven", "D": ".net" }, "A"),
];
function Quiz(sorular) {
    this.sorular = sorular;
    this.soruIndex = 0;
}
Quiz.prototype.soruGetir = function () {
    return this.sorular[this.soruIndex];
}
const quiz = new Quiz(sorular);
var puan = 0;
document.querySelector(".btn").addEventListener("click", function () {
    document.querySelector(".btn").classList.add("destroy");
    document.querySelector(".quiz-app").classList.remove("destroy");
    document.querySelector(".quiz-app").classList.add("build");
    let cevaplar = [quiz.soruGetir().soruCevaplari.a, quiz.soruGetir().soruCevaplari.b, quiz.soruGetir().soruCevaplari.c, quiz.soruGetir().soruCevaplari.d];
    if (quiz.sorular.length != quiz.soruIndex) {
        document.querySelector(".question-text").innerHTML = quiz.soruGetir().soruMetni;
        showAnswer(quiz.soruGetir());
        let point =
            `
          <label class="point">${puan}</label>
            `
        let count =
            `
            <span class="count">${quiz.soruIndex + 1}/${quiz.sorular.length}</span>
            `

        document.querySelector(".card-footer").insertAdjacentHTML("afterbegin", count);
        document.querySelector(".card-footer").insertAdjacentHTML("afterbegin", point);
    }
    else {
        let finished =
            `
        <h1>Elimizde Soru yokmuş :)</h1>
        `
        document.querySelector(".quiz-app").innerHTML = "";
        document.querySelector(".quiz-app").insertAdjacentHTML("beforeend", finished);

    }
})
document.querySelector(".btn-footer").addEventListener("click", function () {
    quiz.soruIndex += 1;
    document.querySelector(".options").innerHTML = " ";
    if (quiz.sorular.length != quiz.soruIndex) {
        let cevaplar = [quiz.soruGetir().soruCevaplari.a, quiz.soruGetir().soruCevaplari.b, quiz.soruGetir().soruCevaplari.c, quiz.soruGetir().soruCevaplari.d];
        if (quiz.sorular.length != quiz.soruIndex) {
            document.querySelector(".question-text").innerHTML = quiz.soruGetir().soruMetni;
            showAnswer(quiz.soruGetir());
            document.querySelector(".point").innerHTML = puan;
            if ((quiz.sorular.length - 1) - quiz.soruIndex == 0) {
                document.querySelector(".btn-footer").innerHTML = "Finish The Quiz";
            }
            document.querySelector(".count").innerHTML = `${quiz.soruIndex + 1}/${quiz.sorular.length}`;
        }
    }
    else {
        let finished =
            `
        <h1>The Quiz Is Over</h1>
        <br>
        <h3>Your Score : ${puan}</h3>
        `
        document.querySelector(".quiz-app").innerHTML = "";
        document.querySelector(".quiz-app").insertAdjacentHTML("beforeend", finished);

    }
})
function showAnswer(soru) {
    for (let cevap in soru.soruCevaplari) {
        let soruCevaplari =
            `
                        <div class="option">
                        <span><b>${cevap} )</b> ${soru.soruCevaplari[cevap]}</span>
                        <i class="fa-sharp fa-solid"></i>
                        </div>
                `;
        document.querySelector(".options").insertAdjacentHTML("beforeend", soruCevaplari);
    }
    let options = document.querySelector(".options").children;
    for (let i = 0; i < options.length; i++) {
        options[i].addEventListener("click", function () {
            for (let i = 0; i < options.length; i++) {
                let sayac = -1;
                let count = 0;
                for (let cevap in soru.soruCevaplari) {
                    sayac++;
                    document.querySelectorAll(".option i")[i].classList.add("fa-xmark");
                    if (cevap == soru.dogruCevap) {
                        count = sayac;
                        document.querySelectorAll(".option i")[count].classList.remove("fa-xmark");
                        document.querySelectorAll(".option i")[count].classList.add("fa-check");
                        document.querySelector(".point").innerHTML = puan;
                    }
                    else {
                        document.querySelector(".point").innerHTML = puan;
                    }
                }
            }
            if (document.querySelectorAll(".option i")[i].classList.contains("fa-check")) {
                puan += 10;
                document.querySelector(".point").innerHTML = puan;
                disableİtems();

            }
            else {
                puan += -5;
                document.querySelector(".point").innerHTML = puan;
                disableİtems();
            }
            if (document.querySelectorAll(".option i")[i].classList.contains("fa-check")) {
                document.querySelectorAll(".option")[i].classList.add("true");
            }
            else {
                document.querySelectorAll(".option")[i].classList.add("wrong");
            }
        })
    }
}
function disableİtems() {
    for (let i = 0; i < document.querySelector(".options").children.length; i++) {
        document.querySelectorAll(".option")[i].classList.add("disable");
    }
}
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + "." + seconds;

        if (--timer < 0) {
            document.querySelector(".timer").innerHTML = "EXPIRED";
            document.querySelector(".quiz-app").classList.add("disable");
            setTimeout(finishQuiz, 2500);
        }
    }, 1000);
}
window.onload = function () {
    var halfMinute = 60 * 0.5,
        display = document.querySelector('.timer');
    startTimer(halfMinute, display);
};
function finishQuiz() {
    if (document.querySelector(".timer").innerHTML == "EXPIRED") {
        let finished =
            `
            
    <h1>Your Time Is Over</h1>
    <h1>And The Quiz Is Over</h1>
    <br>
    <h3>Your Score : ${puan}</h3>
    `
        document.querySelector(".quiz-app").innerHTML = "";
        document.querySelector(".quiz-app").insertAdjacentHTML("beforeend", finished);
    }
}

