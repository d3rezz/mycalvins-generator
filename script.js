//Canvas dimensions
var CANVAS_HEIGHT = 480;
var CANVAS_WIDTH = 640;

//Once DOM structure is loaded, add listener to the generate button
document.addEventListener("DOMContentLoaded", function(event) {
    var generateButton = document.getElementById('generateButton')
    generateButton.addEventListener('click', generate, true);
});


//Loads picture, writes text on it and displays
function generate(){
    var file = document.getElementById("getFile").files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
        var canvas = document.getElementById("mycanvas");
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        var context = canvas.getContext("2d");

        var imageObj = new Image();
        imageObj.onload = function(){
            //Resize picture to canvas
            var ratio = imageObj.width/imageObj.height;
            var newWidth = canvas.width;
            var newHeight = newWidth / ratio;
            if (newHeight > canvas.height) {
                newHeight = canvas.height;
                newWidth = newHeight * ratio;
            }
            canvas.width = newWidth;
            canvas.height = newHeight;

            //Display picture
            context.drawImage(imageObj, 0, 0, newWidth, newHeight);

            //Write text
            var whatido = document.getElementById('whatido').value;
            var fontSize = 40;
            context.font = fontSize+"pt FuturaLight";
            context.fillStyle = 'white';
            context.textAlign="center";

            whatido = "  " + whatido + "  ";
            text = "I " + whatido + " in #mycalvins"

            //Fit text in canvas
            while (context.measureText(text).width > 0.9*newWidth ) {
                fontSize -= 1;
                context.font = fontSize+"pt FuturaLight";
            }

            //draw text
            context.fillText(text, newWidth/2, newHeight/2);

            //underline text
            underline(context, whatido, newWidth/2 - context.measureText(text).width/2 + context.measureText("I ").width, newHeight/2, 10, "white", 2, 0);

	        //save canvas image as data url (png by default)
	        var dataURL = canvas.toDataURL();

            // set canvasImg image src to dataURL
            document.getElementById('canvasImg').src = dataURL;

        };
        imageObj.src = reader.result;
    }
    if(file){
        reader.readAsDataURL(file);
    }else{
    }
}

//underline text
function underline(ctx, text, x, y, fontSize, color, thickness ,offset){
  var width = ctx.measureText(text).width;

  y += fontSize+offset;

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.moveTo(x,y);
  ctx.lineTo(x+width,y);
  ctx.stroke();
}
