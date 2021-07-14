const pictureEndPoint = "http://localhost:3000/api/v1/pictures"

//const puzzleEndPoint = "http://localhost:3000/api/vi/puzzles"

document.addEventListener('DOMContentLoaded', () => {

    getPictures()

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
    console.log(selectedPictureUrl)
    const difficultyLevel = document.querySelector("#difficulty_level").value
    console.log(difficultyLevel)
    console.log("inside create puzzle handler")
    createPicturePostFetch(selectedPictureUrl, difficultyLevel)
}

function createPicturePostFetch(picture_url, difficultyLevel){
    console.log("inside create picture post fetch")
    const difficulty_level = difficultyLevel

    fetch(pictureEndPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({picture_url})
    })
    .then(response => response.json())
    .then(picture => {
        console.log("back from backend")
        console.log(picture);
        
        createPuzzlePostFetch(picture, difficulty_level)
    })
}

function createPuzzlePostFetch(picture, difficulty_level){
    console.log("inside create puzzle post fetch")
    //create puzzle 
}
