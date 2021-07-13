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
    console.log(keywordInput);
}