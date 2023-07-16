import Bird from "./bird.js"
import Pipe from "./pipe.js"
import Ground from "./ground.js";
import { lerp, getIntersection,Point } from "./utils.js";

export default class Sensor{
    private bird: Bird; 
    public readonly rayCount:number = 10;
    private readonly rayLength:number =350;
    private readonly raySpread:number =Math.PI/2;
    private rays: Point[][];
    public readings: any;

    constructor(bird:Bird){
        this.bird = bird;
        this.rays=[];
        this.readings=[];
    }

    update(pipes: Pipe[]){
        this.#castRays();
        this.readings=[];
        for(let i=0;i<this.rays.length;i++){
            this.readings.push(
                this.#getReading(this.rays[i],pipes)
            );
        }
    }

    #getReading(ray:Point[], pipes: Pipe[]){
        let touches = this.#getRayPipeIntersections(ray,pipes);

        if(touches.length==0){
            return null;
        }else{
            const offsets=touches.map(e=>e.offset);
            const minOffset=Math.min(...offsets);
            return touches.find(e=>e.offset==minOffset);
        }
    }

    #getRayPipeIntersections(ray:Point[],pipes: Pipe[]){
        let touches=[];
        let currentPipe;
        if(pipes.length>1){
            currentPipe = pipes[0].x > this.bird.x ? pipes[0] : pipes[1];
        }
        else{
            currentPipe = pipes[0];
        }        
        let X = currentPipe.x;
        let Y = currentPipe.y;

        
        let bottomPipeFront = {x: X, 
                               y: Y};
        let bottomScreen = {x:bottomPipeFront.x, 
                            y: window.innerHeight}

        let topPipeFront = {x: X,  
                            y: Y - pipes[0].gap}; 
        let TopScreen =    {x: topPipeFront.x,     
                            y: 0}

        let BottomBasePipeFront = {x: X, 
                                   y: Y};
        let BottomBasePipeBack = {x: X + pipes[0].width, 
                                  y: Y};

        let TopBasePipeFront = {x: X, 
                                y: Y - pipes[0].gap};
        let TopBasePipeBack = {x: X + pipes[0].width, 
                               y: Y - pipes[0].gap};

        let groundStart = {x: this.bird.x, 
                           y: Ground.ground_height};
        let groundEnd = {x: this.bird.x + this.rayLength, 
                         y: Ground.ground_height};


        const touchBottomFront=getIntersection(
            ray[0],
            ray[1],
            bottomPipeFront,
            bottomScreen
        );
        const touchTopFront=getIntersection(
            ray[0],
            ray[1],
            topPipeFront,
            TopScreen
        );
        const touchBottomBase=getIntersection(
            ray[0],
            ray[1],
            BottomBasePipeFront,
            BottomBasePipeBack
        );
        const touchTopBase=getIntersection(
            ray[0],
            ray[1],
            TopBasePipeFront,
            TopBasePipeBack
        );
        const touchGround=getIntersection(
            ray[0],
            ray[1],
            groundStart,
            groundEnd
        );


        if(touchTopFront){
            touches.push(touchTopFront);
        }
        if(touchBottomFront){
            touches.push(touchBottomFront);
        }
        if(touchBottomBase){
            touches.push(touchBottomBase);
        }
        if(touchTopBase){
            touches.push(touchTopBase);
        }
        if(touchGround){
            touches.push(touchGround);
        }
        
        return touches;
    }


    #castRays(){
        //const direction = this.bird.vel > 2 ? Math.PI/6 : 0; 
        const direction = 0;
        this.rays = [];
        for(let i=0;i<this.rayCount; i++){
            const rayAngle=lerp(
                this.raySpread/2,
                -this.raySpread/2,
                this.rayCount==1?0.5:i/(this.rayCount-1)
            )

            const start = {y:this.bird.y, x: this.bird.x};
            const end={
                x:this.bird.x+
                    Math.cos(rayAngle + direction)*this.rayLength,
                y:this.bird.y+
                    Math.sin(rayAngle + direction)*this.rayLength
            };
            this.rays.push([start,end]);
        }
    }

    draw(ctx:any):void{
        for(let i=0;i<this.rayCount;i++){
            let end:any=this.rays[i][1];
            if(this.readings[i]){
                end=this.readings[i];
            }

            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="yellow";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="black";
            ctx.moveTo(
                this.rays[i][1].x,
                this.rays[i][1].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();
        }
    }        
}
