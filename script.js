let searchInput = document.body.querySelector("#searchInput")
let search_img_btn = document.body.querySelector(".search-img")
let gallery = document.body.querySelector(".gallery")
let card = document.body.querySelectorAll(".card")

let api_image_box = document.body.querySelectorAll(".image-box")
// console.log(api_image_box)

let title = document.body.querySelectorAll("h2")
// console.log(title)

let pre_btn = document.body.querySelector(".pre-btn")

let more_btn = document.body.querySelector(".more-btn")

let sugestion = document.body.querySelector("#welcomeBox")


let big_screen = document.body.querySelector(".click-img")
console.log(big_screen)

let cancel = document.body.querySelector(".cancel")
let download = document.body.querySelector(".download")


let page = 1;
async function ImageApi() {
    try {
        if (searchInput.value.trim() === "") {
            // alert("please Type Something...")
            gallery.style.display = "none"
            sugestion.style.display = "flex"
            return
        }


        let api = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${searchInput.value}&content_filter =high&client_id=LIstAwi9gv25EAOkPkC4Js_3QXwn4CkZp_NhytRo-4s&per_page=12`)


        if (api.status !== 200) {
            throw new Error("Something went wrong");
        }

        let data = await api.json()
        console.log(data.results)

        sugestion.style.display = "none"

        gallery.style.display = "flex"


        api_image_box.forEach((element, index) => {
            element.innerHTML = ""
            let img = document.createElement("img");
            img.classList = "api-img"
            img.src = data.results[index].urls.small;
            element.append(img);

            title[index].innerHTML = data.results[index].alt_description;

            img.addEventListener("click", () => {
                big_screen.style.display = "flex"
                big_screen.querySelector("img").src = data.results[index].urls.full
            })
        });

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


pre_btn.addEventListener("click", () => {
    if (page <= 1) {
        return
    } else {
        page--
        ImageApi()
    }
})

more_btn.addEventListener("click", () => {
    if (page >= 30) {
        return
    }
    else {
        page++
        ImageApi()
    }
})

cancel.addEventListener("click", () => {
    big_screen.style.display = "none"
})


download.addEventListener("click", async (e) => {
    e.preventDefault()

    const img_url = big_screen.querySelector("img").src;
    const response = await fetch(img_url);
    const data = await response.blob();

    const temp_url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = temp_url;
    link.download = "my-image.png";
    link.click();

    setTimeout(() => URL.revokeObjectURL(temp_url), 1000);
});