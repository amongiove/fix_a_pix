const endPoint = "http://localhost:3000/api/v1/pictures"

document.addEventListener('DOMContentLoaded', () => {

    // getPictures()
     hideCreatePuzzle()  

    const searchPicture = document.querySelector("#picture-search-form")
    searchPicture.addEventListener("submit", (e) => searchPictureHandler(e))

    const createPuzzle = document.querySelector("#create-puzzle-form")
    createPuzzle.addEventListener("submit", (e) => createPuzzleHandler(e))

})


// function getPictures(){
    // might want to do this for 5 max pics to display at top
//     fetch(endPoint)
//     .then(response => response.json())
//     .then(pictures => {
//         pictures.data.forEach(picture => {
//           const pictureMarkup = `
//             <div data-id=${picture.id}>
//               <img src=${picture.attributes.picture_url} height="100" width="150">
//               <h3>${picture.attributes.title}</h3>
//               ${picture.attributes.puzzles.length} puzzles</p>
//               <button data-id=${picture.id}>ButtonToID</button>
//             </div>
//             <br><br>`;
  
//             document.querySelector('#picture-container').innerHTML += pictureMarkup
//         })
//     })
// }

function hideCreatePuzzle()  {  
    document.getElementById("create-puzzle-form").style.visibility="hidden";
    document.getElementById("select-instructions").style.visibility="hidden";    
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
                document.getElementById("create-puzzle-form").style.visibility="visible"; 

                //reset field before next search 
                
            })
            document.querySelector('#select-pics').appendChild(img);

           

            document.getElementById("select-instructions").style.visibility="visible"; 
            
        }
    })
}

function createPuzzleHandler(e){
    e.preventDefault()
    let selectedImage = document.querySelector(".img-rounded-border")
    console.log(selectedImage)
    console.log(e.target)
    console.log("create puzzle handler")
    // const selectedImage = document.querySelector(".img-rounded-border")
}

