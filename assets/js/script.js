const hangs = [
    "https://upload.wikimedia.org/wikipedia/commons/8/8b/Hangman-0.png",
    "https://upload.wikimedia.org/wikipedia/commons/3/30/Hangman-1.png",
    "https://upload.wikimedia.org/wikipedia/commons/7/70/Hangman-2.png",
    "https://upload.wikimedia.org/wikipedia/commons/9/97/Hangman-3.png",
    "https://upload.wikimedia.org/wikipedia/commons/2/27/Hangman-4.png",
    "https://upload.wikimedia.org/wikipedia/commons/6/6b/Hangman-5.png",
    "https://upload.wikimedia.org/wikipedia/commons/d/d6/Hangman-6.png"
];

const words = [
    "dog",
    "cat",
    "rabbit",
    "bunny",
    "guinea pigs"
];

let gameOver = false;

let randomWord = words[Math.floor(Math.random() * words.length)];
let randomWordArr = randomWord.split("");

let word = new Array(randomWordArr.length);
for (let a = 0; a < word.length; a++) {
    word[a] = "";
}

let diagramState = 0;

let hideRandomWord = () => {
    let randomWordHidden = "";

    console.log(randomWordArr);

    for (let letter of randomWordArr) {
        if (letter == " ") {
            randomWordHidden += " &nbsp ";
        } else {
            randomWordHidden += " _ ";
        }
    }

    return randomWordHidden;
}

let generateGame = () => {
    let wordToGuess = document.getElementById("wordToGuess");
    wordToGuess.innerHTML = hideRandomWord();
}

let diagramSet = () => {
    if (diagramState >= 7) {
        document.getElementById("diagram").setAttribute("src", hangs[6]);
    } else {
        document.getElementById("diagram").setAttribute("src", hangs[diagramState]);
    }
}

let checkWin = () => {
    if (word.join("") == randomWord) {
        gameOver = true;
        alert("You win!");
    }
    else if (diagramState >= 7) {
        alert("You loose!");
    }
}

document.getElementById("wordBtn").addEventListener("click", (e) => {
    e.preventDefault();

    if (!gameOver) {
        let tryWord = document.getElementById("word").value.toLowerCase();

        if (tryWord == randomWord) {
            gameOver = true;
            alert("You win!");
        }
        else {
            diagramState += 1;
            diagramSet();
        }
    }
})

document.getElementById("letterBtn").addEventListener("click", (e) => {
    e.preventDefault();

    if (!gameOver) {
        let tryLetter = document.getElementById("letter").value.toLowerCase();
        let letterIsGood = false;
    
        for (let a = 0; a < randomWordArr.length; a++) {
            if (randomWordArr[a] == tryLetter) {
                letterIsGood = true;
                word[a] = tryLetter;
            }
        }
        
        let wordToShow = "";
    
        console.log(word);
    
        for (let letter of word) {
            if (letter == "") {
                wordToShow += "_";
            }
            else if (letter == " ") {
                wordToShow += "&nbsp";
            }
            else {
                wordToShow += letter;
            }
        }
    
        if (!letterIsGood) {
            diagramState += 1;
            diagramSet();
        }
    
        let wordToGuess = document.getElementById("wordToGuess");
        wordToGuess.innerHTML = wordToShow.split("").join(" ");
        checkWin();
    }
});

generateGame();
diagramSet();
