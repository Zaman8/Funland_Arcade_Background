const audioViz = document.getElementById('AudioViz');


//Hande setting Audio info Display

const albumCover = document.getElementById('albumPic');

function livelyCurrentTrack(data) {
    let obj = JSON.parse(data);
    //when no track is playing its null
    if (obj != null && showAudio)
    {
      audioViz.style.visibility = "visible";
      if (obj.Thumbnail != null)
      {
        albumCover.src = "data:image/png;base64, " + obj.Thumbnail;
      }
    } else {
      audioViz.style.visibility = "hidden";
      albumCover.src = "chiptuneCover_MarkSoto.jpg"
    }
  }