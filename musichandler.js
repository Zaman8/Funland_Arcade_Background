const audioViz = document.getElementById('AudioViz');


//Handle setting Audio info Display visible 

const albumCover = document.getElementById('sourceImage');

function livelyCurrentTrack(data) {
    let obj = JSON.parse(data);
    //when no track is playing its null
    if (obj != null)
    {
      audioViz.style.visibility = "visible";
      if (obj.Thumbnail != null)
      {
        albumCover.src = "data:image/png;base64, " + obj.Thumbnail;
      }
    } else {
      audioViz.style.visibility = "hidden";
      albumCover.src = "placeholderAlbumArt.jpg"
    }
  }

let canvas = document.getElementById("visualizer");
let max_height, startPos, vizWidth, midY;

let linesColor = "rgb(255,255,255)";
let backgroundColor = "rbg(255,255,255)"
let square = false;

let ctx = canvas.getContext("2d");

function setSize() {
  max_height = canvas.height * 0.75;
  startPos = canvas.width * 0.1;
  vizWidth = canvas.width * 0.8;
  midY = canvas.height - canvas.height / 4;
}

window.onload = () => {
  setSize();
};

function livelyAudioListener(audioArray) 
{
  maxVal = 1;
  for (var x of audioArray) {
    if (x > maxVal) maxVal = x;
  }

  const offSet = vizWidth / audioArray.length;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.lineJoin = "round";
  ctx.moveTo(startPos - offSet * 3, midY);
  ctx.lineTo(startPos, midY);
  let posInLine = -1;
  for (var x = 0; x < audioArray.length; x++) {
    posInLine++;
    ctx.lineTo(
      startPos + offSet * posInLine,
      midY - (audioArray[x] / maxVal) * max_height
    );
    if (square)
      ctx.lineTo(
        startPos + offSet * (posInLine + 1),
        midY - (audioArray[x] / maxVal) * max_height
      );
  }
  ctx.lineTo(startPos + offSet * (posInLine + (square ? 1 : 0)), midY);
  ctx.lineTo(startPos + offSet * (posInLine + (square ? 4 : 3)), midY);

  renderLine(linesColor);
}

function renderLine(color) {
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.stroke();
}
