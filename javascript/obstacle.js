function Obstacle(context, imageRepository, canvas_width, canvas_height, x, y, obstacle_width, obstacle_height, type) {
    this.context = context;
    this.obstacle_height = obstacle_height;
    this.obstacle_width = obstacle_width;
    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;
    this.x = x;
    this.y = y;
    this.dx = 2;
    
    if(type === "bottom"){
        this.image = imageRepository.obstacle_img;
    }else{
        this.image = imageRepository.obstacle_img2;
    }
    
    this.Draw = function() {
        //clear the rectangle around the obstacle
        this.context.clearRect(this.x, this.y, this.obstacle_width, this.obstacle_height);
        this.x = this.x - this.dx;

        if (this.x + this.obstacle_width <= 0) {
            this.x = this.canvas_width + 300;
            
            if(type === "bottom"){
                this.y = canvas_height - (100+random(100));
            }else{
                this.y = -200+random(-300);
            }
        }

        this.context.drawImage(this.image, this.x, this.y, this.obstacle_width, this.obstacle_height);
    };

}


