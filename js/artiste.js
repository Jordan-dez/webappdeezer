const searchParams =location.search;
console.log(searchParams);
const urlSearchParams = new URLSearchParams(searchParams);
/* console.log(urlSearchParams); */
const id = urlSearchParams.get("id"); 
const url = `https://api.deezer.com/artist/${id}`;
fetch(url)
.then((response)=>response.json())
.then((artiste)=>{
  console.log(artiste);
  displayArtiste(artiste);
  
})

function displayArtiste(artiste){
  const section = document.querySelector('section');
  const artistName = document.querySelector('h2');
  const artistImg = document.createElement('img');
  const nbAlbum = document.createElement('p');
  const nbfan = document.createElement('p');
  const artistProfilDeezer = document.createElement('a');

  
  artistImg.src= artiste.picture_big;
  artistName.innerHTML= artiste.name;
  nbAlbum.innerHTML= `nombre d'album : ${artiste.nb_album}`;
  nbfan.innerHTML=`nombre de fans : ${artiste.nb_fan}`;
  artistProfilDeezer.setAttribute("href",`${artiste.link}`);
  artistProfilDeezer.setAttribute("target","_blank");
  artistProfilDeezer.innerText="voir l'artiste sur deezer";
  section.appendChild(artistImg);
  section.append(nbAlbum);
  section.append(nbfan);
  section.appendChild(artistProfilDeezer);

}