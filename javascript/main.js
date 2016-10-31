
var imageRepository = new function() {
    this.background_img = new Image();
    this.background_img.src = "img/bg.png";

    this.bird_img = new Image();
    this.bird_img.src = "img/bird1.png";

    this.obstacle_img = new Image();
    this.obstacle_img.src = "img/tube.png";

    this.obstacle_img2 = new Image();
    this.obstacle_img2.src = "img/tube2.png";


    var numImages = 4;
    var numLoaded = 0;
    function imageLoaded() {
        numLoaded++;
        if (numLoaded === numImages) {
            init();
        }
    }

    this.background_img.onload = function() {
        imageLoaded();
    };
    this.bird_img.onload = function() {
        imageLoaded();
    };
    this.obstacle_img.onload = function() {
        imageLoaded();
    };
    this.obstacle_img2.onload = function() {
        imageLoaded();
    };
};


var music = new Audio("audio/mop.mp3");
music.load();
music.loop = true;
music.play();


function init() {

    $("body").keydown(function() {
        if (gameover == false) {
            bird.Jump();
        }
    });

    var gameover = false;
    var raw_score = 0;
    var score = 0;

    var bg_canvas = document.getElementById("background-canvas");
    var obstacles_canvas = document.getElementById("obstacles-canvas");
    var bird_canvas = document.getElementById("bird-canvas");

    var bg_context = bg_canvas.getContext("2d");
    var obstacles_context = obstacles_canvas.getContext("2d");
    var bird_context = bird_canvas.getContext("2d");

    var canvas_height = bg_canvas.height;
    var canvas_width = bg_canvas.width;

    bg_canvas.focus();


    var background = new Background(bg_context, imageRepository, canvas_width);
    var bird = new Bird(bird_context, imageRepository, canvas_width, canvas_height);
    var obstacles = new Array();
    //bottom obstacles
    obstacles.push(new Obstacle(obstacles_context, imageRepository, canvas_width, canvas_height, 1000, 420, 200, 400, "bottom"));
    obstacles.push(new Obstacle(obstacles_context, imageRepository, canvas_width, canvas_height, 1400, 400, 200, 400, "bottom"));
    obstacles.push(new Obstacle(obstacles_context, imageRepository, canvas_width, canvas_height, 1900, 320, 200, 400, "bottom"));
    //top obstacles
    obstacles.push(new Obstacle(obstacles_context, imageRepository, canvas_width, canvas_height, 1000, -310, 200, 400, "top"));
    obstacles.push(new Obstacle(obstacles_context, imageRepository, canvas_width, canvas_height, 1400, -300, 200, 400, "top"));
    obstacles.push(new Obstacle(obstacles_context, imageRepository, canvas_width, canvas_height, 1900, -320, 200, 400, "top"));


    function animate() {

        requestAnimFrame(animate);
        background.Draw();

        for (var i = 0; i < obstacles.length; i++) {
            var obstacle = obstacles[i];
            obstacle.Draw();


            if (gameover === false) {

                //check for collision
                if (bird.x < obstacle.x + obstacle.obstacle_width + 10 && bird.x + bird.bird_width - 10 > obstacle.x &&
                        bird.y < obstacle.y + obstacle.obstacle_height && bird.y + bird.bird_height > obstacle.y) {
                    gameover = true;
                    bird.dy = 8;
                    background.speed = 0;
                    for (var j = 0; j < obstacles.length; j++) {
                        obstacles[j].dx = 0;
                    }
                }

            }
        }

        //floor check
        if (bird.Draw() === false) {
            $("#user-score").html(score);
            $("#hidden-score").val(score);
            $("#gameover-panel").fadeIn(1000);
            gameover = true;
            bird.dy = 8;
            background.speed = 0;
            for (var j = 0; j < obstacles.length; j++) {
                obstacles[j].dx = 0;
            }
        }

        if (gameover === false) {
            raw_score++;
            score = Math.floor(raw_score / 10);
        }

        $("#score").html(score + " points");
    }



    /** * requestAnim shim layer by Paul Irish * Finds the first API that works to optimize the animation loop, * otherwise defaults to setTimeout(). */
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback, element) {
                    window.setTimeout(callback, 1000 / 60);
                };
    })();



    animate();
}



$("#add-score").click(function() {
    addScore();
    $("#add-score-form").fadeOut(1000, function() {
        var result = getScores();
        $("#scores").html(result);
        $("#scores-list").fadeIn();
    });
});

$("#close").click(function() {
    $("#gameover-panel").fadeOut(function() {
        location.reload();
    });
});





