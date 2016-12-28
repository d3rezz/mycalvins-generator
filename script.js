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

            context.drawImage(imageObj, 0, 0, newWidth, newHeight);

            var whatido = document.getElementById('whatido').value;
            var fontSize = 40;
            context.font = fontSize+"pt FuturaLight";
            context.fillStyle = 'white';
            context.textAlign="center";

            whatido = "  " + whatido + "  ";
            text = "I " + whatido + " in #mycalvins"

            //Fit text in canvas
            console.log("text width: " + context.measureText(text).width + " 0.9 image width: " + newWidth);

            while (context.measureText(text).width > 0.9*newWidth ) {
                fontSize -= 1;
                context.font = fontSize+"pt FuturaLight";
                console.log("text width: " + context.measureText(text).width + " 0.9 image width: " + newWidth);
            }

            context.fillText(text, newWidth/2, newHeight/2);


            //underline text
            underline(context, whatido, newWidth/2 - context.measureText(text).width/2 + context.measureText("I ").width, newHeight/2, 10, "white", 2, 0);

        };
        imageObj.src = reader.result;
    }
    if(file){
        reader.readAsDataURL(file);
    }else{
    }
}

function underline(ctx, text, x, y, fontSize, color, thickness ,offset){
  var width = ctx.measureText(text).width;
  console.log("text width: "+ width);

  y += fontSize+offset;

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.moveTo(x,y);
  ctx.lineTo(x+width,y);
  ctx.stroke();

}
