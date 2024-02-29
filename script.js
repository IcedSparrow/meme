function generateMeme() {
    var imageInput = document.getElementById('image-input');
    var topText = document.getElementById('top-text').value;
    var bottomText = document.getElementById('bottom-text').value;
    var topTextColor = document.getElementById('top-text-color').value;
    var bottomTextColor = document.getElementById('bottom-text-color').value;
    var memeImage = document.getElementById('meme-image');
    var downloadBtn = document.getElementById('download-btn');

    if (imageInput.files && imageInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            memeImage.onload = function() {
                drawTextOnImage(memeImage, topText, bottomText, topTextColor, bottomTextColor);
                downloadBtn.href = memeImage.src;
                downloadBtn.style.display = 'block';
            };
            memeImage.src = e.target.result;
        }

        reader.readAsDataURL(imageInput.files[0]);
    }
}

function drawTextOnImage(imageElement, topText, bottomText, topTextColor, bottomTextColor) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = imageElement.width;
    canvas.height = imageElement.height;

    ctx.drawImage(imageElement, 0, 0);

    ctx.fillStyle = topTextColor;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.textAlign = 'center';
    ctx.font = '60px Arial';

    // Top text
    ctx.fillText(topText, canvas.width / 2, 40);
    ctx.strokeText(topText, canvas.width / 2, 40);

    // Bottom text
    ctx.fillStyle = bottomTextColor;
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);

    // Zamień źródło obrazu na dane URL z kanwy
    imageElement.src = canvas.toDataURL('image/jpeg');

    // Usuń kanwę
    canvas = null;
}
