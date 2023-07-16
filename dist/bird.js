import Sensor from './sensor.js';
import Pipe from './pipe.js';
import Ground from './ground.js';
import NeuralNetwork from './network.js';
import Controls from './controls.js';
export class Bird {
    x;
    y;
    radius;
    vel;
    maxVel;
    lastJump;
    IsDead;
    useBrain;
    sensor;
    controls;
    brain;
    constructor(x, y, radius, controlType = "HUMAN") {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vel = 0;
        this.maxVel = 10;
        this.lastJump = { "jumpStreak": 0.0, "lastJumpHeight": this.y };
        this.IsDead = false;
        this.useBrain = controlType == "AI";
        console.log(Sensor);
        this.sensor = new Sensor(this);
        if (controlType != "HUMAN") {
            this.brain = new NeuralNetwork([this.sensor.rayCount, 10, 10, 1]);
        }
        else
            this.brain = new NeuralNetwork([0]);
        this.controls = new Controls(controlType);
    }
    update(pipes) {
        if (!this.IsDead) {
            this.#moveAlive();
            this.IsDead = this.#DetectCollisions(pipes);
        }
        else {
            this.#moveIfDead();
        }
        if (this.sensor) {
            this.sensor.update(pipes);
            const offsets = this.sensor.readings.map((s) => s == null ? 0 : 1 - s.offset);
            const outputs = NeuralNetwork.feedForward(offsets, this.brain);
            if (this.useBrain) {
                this.controls.jump = Boolean(outputs[0]);
            }
        }
    }
    #DetectCollisions(pipes) {
        if (this.y + this.radius > Ground.ground_height) {
            return true;
        }
        for (let i = 0; i < pipes.length; i++) {
            const dx = pipes[i].x - this.x;
            if (dx < this.radius && dx > -pipes[0].width) {
                const dyBottom = pipes[i].y - this.y;
                const dyTop = this.y - pipes[i].topPipeY;
                if (!(dyBottom > this.radius && dyTop > this.radius)) {
                    return true;
                }
            }
        }
        return false;
    }
    #moveAlive() {
        var jumpConst = window.innerHeight / 13;
        const gravity = -0.1;
        if (this.vel <= this.maxVel) {
            this.vel -= gravity;
        }
        if (this.controls.jump) {
            if (this.lastJump.lastJumpHeight + 30 < this.y) {
                this.lastJump.jumpStreak += 1;
                jumpConst += 10 * this.lastJump.jumpStreak;
                this.y -= jumpConst;
                this.vel = 0;
                this.controls.jump = false;
            }
            else {
                this.y -= jumpConst;
                this.vel = 0;
                this.controls.jump = false;
                this.lastJump.jumpStreak = 0;
            }
            this.lastJump.lastJumpHeight = this.y;
        }
        this.y += this.vel;
    }
    #moveIfDead() {
        this.x -= Pipe.pipe_Velocity;
    }
    draw(ctx, drawSensor = false) {
        if (this.IsDead) {
            ctx.fillStyle = "#999999";
        }
        else {
            ctx.fillStyle = drawSensor ? "#ff9900" : "#ffe599";
            if (this.sensor && drawSensor) {
                this.sensor.draw(ctx);
            }
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
}
export default Bird;
//# sourceMappingURL=bird.js.map