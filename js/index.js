const form = document.querySelector('form');

const loading = document.querySelector('.blockloader');
const searchformInput = document.querySelector('.searchform input[type=text]');
const selectedoption = document.getElementById('order-select');
const allcards = document.getElementById('allcards');
console.log(loading);
/*************animation input */
searchformInput.addEventListener('input', function(e) {

    if (e.target.value !== "") {
        e.target.parentNode.classList.add('active-input');
    } else if (e.target.value === "") {
        e.target.parentNode.classList.remove('active-input');
    }

})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    loading.style.display = "block";
    message();
});

function recherche() {
    searchformInputValue = searchformInput.value.toUpperCase();
    let url;
    switch (selectedoption.value) {
        case "album":
            url = `https://api.deezer.com/search?q=${searchformInputValue}&​order​=ALBUM_ASC&index=0&limit=151`;
            break;
        case "artiste":
            url = `https://api.deezer.com/search?q=${searchformInputValue}&​order​=ARTIST_ASC&index=0&limit=151`;
            break;
        case "musique":
            url = `https://api.deezer.com/search?q=${searchformInputValue}&​order​=TRACK_ASC&index=0&limit=151`;

            break;

        case "populaire":
            url = `https://api.deezer.com/search?q=${searchformInputValue}&​order​= RANKING&index=0&limit=151`;
            break
        case "mieuxnote":
            url = `https://api.deezer.com/search?q=${searchformInputValue}&​order​=RATING_ASC&index=0&limit=151`;
            break;
        case "duree":
            url = `https://api.deezer.com/search?q=${searchformInputValue}&​order​=DURATION_ASC`;
            break;
        default:
            url = `https://api.deezer.com/search?q=${searchformInputValue}&index=0&limit=151`

    }
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(allResults => {
            console.log(allResults);
            allResults.data.forEach((result) => {

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

                    aExtrait.setAttribute("href", `../html/pagetitre.html?id=${result.id}`);
                    consultArtistProfilLink.setAttribute("href", `../html/pageArtiste.html?id=${result.artist.id}`);
                    consultAlbumLink.setAttribute("href", `../html/pageAlbum.html?id=${result.album.id}`);


                    aExtrait.setAttribute("class", "btnincard btn--succes");
                    consultArtistProfilLink.setAttribute("class", "btnincard btn--primary");
                    consultAlbumLink.setAttribute("class", "btnincard");

                    aExtrait.innerHTML = "écouter l'extrait";
                    consultArtistProfilLink.innerHTML = "voir l'artiste";
                    consultAlbumLink.innerHTML = "voir l'album";

                    pboutons.append(aExtrait);
                    pboutons.append(consultArtistProfilLink);
                    pboutons.append(consultAlbumLink);

                    //ajouts des valeurs aux différents composants html des cartes créées

                    imgCoverAlbum.src = result.album.cover_big;
                    cardTitle.innerHTML = result.title_short;
                    let minalbumtitle = result.album.title.substring(0, 20) + "...";
                    artistNameAndAlbum.innerHTML = result.artist.name + " /  " + minalbumtitle;
                    let temp = Math.floor(result.duration / 60);
                    duringOfsong.innerHTML = "Durée : ";
                    duringOfsong.innerHTML += (temp > 9) ? temp + ":" : "0" + temp + ":";
                    temp = result.duration % 60;
                    duringOfsong.innerHTML += (temp > 9) ? temp : "0" + temp;


                    //assemblage des composant pour construire les cards

                    plikeIcon.appendChild(heartIcon);
                    card.appendChild(imgCoverAlbum);
                    card.appendChild(cardTitle);
                    card.appendChild(artistNameAndAlbum);
                    card.appendChild(duringOfsong);
                    card.appendChild(plikeIcon);
                    /* card.appendChild(aExtrait); */
                    card.appendChild(pboutons);
                    loading.style.display = "none";
                    allcards.appendChild(card);


                    //ajout des classes aux différents éléments html créés

                    previewAudio.setAttribute("controls", "controls");
                    allcards.setAttribute("class", "allcard");
                    card.setAttribute("class", "cards");
                    imgCoverAlbum.setAttribute("class", "artistImg");
                    duringOfsong.setAttribute("class", "dureeson");
                    heartIcon.setAttribute("class", "fas fa-heart likeIcon");
                    plikeIcon.setAttribute("class", "like");
                    plikeIcon.setAttribute("id", `${result.id}`);
                    /* pboutons.setAttribute("class", "displayflex"); */


                    console.log(selectedoption.value);


                }) //fin de ma boucle forEach

            //ajout d'un evènement d'écoute sur chaque balise p qui contient l'icon du coeur
            document.querySelectorAll('p.like').forEach(item => {
                item.addEventListener('click', event => {
                    const idLikedSond = item.getAttribute('id');
                    updateLocalStogeWithLikedSong(idLikedSond);
                    item.querySelector('i').style.color = "red";
                    console.log(item.querySelector('i'));


                })
            })


        }) //fin du fetch
        .catch((err) => {
            console.log(err);
            alert("une erreur inattendue est survenue");
        })
}

const updateLocalStogeWithLikedSong = idSong => {
        const storedAllIds = window.localStorage.getItem("liked_user_list");
        let storedArr = [];
        if (storedAllIds) {
            storedArr = JSON.parse(storedAllIds);
        }
        console.log();
        if (!storedArr.includes(idSong)) {
            storedArr.push(idSong);
            window.localStorage.setItem("liked_user_list", JSON.stringify(storedArr));
            alert("votre musique sélectionnée a été ajoutée aux favoris avec succès");

        } else {
            alert("cette chanson existe déjà dans vos favoris");
        }

    }
    //fonction permettant de retarder le chargement de la page en jouant l'animation loading
function message() {
    setTimeout(recherche, 200);
}