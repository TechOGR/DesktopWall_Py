const titleMusic = document.getElementById("titleMusic")
const btnPlayPause = document.getElementById("btn_playPause")
const btn_next = document.getElementById("btn_next")
const btn_back = document.getElementById("btn_back")

const listBtn = [btnPlayPause, btn_next, btn_back]

async function queryPlayer(value) {
    await fetch("/player", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cambio: value })
    }).catch(error => error)
}

listBtn.forEach(btn => {
    btn.addEventListener('click', async () => {
        if (btn === btnPlayPause) {
            await queryPlayer("PlayPause")
        } else if (btn === btn_next) {
            await queryPlayer("Next")
        } else if (btn === btn_back) {
            await queryPlayer("Prev")
        }
    })
})

async function getInfoTrack() {
    const response = await fetch("/getTrackInfo", {
        method: "GET"
    })
    const responseJSON = await response.json()

    const name = responseJSON.name
    const duration = responseJSON.duration

    titleMusic.innerText = name

}
getInfoTrack()

setInterval(async () => {
    await getInfoTrack()
}, 1000)