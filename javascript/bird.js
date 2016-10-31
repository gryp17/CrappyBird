function Bird(context, imageRepository, canvas_width, canvas_height) {
    this.context = context;
    this.bird_height = imageRepository.bird_img.height;
    this.bird_width = imageRepository.bird_img.width;
    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;
    this.x = canvas_width / 2 - 120;
    this.y = canvas_height / 2 - 20;
    this.dy = 5;
    this.jumping = false;

    this.Draw = function() {
        //clear the rectangle around the bird
        this.context.clearRect(this.x-5, this.y-5, this.bird_width+5, this.bird_height+5);
        
        this.y = this.y + this.dy;

        if (this.y < 0) {
            this.y = 0;
        }

        this.context.drawImage(imageRepository.bird_img, this.x, this.y);

        if (this.jumping && this.dy < 5) {
            this.dy = this.dy + 0.8;
        }
        else {
            this.jumping = false;
            this.dy = 5;
            imageRepository.bird_img.src = "img/bird1.png";
        }

        if(this.y > this.canvas_height-this.bird_height){
            return false;
        }
        
        return true;
    };

    this.Jump = function() {
        if (this.jumping === false && this.dy === 5) {
            this.dy = -13;
            this.jumping = true;
            imageRepository.bird_img.src = "img/bird2.png";
        }
    };


}


