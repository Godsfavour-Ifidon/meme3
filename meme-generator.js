

let topTextInput,
  bottomTextInput,
  topTextSizeInput,
  bottomTextSizeInput,
  imageInput,
  generateBtn,
  downloadBtn,
  canvas,
  ctx;

function generateMeme(img, topText, bottomText, topTextSize, bottomTextSize) {
  let fontSize;

  // Size canvas to image
  canvas.width = img.width;
  canvas.height = img.height;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw main image
  ctx.drawImage(img, 0, 0);

  // Text style: white with black borders
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.textAlign = "center";

  // Top text font size
  fontSize = canvas.width * topTextSize;
  ctx.font = fontSize + "px Impact";
  ctx.lineWidth = fontSize / 20;

  // Draw top text
  ctx.textBaseline = "top";
  topText.split("\n").forEach(function (t, i) {
    ctx.fillText(t, canvas.width / 2, i * fontSize, canvas.width);
    ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width);
  });

  // Bottom text font size
  fontSize = canvas.width * bottomTextSize;
  ctx.font = fontSize + "px Impact";
  ctx.lineWidth = fontSize / 20;

  // Draw bottom text
  ctx.textBaseline = "bottom";
  bottomText
    .split("\n")
    .reverse()
    .forEach(function (t, i) {
      // .reverse() because it's drawing the bottom text from the bottom up
      ctx.fillText(
        t,
        canvas.width / 2,
        canvas.height - i * fontSize,
        canvas.width
      );
      ctx.strokeText(
        t,
        canvas.width / 2,
        canvas.height - i * fontSize,
        canvas.width
      );
    });

  downloadBtn.disabled = false;
}

function init() {
  // Initialize variables
  topTextInput = document.getElementById("top-text");
  bottomTextInput = document.getElementById("bottom-text");
  topTextSizeInput = document.getElementById("top-text-size-input");
  bottomTextSizeInput = document.getElementById("bottom-text-size-input");
  imageInput = document.getElementById("image-input");
  generateBtn = document.getElementById("generate-btn");
  canvas = document.getElementById("meme-canvas");
  downloadBtn = document.getElementById("download-btn"); // Move this line up

  ctx = canvas.getContext("2d");

  canvas.width = canvas.height = 0;

  // Generate button click listener
  generateBtn.addEventListener("click", function () {
    // Read image as DataURL using the FileReader API
    let reader = new FileReader();
    reader.onload = function () {
      let img = new Image();
      img.src = reader.result;
      generateMeme(
        img,
        topTextInput.value,
        bottomTextInput.value,
        topTextSizeInput.value,
        bottomTextSizeInput.value
      );
    };
    reader.readAsDataURL(imageInput.files[0]);
  });

  // Download button click listener
  downloadBtn.addEventListener("click", function () {
    // Get data URL of the canvas
    const dataURL = canvas.toDataURL("image/png");

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "meme.png"; // Set the download file name

    // Simulate a click to trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  });

  downloadBtn.disabled = true; // Disable download button initially, if needed
}

init();

