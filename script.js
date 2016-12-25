document.addEventListener("DOMContentLoaded", function(event) {
    var b = document.getElementById('getval')
    b.addEventListener('change', readURL, true);
});


function readURL(){
    var file = document.getElementById("getval").files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
        var canvas = document.getElementById("mycanvas");
        var context = canvas.getContext("2d");


        var imageObj = new Image();
        imageObj.onload = function(){
            console.log("width: "+imageObj.width + " height: "+imageObj.height);
            var ratio = imageObj.width/imageObj.height;
            var newWidth = canvas.width;
            var newHeight = newWidth / ratio;
            if (newHeight > canvas.height) {
                newHeight = canvas.height;
                newWidth = newHeight * ratio;
            }

            canvas.width = newWidth;
            canvas.height = newHeight;

            context.drawImage(imageObj, 0, 0, newWidth, newHeight);

            var whatido = document.getElementById('whatido').value;
            context.font = '50px"FuturaLight"'
            context.fillStyle = 'white';
            context.textAlign="center";

            context.fillText("I " + whatido + " in #mycalvins", canvas.width/2, canvas.height/2);


        };
        imageObj.src = reader.result;
    }
    if(file){
        reader.readAsDataURL(file);
    }else{
    }
}
