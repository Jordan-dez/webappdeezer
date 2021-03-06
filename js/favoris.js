const ulFavorisList = document.getElementById('favoris-list');
const allIdsSongInLocalStorage = localStorage.getItem("liked_user_list");
/* console.log(allIdsSongInLocalStorage); */
if (allIdsSongInLocalStorage) {
    const localStageItemsArray = JSON.parse(allIdsSongInLocalStorage);
    for (let i = 0; i < localStageItemsArray.length; i++) {
        fetch(`https://api.deezer.com/track/${localStageItemsArray[i]}`)
            .then(response => response.json())
            .then((result) => {
                displayCard(result);
            })
    }
}

function displayCard(array) {
    //création des différents éléments html de la liste ul

    const ul = document.getElementById('favoris-list');
    const li = document.createElement('li');
    const infosongdiv = document.createElement('div');
    const img = document.createElement('img');
    const songdiv = document.createElement('div');
    const ptitlesong = document.createElement('p');
    const partistname = document.createElement('p');
    const actionsdiv = document.createElement('div');
    const picondelete = document.createElement('p');
    const iicondelete = document.createElement('i');
    const palink = document.createElement('p');
    const alink = document.createElement('a');
    const iiconplay = document.createElement('i');

    //ajout des classes css aux éléments html
    infosongdiv.setAttribute("class", "infossong");
    actionsdiv.setAttribute("class", "actions");
    iicondelete.setAttribute("class", "fas fa-trash");
    iiconplay.setAttribute("class", "far fa-play-circle");
    songdiv.setAttribute("class", "song");
    picondelete.setAttribute("id", `${array.id}`);
    picondelete.setAttribute("class", "deleted");

    //affectation des valeurs aux éléments html

    ptitlesong.innerHTML = array.title_short;
    partistname.innerHTML = "Artiste : " + array.artist.name;
    img.src = array.album.cover_medium;
    img.alt = array.album.cover;
    //ajout des icons à leurs parents <p> 
    picondelete.appendChild(iicondelete);
    palink.appendChild(alink);
    //ajout à la balise <a> sa valeur href
    alink.setAttribute("href", `../html/pagetitre.html?id=${array.id}`);
    alink.appendChild(iiconplay);
    //ajouts des éléments aux div
    songdiv.appendChild(ptitlesong);
    songdiv.appendChild(partistname);
    actionsdiv.appendChild(picondelete);
    actionsdiv.appendChild(palink);
    infosongdiv.appendChild(img);
    infosongdiv.appendChild(songdiv);
    //ajouts des éléments au li
    li.appendChild(infosongdiv);
    li.appendChild(actionsdiv);
    //ajout du li au ul
    ul.appendChild(li);


    const alldeletedp = document.querySelectorAll('.deleted');
    alldeletedp.forEach(function(element, index) {
        element.addEventListener('click', deletefavoritesong, false);
    })
}




//fonction de suppression
function deletefavoritesong(param) {
    console.log(param.currentTarget.id);
    const storedAllIds = window.localStorage.getItem("liked_user_list");
    let storedArr = [];
    if (storedAllIds) {
        storedArr = JSON.parse(storedAllIds);
    }

    for (var i = 0; i < storedArr.length; i++) {
        if (storedArr[i] === param.currentTarget.id) {
            storedArr.splice(i, 1);
        }
    }
    window.localStorage.setItem("liked_user_list", JSON.stringify(storedArr));
    alert("votre musique sélectionnée a été suppprimé aux favoris avec succès");

    return storedArr;
    alert("votre musique sélectionnée a été ajoutée aux favoris avec succès");
}