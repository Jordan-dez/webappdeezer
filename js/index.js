const form =  document.querySelector('form');
const loading = document.querySelector('.blockloader');
const searchformInput = document.querySelector('.searchform input[type=text]');
const selectedoption = document.getElementById('order-select');
const allcards = document.getElementById('allcards');
console.log(loading);
/*************animation input */
searchformInput.addEventListener('input', function(e) {

  if(e.target.value !== "") {
      e.target.parentNode.classList.add('active-input');
  } else if (e.target.value === "") {
      e.target.parentNode.classList.remove('active-input');
  }

})

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  loading.style.display="block";
  message();
});
function recherche(){
  searchformInputValue=searchformInput.value.toUpperCase();
  let url;
  switch(selectedoption.value){
    case "album" :
      url=`https://api.deezer.com/search?q=${searchformInputValue}&​order​=ALBUM_ASC&index=0&limit=151`;
      break;
    case "artiste":
      url=`https://api.deezer.com/search?q=${searchformInputValue}&​order​=ARTIST_ASC&index=0&limit=151`;
      break;
    case "musique" :
      url=`https://api.deezer.com/search?q=${searchformInputValue}&​order​=TRACK_ASC&index=0&limit=151`;

    break;

    case "populaire" :
      url=`https://api.deezer.com/search?q=${searchformInputValue}&​order​= RANKING&index=0&limit=151`;
      break
    case "mieuxnote":
      url=`https://api.deezer.com/search?q=${searchformInputValue}&​order​=RATING_ASC&index=0&limit=151`;
      break;
    case "duree" : 
      url=`https://api.deezer.com/search?q=${searchformInputValue}&​order​=DURATION_ASC`;
      break;
    default:
      url= `https://api.deezer.com/search?q=${searchformInputValue}&index=0&limit=151`

  }
  console.log(url);
  fetch(url)
  .then(response=>response.json())
  .then(allResults=>{
    allResults.data.forEach((result)=>{

      /**création des différents composants html pour construire les cartes*/

      console.log(result);
      const card = document.createElement('li');
      const previewAudio = document.createElement('audio');
      const cardTitle = document.createElement('h2');
      const imgCoverAlbum = document.createElement('img');
      const artistNameAndAlbum = document.createElement('p');
      const duringOfsong = document.createElement('p');
      const plikeIcon = document.createElement('p');
      const heartIcon = document.createElement('i');
      const pboutons = document.createElement('p');
      const consultAlbumLink = document.createElement('a');
      const consultArtistProfilLink = document.createElement('a');
      const aExtrait = document.createElement('a');

      aExtrait.setAttribute("href",`../html/pagetitre.html?id=${result.id}`);
      consultArtistProfilLink.setAttribute("href",`../html/pageArtiste.html?id=${result.artist.id}`);
      consultAlbumLink.setAttribute("href",`../html/pageAlbum.html?id=${result.album.id}`);


      aExtrait.setAttribute("class","btn btn-album");
      consultArtistProfilLink.setAttribute("class","btn btn-album");
      consultAlbumLink.setAttribute("class","btn btn-album");

      aExtrait.innerHTML="écouter l'extrait";
      consultArtistProfilLink.innerHTML="voir la fiche de l'artiste";
      consultAlbumLink.innerHTML="voir l'album";

      pboutons.append(aExtrait);
      pboutons.append(consultArtistProfilLink);
      pboutons.append(consultAlbumLink);

      //ajouts des valeurs aux différents composants html des cartes créées

      previewAudio.src= result.preview;
      imgCoverAlbum.src=result.album.cover_big;
      cardTitle.innerHTML= result.title_short;
      artistNameAndAlbum.innerHTML = result.artist.name+" /  "+result.album.title;
      let temp = (parseInt(result.duration)/60).toFixed(2);
      duringOfsong.innerHTML="Durée : "+ temp.substring(0,1)+"m"+temp.substring(2,4);

      //assemblage des composant pour construire les cards

      plikeIcon.appendChild(heartIcon);
      card.appendChild(imgCoverAlbum);
      card.appendChild(cardTitle);
      card.appendChild(artistNameAndAlbum);
      card.appendChild(duringOfsong);
      card.appendChild(plikeIcon);
      /* card.appendChild(aExtrait);  */
      card.appendChild(pboutons);
      loading.style.display="none";
      allcards.appendChild(card);
      

      //ajout des classes aux différents éléments html créés

      previewAudio.setAttribute("controls","controls");
      allcards.setAttribute("class","allcard");
      card.setAttribute("class","cards");
      imgCoverAlbum.setAttribute("class","artistImg");
      duringOfsong.setAttribute("class","dureeson");
      heartIcon.setAttribute("class","far fa-heart likeIcon");
      plikeIcon.setAttribute("class","like");
      pboutons.setAttribute("class","displayflex");
          

      console.log(selectedoption.value);

    }) 
    console.log(document.querySelectorAll('p.like').length)
  })
  .catch((err)=>{
    console.log(err);
    alert("une erreur inattendue est survenue");
  })
}




console.log(document.querySelectorAll('p.like'));
document.querySelectorAll('p.like').forEach(item => {
  item.addEventListener('click', event => {
    alert("bonjour");
    console.log("ici..");
  })
  /* item.style.backgroundColor="red"; */
})

function message(){
    setTimeout(recherche, 200); 
}