class RecycleBin {

    constructor() {
        this.initComponents()
    }

    initComponents() {
        this.recycleBin = document.querySelector(".recycleBin");
        this.recycleBin.addEventListener('click', this.checkItBin);
        this.containerText = document.querySelectorAll(".recycleText");
        this.fileSize = document.getElementById("file-size");
        this.fileItems = document.getElementById("file-items");
        this.btnDeleteAll = document.getElementById("btnDeleteAll")
        this.btnDeleteAll.addEventListener('click', this.emptyRecycleBin)
    }

    async getInfoRecycleBin() {
        this.resRecycleInfo = await fetch("/binInfo", {
            method: "GET"
        })
        this.filterJSON = await this.resRecycleInfo.json()
        this.sizeBin = this.filterJSON.size;
        this.NumFiles = this.filterJSON.numFiles;
        this.status = this.filterJSON.status;

        this.fileItems.innerText = `${this.NumFiles}`

        const sizeToString = this.sizeBin.toString().substring(0, 1).concat(`.${this.sizeBin.toString().substring(1, 2)}`)

        if (this.status === 'Full') {
            this.containerText[0].style.cssText = `
                display: flex;
            `
            this.containerText[1].style.cssText = `
                display: None;
            `
        } else if (this.status === 'Empty') {
            this.containerText[1].style.cssText = `
            display: flex;
        `
            this.containerText[0].style.cssText = `
            display: None;
        `
        }
        if (this.sizeBin.toString().length >= 4) {
            this.fileSize.innerHTML = ` ${sizeToString} Gb`
        } else if (this.sizeBin.toString().length < 4) {
            this.fileSize.innerHTML = ` ${this.filterJSON.size} Mb`
        }

    }
    async emptyRecycleBin() {
        const resEmptyTrash = await fetch("/empty", {
            method: "GET"
        })
        const resEmptyTrashJson = await resEmptyTrash.json()
        const response = resEmptyTrashJson.message

        // container_List.innerHTML = ""
        // mainCard.classList.toggle("active")

        console.log(response)
    }

    async checkItBin() {
        this.resCheckStatus = await fetch('/binInfo', {
            method: "GET"
        })
        this.resCheckStatusJSON = await this.resCheckStatus.json()
        this.statusCheck = this.resCheckStatusJSON.status



        const text_empty = document.getElementById("text_Empty");
        const mainCard = document.querySelector(".card_with_files");
        const container_List = document.querySelector(".container_List");

        if (this.statusCheck === 'Empty') {
            btnDeleteAll.style.cssText = `
                    display: none;
                `

            text_empty.style.cssText = `
                    display: flex;
                `

            container_List.innerHTML = ""
            mainCard.classList.toggle("active")
        } else {
            const text_empty = document.getElementById("text_Empty");
            text_empty.style.cssText = `
                display: none;
            `
            btnDeleteAll.style.cssText = `
                display: flex;
            `
            console.log("mostrando archivos")

            const cardMainFiles = document.querySelector(".card_with_files")
            const contentListFiles = document.querySelector(".container_List")
            contentListFiles.innerHTML = "";
            cardMainFiles.classList.toggle("active")

            async function getPropertiesFiles() {
                const res = await fetch("/getInfoFiles", {
                    method: "GET"
                })

                const data = await res.json()
                for (let i = 0; i < data.names.length; i++) {

                    const contentInfoFile = document.createElement("div")
                    const contentFiles = document.createElement("div")
                    const content_name_path = document.createElement("div")
                    const h2_nameFile = document.createElement("h2")
                    const h4_pathFile = document.createElement("h4")
                    const contentbtn = document.createElement("div")
                    const btnDelete = document.createElement("button")
                    const btnRestore = document.createElement("button")


                    contentInfoFile.className = "content_Info_Files"
                    contentFiles.className = "content_Files"
                    content_name_path.className = "content_name_path"
                    h2_nameFile.className = "nameFile"
                    h2_nameFile.innerText = data.names[i]
                    h4_pathFile.className = "pathFile"
                    h4_pathFile.innerText = data.paths[i]
                    contentbtn.className = "content_btn"
                    btnDelete.className = "btnDelete"
                    btnDelete.innerText = "❌"
                    btnDelete.addEventListener('click', function () {
                        deleteFile(data.names[i], data.paths)
                    })
                    btnRestore.className = "btnRestore"
                    btnRestore.innerText = "⚙️"

                    contentbtn.appendChild(btnRestore)
                    contentbtn.appendChild(btnDelete)
                    content_name_path.appendChild(h2_nameFile)
                    content_name_path.appendChild(h4_pathFile)
                    contentFiles.appendChild(content_name_path)
                    contentFiles.appendChild(contentbtn)
                    contentInfoFile.appendChild(contentFiles)
                    contentListFiles.appendChild(contentInfoFile)

                }
            }
            await getPropertiesFiles()

            async function deleteFile(name, path) {
                const nameFile = name;
                const pathFile = path
                const response = await fetch('/delete', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            nameFile,
                            pathFile
                        }
                    )
                }).catch(error => console.log(error))

                console.log(response)
            }

        }
    }


}

const recycleBin = new RecycleBin()
setInterval(async () => {
    await recycleBin.getInfoRecycleBin()
}, 1000)