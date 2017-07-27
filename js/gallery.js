$(document).ready(function()
{

    var imageDessert = new Array('img/7.jpg', 'img/8.jpg', 'img/9.jpg');
    var imageEntre = new Array('img/10.jpg', 'img/11.jpg', 'img/12.jpg');
    var imageGeneral = new Array('img/1.jpg', 'img/2.jpg', 'img/3.jpg');
    var imageNumber = 0;
    var imageLength = 2;

    function changeImage(num)
    {
        imageNumber += num;
        if(imageNumber > imageLength)
        {
            imageNumber = 0;
        }
        if(imageNumber < 0)
        {
            imageNumber = imageLength
        }
        document.slideshow1.src = imageDessert[imageNumber];
        document.slideshow2.src = imageEntre[imageNumber];
        document.slideshow3.src = imageGeneral[imageNumber];
        return false;
    }

    setInterval(function(){ changeImage(-1); }, 5000);
});