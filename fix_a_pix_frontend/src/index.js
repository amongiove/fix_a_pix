const endPoint = "http://localhost:3000/api/v1/pictures"

document.addEventListener('DOMContentLoaded', () => {
    getPictures()

    const searchPicture = document.querySelector("#picture-search-form")

    searchPicture.addEventListener("submit", (e) => searchPictureHandler(e))

})

function getPictures(){
    fetch(endPoint)
    .then(response => response.json())

    .then(pictures => {
        pictures.data.forEach(picture => {
          const pictureMarkup = `
            <div data-id=${picture.id}>
              <img src=${picture.attributes.picture_url} height="100" width="150">
              <h3>${picture.attributes.title}</h3>
              ${picture.attributes.puzzles.length} puzzles</p>
              <button data-id=${picture.id}>ButtonToID</button>
            </div>
            <br><br>`;
  
            document.querySelector('#picture-container').innerHTML += pictureMarkup
        })
    })
}

function searchPictureHandler(e) {
    e.preventDefault()
    const keywordInput = document.querySelector("#search-keyword").value
    const search = `http://localhost:3000/api/v1/pictures/search/${keywordInput}`
    fetch(search)
    .then(response => response.json())
    .then(photos => {
        for(let i = 0; i < photos.length; i++) {
            const img = document.createElement("img");
            img.src = `${photos[i].src.small}`;

            img.setAttribute("class", "img-margin");

            img.addEventListener("click", function() {
                let clicked = document.getElementsByClassName('img-rounded-border')
                for(let i = 0; i < clicked.length; i++) {
                    clicked[i].classList.remove("img-rounded-border");
                }
                img.classList.add("img-rounded-border");
            })
            document.querySelector('#select-pics').appendChild(img);    
        }
    })
}
