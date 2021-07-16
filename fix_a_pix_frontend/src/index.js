const pictureEndPoint = "http://localhost:3000/api/v1/pictures"
const categoryEndPoint = "http://localhost:3000/api/v1/categories"

document.addEventListener('DOMContentLoaded', () => {

    // getPictures()

    hideCreatePuzzleAttributes()  

    const searchPicture = document.querySelector("#picture-search-form")
    searchPicture.addEventListener("submit", (e) => searchPictureHandler(e))

    const createPuzzle = document.querySelector("#create-puzzle-form")
    createPuzzle.addEventListener("submit", (e) => createPuzzleHandler(e))

})

// carl added to disable button on click
// document.getElementById("submit-button").addEventListener("click", function(){ 
//     // Preventing button from clicking
//     document.getElementById("submit-button").disabled = true;
// });

function getPictures(){
    // 5 max pics to display at top in horizontal line
    fetch(pictureEndPoint)
    .then(response => response.json())
    .then(pictures => {
        pictures.data.forEach(picture => {
          const pictureMarkup = `
            <div data-id=${picture.id}>
              <img src=${picture.attributes.picture_url} height="100" width="150">
              <button data-id=${picture.id}>ButtonToID</button>
            </div>
            <br><br>`;
  
            document.querySelector('#picture-container').innerHTML += pictureMarkup
        })
    })
}

function hideCreatePuzzleAttributes()  {  
    document.getElementById("create-puzzle-form").style.visibility="hidden";
    document.getElementById("select-instructions").style.visibility="hidden";    
}

function searchPictureHandler(e) {
    e.preventDefault()
    document.querySelector('#select-pics').innerHTML = ""
    hideCreatePuzzleAttributes()

    const keywordInput = document.querySelector("#search-keyword").value
    const search = `http://localhost:3000/api/v1/pictures/search/${keywordInput}`
    fetch(search)
    .then(response => response.json())
    .then(photos => {
        for(let i = 0; i < photos.length; i++) {
            const img = document.createElement("img");
            img.src = `${photos[i].src.small}`

            img.setAttribute("class", "img-margin");

            img.addEventListener("click", function() {
                let clicked = document.getElementsByClassName('img-rounded-border')
                for(let i = 0; i < clicked.length; i++) {
                    clicked[i].classList.remove("img-rounded-border");
                }
                img.classList.add("img-rounded-border");
                document.getElementById("create-puzzle-form").style.visibility="visible";
                
            })
            document.querySelector('#select-pics').appendChild(img);
            document.getElementById("select-instructions").style.visibility="visible";    
        }
    })
}

function createPuzzleHandler(e){
    e.preventDefault()
    const selectedPictureUrl = document.querySelector(".img-rounded-border").src
    const categoryName = document.querySelector("#assign-category").value
    
    categoryPostFetch(selectedPictureUrl, categoryName)
}

function categoryPostFetch(picture_url, name){
    fetch(categoryEndPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name})
    })
    .then(response => response.json())
    .then(category => {
        categoryId = category.id
    
        createPicturePostFetch(picture_url, categoryId)
    })
}

function createPicturePostFetch(picture_url, category_id){
    console.log("inside picture post fetch")
    fetch(pictureEndPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({picture_url, category_id})
    })
    .then(response => response.json())
    .then(picture => {
        console.log(picture)
    
        // createPuzzlePostFetch(pictureId, difficultyLevel)
    })
}

function createPuzzlePostFetch(picture_id, difficulty_level){
    fetch(puzzleEndPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({picture_id, difficulty_level})
    })
    .then(response => response.json())
    .then(puzzle => {
        console.log(puzzle);
    })
}
