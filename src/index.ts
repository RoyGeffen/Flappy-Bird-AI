import Bird from "./bird.js";
import Ground from "./ground.js";
import Pipe from "./pipe.js";
import NeuralNetwork from "./network.js";

export const myCanvas:any = document.getElementById("myCanvas");
const ctx:any = myCanvas.getContext("2d");
ctx.save();
ctx.beginPath();
ctx.font = '1200px serif';

const NUMOFBIRDS:number = 100;
const birds:Bird[] = generateBirds(NUMOFBIRDS);
let mainBird:Bird = birds[0];
let score:number = 0;

const ground:Ground = new Ground()
const pipe:Pipe = new Pipe();

myCanvas.height=window.innerHeight;
birds[0].draw(ctx);
pipe.draw(ctx,600);
ground.draw(ctx);
const pipes:Pipe[] = [];
pipes.push(pipe);
let StorageData:{[Key:string]:number} = HandleStorage()



requestAnimationFrame((time) => animate(time));

function animate(time:number){
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
    requestAnimationFrame((newTime) => animate(newTime));
}

function displayGeneration():void{
    ctx.fillStyle = "#000000";
    ctx.fillText('Generation: ' + String(StorageData['generation']), 10, 20);
}

function updateScore():void{
    if(pipes[0].x < mainBird.x && pipes[0].x > mainBird.x - 2* Pipe.pipe_Velocity){
        score++;
    }
    if(StorageData['bestScore'] <= score){
        save();
    }
    StorageData['bestScore'] = score > StorageData['bestScore'] ? score : StorageData['bestScore'];

    ctx.fillStyle = "#000000";
    ctx.fillText('Score: ' + String(score), 10, 40);
    ctx.fillText('Best Score: ' + String(StorageData['bestScore']), 10, 60);
}

function updateCanvas():void{
    myCanvas.height=window.innerHeight;
    Ground.ground_height = window.innerHeight * 0.9;
    ctx.globalAlpha=1;
}

function refreshIfAllDead():void{
    let allDead:boolean = true;
    for(let i=0;i<birds.length;i++){
        if(!birds[i].IsDead){
            allDead = false;
            break;
        }
    }

    if(allDead){
        localStorage.setItem("bestScore",
        JSON.stringify(StorageData['bestScore']));
        location.reload();
    }
}

function generatePipes(time:number):void{
    if(Math.round(time)%1500 <= 50 && pipes[pipes.length-1==-1?0:pipes.length-1].x<850){
        pipes.push(new Pipe());
    }
}

function drawPipes(pipes:Pipe[]):void{
    for(let i=0;i<pipes.length;i++){
        if(pipes.length != 0){
            pipes[i].draw(ctx);
        }
    }
}

function findMainBird(birds:Bird[]):void{
    for(let i=0;i<birds.length;i++){
        if(!birds[i].IsDead){
            mainBird = birds[i];
            break;
        }
    }
}

function updateBirds(birds:Bird[]):void{
    for(let i=0;i<birds.length;i++){
        birds[i].update(pipes); 
    }
}

function updatePipes(pipes:Pipe[]):void{
    for(let i=0;i<pipes.length;i++){
        pipes[i].update();
        if(pipes[i].x < -pipes[i].width){
            pipes.shift();
        }
    }
}

function generateBirds(N:number):Bird[]{
    const birds:Bird[] = [];
    for(let i=0;i<N;i++){
        birds.push(new Bird(myCanvas.width/4,myCanvas.height/2,15,"AI"));
    }
    return birds;
}

function save():void{
    localStorage.setItem("bestBrain",
        JSON.stringify(mainBird.brain));
    localStorage.setItem("generation",
        JSON.stringify(StorageData['generation'] + 1));
    localStorage.setItem("bestScore",
        JSON.stringify(StorageData['bestScore']));
}

function HandleStorage():{[Key:string]:number}{
    let generation:number = 0;
    let bestScore:number = 0;

    let gen = localStorage.getItem("generation");
    let bes = localStorage.getItem("bestScore");
    let bestBrn = localStorage.getItem("bestBrain");
    if(gen){
        generation=JSON.parse(gen);    
    }
    if(bes){
        bestScore=JSON.parse(bes);
    }
    if(bestBrn){
        for(let i=0;i<birds.length;i++){
            birds[i].brain=JSON.parse(bestBrn);
            if(i!=0){
                NeuralNetwork.mutate(birds[i].brain,0.05);
            }
        }
    }
    return {'generation':generation, 'bestScore':bestScore};
}

function drawBirds():void{
    for(let i=1;i<birds.length;i++){
        birds[i].draw(ctx)
    }
    mainBird.draw(ctx,true);
}

// function saveAndRefresh():void{
//     save();
//     location.reload();
// }

// function discard():void{
//     localStorage.removeItem("bestBrain");
//     localStorage.removeItem("generation");
//     localStorage.removeItem("bestScore");
//     location.reload();
// }

