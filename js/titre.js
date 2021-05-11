const searchParams = location.search;
console.log(searchParams);
const urlSearchParams = new URLSearchParams(searchParams);
console.log(urlSearchParams);
const id = urlSearchParams.get("id");
const listeningAudio = document.createElement('audio');

console.log(id); 
const url =`https://api.deezer.com/track/${id}`;
console.log(url);
fetch(url)
.then((response)=>response.json())
.then((song)=>{
  console.log(song);
  displaySong(song);
  
})

function displaySong(song){
  const songTitle = document.querySelector('h2');
  const smalSongTitle = document.querySelector('h3');
  const figCaption = document.querySelectorAll('figcaption');
  const imgsCover = document.querySelectorAll('img');
  const infosSong = document.getElementById('parution');
  const extraitAudio = document.getElementById('extrait');
  let duringOfSong = (parseInt(song.duration)/60).toFixed(2);
  duringOfSong =duringOfSong.substring(0,1)+"m"+duringOfSong.substring(2,4);

  infosSong.innerHTML=`Durée : ${duringOfSong} / Date de parution ${song.release_date}`;
  songTitle.innerHTML=`titre : ${song.title_short}`;
  smalSongTitle.innerHTML=`${song.title_short}`
  figCaption[0].innerHTML= `album: <a href="../html/pageAlbum.html?id=${song.album.id}">${song.album.title}</a>`;
  figCaption[1].innerHTML= `Artiste : <a href="../html/pageArtiste.html?id=${song.artist.id}">${song.artist.name}</a>`;
  console.log(imgsCover);

  listeningAudio.src=`${song.preview}`; 
  listeningAudio.setAttribute("controls","controls");
  listeningAudio.setAttribute("id","myplayer");
  console.log(listeningAudio);
/*   listeningAudio.addEventListener("play",(e)=>{
    console.log("jordan")
  }) */
  displayradio("play",listeningAudio);

  extraitAudio.append(listeningAudio);
  imgsCover[0].src= `${song.album.cover_medium}`;
  imgsCover[1].src= `${song.artist.picture_medium}`;
  
}




function displayradio(event,tag){
  const container = document.querySelector('container');
  console.log("hum"+container);

  if(event=="play"){
      tag.addEventListener(event,(e)=>{
      container.style.display= "none";
    });
  }

  if(event=="pause"){
    tag.addEventListener(event,(e)=>{
      container.getElementsByClassName.display= "none";

    });
  }
}