const panel = document.querySelector(".mainPanel");
const btn_activeAIMP = document.getElementById("btn_activeAIMP");
const btn_activeRecycle = document.getElementById("btn_recycleBin")
const palyerAIMP = document.querySelector(".container_musicPlayer");
const showRecycleBin = document.querySelector(".recycleBin")
const showPanel = document.querySelector(".showPanel");

showPanel.addEventListener('click', () => {
    if (panel.classList[1] === undefined) {
        panel.style.cssText = `
            display: flex;
        `
        setTimeout(() => {
            panel.classList.toggle('active')
        }, 200)
    } else {
        panel.classList.toggle('active')
        setTimeout(() => {
            panel.style.cssText = `
                display: none;
            `
        }, 500)
    }
})

let checking = false

if (checking === false) {
    btn_activeAIMP.innerText = '🌕'
    btn_activeRecycle.innerText = '🌕'
    palyerAIMP.style.cssText = `
        opacity: 1;
    `
    showRecycleBin.style.cssText = `
        opacity: 1;
    `
    checking = true
} else {
    btn_activeAIMP.innerText = '🌑'
    btn_activeRecycle.innerText = '🌑'
    palyerAIMP.style.cssText = `
        opacity: 0;
    `
    showRecycleBin.style.cssText = `
        opacity: 0;
    `
    checking = false
}
btn_activeAIMP.addEventListener('click', () => {
    if (checking === false) {
        btn_activeAIMP.innerText = '🌕'
        palyerAIMP.style.cssText = `
            opacity: 1;
        `
        setTimeout(() => {
            palyerAIMP.style.cssText = `
                display: flex;
            `
        }, 200)
        checking = true
    } else {
        btn_activeAIMP.innerText = '🌑'
        palyerAIMP.style.cssText = `
            opacity: 0;
        `
        setTimeout(() => {
            palyerAIMP.style.cssText = `
                display: none;
            `
        }, 200)
        checking = false
    }
})

btn_activeRecycle.addEventListener('click', () => {
    if (checking === false) {
        btn_activeRecycle.innerText = '🌕'
        showRecycleBin.style.cssText = `
            opacity: 1;
        `
        setTimeout(() => {
            showRecycleBin.style.cssText = `
                display: flex;
            `
        }, 200)
        checking = true
    } else {
        btn_activeRecycle.innerText = '🌑'
        showRecycleBin.style.cssText = `
            opacity: 0;
        `
        setTimeout(() => {
            showRecycleBin.style.cssText = `
                display: none;
            `
        }, 200)
        checking = false
    }
})