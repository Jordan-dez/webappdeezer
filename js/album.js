const searchParams =location.search;
console.log(searchParams);
const urlSearchParams = new URLSearchParams(searchParams);
/* console.log(urlSearchParams); */
const id = urlSearchParams.get("id"); 
const url = `https://api.deezer.com/album/${id}`;
fetch(url)
.then((response)=>response.json())
.then((album)=>{
  console.log(album);
  display(album);
  
})
function display(arr){
  const coverAlbum = document.createElement('img');
  const albumTitle = document.querySelector('h2');
  const artistName = document.querySelector('h3');
  const article = document.getElementById("article");
  const section = document.getElementById('section');
  const trackList = document.getElementById('tracl-list');
  artistName.innerHTML=`Artiste :<a href="../html/pageArtiste.html?id=${arr.artist.id}">${arr.artist.name}</a>`;
  albumTitle.innerHTML =`Album : ${arr.title}`;
  coverAlbum.src=arr.cover_big
  section.appendChild(coverAlbum);
  for(let i=0;i<arr.tracks.data.length;i++){
    let duringOfEachSong = (parseInt(arr.tracks.data[i].duration)/60).toFixed(2);
    duringOfEachSong =duringOfEachSong.substring(0,1)+"m"+duringOfEachSong.substring(2,4);
    trackList.innerHTML += `<li><a href="../html/pagetitre.html?id=${arr.tracks.data[i].id}">${arr.tracks.data[i].title} (${duringOfEachSong})</a></li>`;
    console.log(arr.tracks.data)
    
  }
  section.append(trackList);
  
}