export default class Controls{
    public jump:boolean = false;
    public beginGame:boolean = false;
    public last_jump:number = 0;


    constructor(User:string){
        if(User === "HUMAN"){
            this.#addkeyboradlisteners()
        }
    }

    #addkeyboradlisteners():void{
        document.onkeydown=(event)=>{
            switch(event.key){
                case "ArrowUp":
                    if(this.beginGame){
                        this.jump = true;
                        
                    }
                    else{this.beginGame = true;}

                    break;
                case " ":
                    if(this.beginGame){
                        this.jump = true;
                    }
                    else{this.beginGame = true;}
                    
                    break;
            }
        }
        window.addEventListener('click', (event) => {
            if(event.button == 0){
                if(this.beginGame){
                    this.jump = true;
                }
                else{this.beginGame = true;}
            }
          })

    }
}