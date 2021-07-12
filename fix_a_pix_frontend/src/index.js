const endPoint = "http://localhost:3000/api/v1/pictures"

document.addEventListener('DOMContentLoaded', () => {
    getPictures()
})

function getPictures(){
    fetch(endPoint)
    .then(response => response.json())
    // .then(json => console.log(json))

    .then(pictures => {
        // remember our JSON data is a bit nested due to our serializer
        pictures.data.forEach(picture => {
          // double check how your data is nested in the console so you can successfully access the attributes of each individual object
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