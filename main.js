const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");
ctx.save();
ctx.beginPath();
ctx.font = '1200px serif';

const NUMOFBIRDS = 200;
const birds = generateBirds(NUMOFBIRDS);
let mainBird = birds[0];

let score = 0;
const pipe_Velocity = 5;
const ground_y = window.innerHeight * 0.9;
const ground = new Ground(ground_y)
const pipe = new Pipe();
const beginGame = false;

myCanvas.height=window.innerHeight;
birds[0].draw(ctx);
pipe.draw(ctx,600);
ground.draw(ctx);
const pipes = [];
pipes.push(pipe);

let generation = 0;
let bestScore = 0;
if(localStorage.getItem("generation")){
    generation=JSON.parse(
        localStorage.getItem("generation"));
    
}
if(localStorage.getItem("bestScore")){
    bestScore=JSON.parse(
        localStorage.getItem("bestScore"));
    
}
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<birds.length;i++){
        birds[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(birds[i].brain,0.05);
        }
    }
}



animate();



function animate(time){
    //if(birds[0].controles.beginGame){
        updatePipes(pipes);
        updateBirds(birds);
        findMainBird(birds);
        generatePipes(time)
        updateCanvas();
        drawPipes(pipes);
        ground.draw(ctx);
        drawBirds();
        updateScore();
        displayGeneration();
        refreshIfAllDead();
    //}
    requestAnimationFrame(animate);
}
function displayGeneration(){
    ctx.fillStyle = "#000000";
    ctx.fillText('Generation: ' + String(generation), 10, 20);
}

function updateScore(){
    // avaliblePipes = [...pipes.filter(pipe=>pipe.x > myCanvas.width/4)];

    // if(avaliblePipes[0].x < mainBird.x){
    //     score++;
    //     delete avaliblePipes.shift();
    // }
    if(pipes[0].x < mainBird.x && pipes[0].x > mainBird.x - 2* pipe_Velocity){
        score++;
    }
    if(bestScore <= score){
        save();
    }
    bestScore = score > bestScore ? score : bestScore;

    ctx.fillStyle = "#000000";
    ctx.fillText('Score: ' + String(score), 10, 40);
    ctx.fillText('Best Score: ' + String(bestScore), 10, 60);
}

function updateCanvas(){
    myCanvas.height=window.innerHeight;
    ground.ground_height = window.innerHeight * 0.9;
    ctx.globalAlpha=1;
}

function refreshIfAllDead(){
    allDead = true;
    for(let i=0;i<birds.length;i++){
        if(!birds[i].IsDead){
            allDead = false;
            break;
        }
    }

    if(allDead){
        localStorage.setItem("bestScore",
        JSON.stringify(bestScore));
        location.reload();
    }
}

function generatePipes(time){
    if(Math.round(time)%1500 <= 50 && pipes[pipes.length-1==-1?0:pipes.length-1].x<850){
        pipes.push(new Pipe());
        //save();
    }
}

function drawPipes(pipes){
    for(let i=0;i<pipes.length;i++){
        if(pipes.length != 0){
            pipes[i].draw(ctx);
        }
    }
}

function findMainBird(birds){
    for(let i=0;i<birds.length;i++){
        if(!birds[i].IsDead){
            mainBird = birds[i];
            break;
        }
    }
}

function updateBirds(birds){
    for(let i=0;i<birds.length;i++){
        birds[i].update(pipes); 
    }
}

function updatePipes(pipes){
    for(let i=0;i<pipes.length;i++){
        pipes[i].update();
        if(pipes[i].x < -pipes[i].width){
            delete pipes.shift();
        }
    }
}

function generateBirds(N){
    const birds = [new Bird(myCanvas.width/4,myCanvas.height/2,15,"AI")];
    for(let i=1;i<N;i++){
        birds.push(new Bird(myCanvas.width/4,myCanvas.height/2,15,"AI"));
    }
    return birds;
}

function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(mainBird.brain));
    localStorage.setItem("generation",
        JSON.stringify(generation + 1));
    localStorage.setItem("bestScore",
        JSON.stringify(bestScore));
}

function saveAndRefresh(){
    save();
    location.reload();
}

function discard(){
    localStorage.removeItem("bestBrain");
    localStorage.removeItem("generation");
    localStorage.removeItem("bestScore");
    location.reload();
}

function drawBirds(){
    for(let i=1;i<birds.length;i++){
        birds[i].draw(ctx)
    }
    mainBird.draw(ctx,true);
}

// var background = new Image();
// background.src = "images\\canvasbg.png";
// background.onload = function(){
//     bgctx.drawImage(background,0,0);
// }
