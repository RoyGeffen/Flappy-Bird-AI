class Constrols{
    constructor(type){
        this.jump = false;
        this.beginGame = false;
        this.last_jump = 0;

        switch(type){
            case "HUMAN":
                this.#addkeyboradlisteners();
                break;
            case "AI":
                // call the ai
                break;
        }
    }

    #addkeyboradlisteners(){
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