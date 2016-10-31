
function random(max) {
    return Math.floor(Math.random() * max) + 1;
}

function addScore() {
    var values = $("#add-score-form").serialize();
    $.ajax({
        url: 'backend/addScore.php',
        type: "post",
        data: values
    }).fail(function(xhr, textStatus, errorThrown) {
        alert("ajax failure - " + xhr + " " + textStatus + " " + errorThrown);
    });
}

function getScores() {
    var result = "";
    $.ajax({
        url: 'backend/getScores.php',
        type: "GET",
        async: false
    }).done(function (data){
        result = data;
    }).fail(function(xhr, textStatus, errorThrown) {
        alert("ajax failure - " + xhr + " " + textStatus + " " + errorThrown);
    });
    
    return result;
}



