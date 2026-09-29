let searchInput = document.body.querySelector("#searchInput")
let search_img_btn = document.body.querySelector(".search-img")

let more_btn = document.body.querySelector(".more-btn")

let hearts = document.body.querySelectorAll(".heart")




async function ImageApi() {
    try {

        let api = await fetch("https://api.unsplash.com/search/photos?page=1&query=office&client_id=LIstAwi9gv25EAOkPkC4Js_3QXwn4CkZp_NhytRo-4s")

        let data = await api.json()
        console.log(data)


    }
    catch (err) {
        console.log(err)
    }
}


searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        search_img_btn.click()
    }
})


search_img_btn.addEventListener("click", ImageApi)


more_btn.addEventListener("click", ImageApi)


hearts.forEach((heart) => {
    heart.addEventListener("click", (e) => {
        if (e.target.style.color === "red") {
            e.target.style.color = ""
            e.target.style.backgroundColor = ""
        } else {
            e.target.style.color = "red"
            e.target.style.backgroundColor = "pink"
        }
    })
})