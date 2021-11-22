let loaded = false
const MAX_TRIES = 15;
let tries = 0;
let colour;
const colours = {
    green: "#55ff55",
    yellow: "#ffff55",
    red: "#ff5555"
}

function createElement() {
    let views
    let likes
    try {
        views = parseInt(document.querySelector("ytd-video-view-count-renderer").children[0].innerText.split(" ")[0].split(",").join(""))
        likes = document.querySelector("#menu-container").querySelector("ytd-menu-renderer").querySelector("#top-level-buttons-computed").children[0].querySelector("#text").innerText
    } catch (err) {
        console.error(err)
    }
    loaded = true
    const alphas = {
        k: 1000,
        m: 1000000,
        b: 1000000000
    }
    
    likes = likes.split(",").join("").split("")

    if (Object.keys(alphas).includes(likes[likes.length-1].toLowerCase())) {
        const value = likes.pop().toLowerCase();
        likes = parseInt(likes.join("")) * alphas[value]
    } else {
        likes = parseInt(likes.join(""))
    }
    
    let percent = likes / views * 100
    percent = Math.round(percent * 100) / 100
    if (percent >= 2.5) {
        colour = colours.green
    } else if (percent >= 1) {
        colour = colours.yellow
    } else {
        colour = colours.red
    }
    percent = `${percent}%`
    
    // console.log(`likes: ${likes}`)
    // console.log(`views: ${views}`)
    // console.log(`percent: ${percent}`)

    let element = document.querySelector("ytd-video-view-count-renderer").children[0];
    
    let ratio = element.cloneNode()
    ratio.id = "extension-ratio"
    ratio.innerHTML = ` | <span style='color:${colour}'>${percent}</span>`
    return ratio;
}

const interval = setInterval(() => {
    if (!document.querySelector("ytd-video-view-count-renderer")) return
    const ratio = createElement();
    const element = document.querySelector("#extension-ratio")
    if (element){
        document.querySelector("ytd-video-view-count-renderer").replaceChild(ratio,element)
        // console.log("updated")
    } else {
        document.querySelector("ytd-video-view-count-renderer").appendChild(ratio)
        // console.log("added")
    }
}, 1000)