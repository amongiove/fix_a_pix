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
              <img src=${picture.attributes.picture_url} height="200" width="250">
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
    console.log(keywordInput)
    const search = `http://localhost:3000/api/v1/pictures/search/${keywordInput}`
    fetch(search)
    .then(response => response.json())

    .then(photos => {
        console.log(photos)
        photos.forEach(photo => {
          const results = `
            <div>
              <img src=${photo.src.original} height="200" width="250">
            </div>
            <br><br>`;
  
            document.querySelector('#search-pics').innerHTML += results

            //TODO: reset after each new search
        })
    })
}
