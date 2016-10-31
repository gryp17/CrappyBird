function Background(context, imageRepository, canvas_width){
    this.context = context;
    this.canvas_width = canvas_width;
    this.speed = 2;
    this.x = 0;
    this.y = 0;
    
    this.Draw = function (){
        this.x = this.x-this.speed;
        this.context.drawImage(imageRepository.background_img ,this.x,this.y);
        this.context.drawImage(imageRepository.background_img, this.x+this.canvas_width, this.y);
        
        if(this.x < this.canvas_width*-1){
            this.x = 0;
        }
        
    };
    
}


