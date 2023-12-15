const form = document.getElementById("form")
const clear = document.getElementById("clear")
const search = document.getElementById("search")
const imagebox = document.getElementById("img-box")
const container = document.getElementById("container")
const inputSearch = document.getElementById("inputsearch")


runEvents()

function runEvents() {
  form.addEventListener("submit", searchImg)
  clear.addEventListener("click",Clear)



}
function searchImg(e) {
imagebox.innerHTML="";
  const value = inputSearch.value.trim()
  fetch(`https://api.unsplash.com/search/photos?query=${value} `, {
    method: "GET",
    headers: {
      Authorization: "Client-ID GZII2nOOrutwmH6MoPAALCJEzrNrmGzF7UppljzjRgk"
    }
  })
    .then((response) => response.json())
    .then((data) => {
      
      Array.from(data.results).forEach((img)=>{
       ImageUI(img.urls.small)
      })
    });

  e.preventDefault()
}

function ImageUI(url){
  const div=document.createElement("div")
  div.className="card"

  const img=document.createElement("img")
  img.setAttribute("src",url)
  img.height="400"
  img.width="400"
  div.appendChild(img)
  imagebox.appendChild(div)
}

function Clear(){
  inputSearch.value="";
  imagebox.innerHTML="";
}