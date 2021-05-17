const searchParams = location.search;
console.log(searchParams);
const urlSearchParams = new URLSearchParams(searchParams);
console.log(urlSearchParams);
const id = urlSearchParams.get("id");
const radioicon = document.getElementById('playersection');
console.log(radioicon);


//ma balise p dans laquelle se trouve le lien du son vers deezer.com et le bouton ajout aux favoris 
const linka = document.getElementById('mesliens');


const url = `https://api.deezer.com/track/${id}`;
console.log(url);
fetch(url)
    .then((response) => response.json())
    .then((song) => {
        console.log(song);
        displaySong(song);

    })

function displaySong(song) {
    const listeningAudio = document.createElement('audio');
    const figureimageArtiste = document.getElementById('myfigure');
    //création des balises img du cover de l'album et de l'artiste
    const imageArtist = document.createElement('img');
    const albumcover = document.createElement('img');
    //création des balises html
    const songTitle = document.querySelector('h2');
    const smalSongTitle = document.querySelector('h3');
    const infosSong = document.getElementById('parution');
    const figureimgalbumcover = document.getElementById('figureimgalbumcover');
    const extraitAudio = document.getElementById('extrait');
    const deezerlink = document.createElement('a');
    const btnaddfavoris = document.createElement('div');
    const linktoalbum = document.getElementById('linktoalbum');
    const alinktoalbum = document.createElement('a');
    const linktoartist = document.getElementById('linktoartist');
    const alinktoartist = document.createElement('a');

    let temp = Math.floor(song.duration / 60);
    let duringOfsong = "";
    duringOfsong = (temp > 9) ? temp + ":" : "0" + temp + ":";
    temp = song.duration % 60;
    duringOfsong += (temp > 9) ? temp : "0" + temp;

    infosSong.innerHTML = `Durée : ${duringOfsong} / Date de parution ${song.release_date}`;
    songTitle.innerHTML = `titre : ${song.title_short}`;
    smalSongTitle.innerHTML = `${song.title_short}`

    listeningAudio.src = `${song.preview}`;
    listeningAudio.setAttribute("controls", "controls");
    listeningAudio.setAttribute("id", "myplayer");
    deezerlink.setAttribute("href", `${song.link}`);
    deezerlink.setAttribute("class", "btn--succes btnincard");
    btnaddfavoris.setAttribute("class", "btn--primary btnincard")
    btnaddfavoris.setAttribute("id", `${song.id}`);
    imageArtist.setAttribute("class", "imgalbum");
    albumcover.setAttribute("class", "imgalbum");
    alinktoalbum.setAttribute("href", `../html/pageAlbum.html?id=${song.album.id}`);
    alinktoartist.setAttribute("href", `../html/pageArtiste.html?id=${song.artist.id}`)


    alinktoalbum.innerHTML = `${song.album.title}`;
    alinktoartist.innerHTML = `${song.artist.name}`;
    deezerlink.innerHTML = "voir le titre sur Deezer";
    btnaddfavoris.innerHTML = "ajouter aux favoris"
    linktoalbum.appendChild(alinktoalbum);
    linktoartist.appendChild(alinktoartist);
    linka.appendChild(deezerlink);
    linka.appendChild(btnaddfavoris);

    displayradio("play", listeningAudio);

    extraitAudio.append(listeningAudio);
    //image artiste avec ses différents attributs
    imageArtist.src = `${song.artist.picture_medium}`;
    imageArtist.alt = `${song.artist.picture}`;
    //image cover album et ses attributs
    albumcover.src = `${song.album.cover_medium}`;
    albumcover.alt = `${song.album.cover}`;

    /*  console.log(albumcover); */
    figureimageArtiste.appendChild(imageArtist);
    figureimgalbumcover.appendChild(albumcover);
    console.log(figureimageArtiste);
    listeningAudio.addEventListener("play", (e) => {
        radioicon.style.display = "block";
    })
    listeningAudio.addEventListener("pause", (e) => {
        radioicon.style.display = "none";
    })

}





function displayradio(event, tag) {
    const container = document.querySelector('container');
    console.log("hum" + container);

    if (event == "play") {
        tag.addEventListener(event, (e) => {
            container.style.display = "none";
        });
    }

    if (event == "pause") {
        tag.addEventListener(event, (e) => {
            container.getElementsByClassName.display = "none";

        });
    }
}