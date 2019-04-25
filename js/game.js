let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let bird = new Image();
let bg = new Image(); // Создание объекта
let fg = new Image(); // Создание объекта
let pipeUp = new Image(); // Создание объекта
let pipeBottom = new Image(); // Создание объекта

bird.src = "img/bird.png"; // Указание нужного изображения
bg.src = "img/bg.png"; // Аналогично
fg.src = "img/fg.png"; // Аналогично
pipeUp.src = "img/pipeUp.png"; // Аналогично
pipeBottom.src = "img/pipeBottom.png"; // Аналогично

// Звуковые файлы
let fly = new Audio(); // Создание аудио объекта
let score_audio = new Audio(); // Создание аудио объекта

fly.src = "audio/fly.mp3"; // Указание нужной записи
score_audio.src = "audio/score.mp3"; // Аналогично

let score = 0; // очки
let gap = 110; // растояние между трубами

//При нажатии на какую-либо клавишу
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 25;
}

let pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}

//позиция птички

let xPos = 10;
let yPos = 150;
let grav = 1.5;

function draw() {
    ctx.drawImage(bg, 0, 0, 700, 900); //рисуем картинку

    for(let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        //отслеживание прикосновений
        if(xPos + bird.width >= pipe[i].x
        && xPos <= pipe[i].x + pipeUp.width
        && (yPos <= pipe[i].y + pipeUp.height
        || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
        || yPos + bird.height >= cvs.height - fg.height) {
            location.reload(); // перезагрузка страницы
        }

        if(pipe[i].x == 5) {
            score++;
            score_audio.play();
        }
    }
    
    
    ctx.drawImage(fg, 0 , cvs.height - fg.height );
    ctx.drawImage(bird, xPos, yPos, 40, 40); // принимает название картинки координаты и размер

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "22px Oswald";
    ctx.fillText("Press any key to control the bird", 5, cvs.height - 60);
    ctx.fillText("Score: " + score, 5, cvs.height - 20);
    requestAnimationFrame(draw); // функция вызывается постоянно и птичка падает
}

pipeBottom.onload = draw;

