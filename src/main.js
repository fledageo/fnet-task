import { List } from "./components/List.js"
import { getUsers } from "./utils/api.js"

(function () {
    let isTablet = window.matchMedia('(max-width:768px)')
    const sidebar = document.getElementById("sidebar")
    let burgerBtn = null
    let closeBtn = null
    const handleTablet = (e) => {
        if (e.matches) {
            if (!document.getElementById("burger")) {
                burgerBtn = document.createElement('button')
                burgerBtn.id = "burger"
                burgerBtn.classList.add("header_burger")
                burgerBtn.innerHTML = `
                <i class="fa-solid fa-bars"></i>
            `
                burgerBtn.addEventListener("click", () => {
                    sidebar.classList.toggle("open")
                })
                document.getElementsByClassName("header_container")[0].prepend(burgerBtn)
            }

            if (!document.getElementById("close")) {
                closeBtn = document.createElement('button')
                closeBtn.id = "close"
                closeBtn.classList.add("sidebar_closeBtn")
                closeBtn.innerHTML = `
                    <i class="fa-solid fa-xmark"></i>
                `
                closeBtn.addEventListener('click', () => {
                    sidebar.classList.remove("open")
                })
                sidebar.prepend(closeBtn)
            }
        } else {
            if (burgerBtn) {
                burgerBtn.remove()
            }
            if (closeBtn) {
                closeBtn.remove()
            }
            sidebar.classList.remove("open")
        }
    }
    isTablet.addEventListener("change", handleTablet)
    handleTablet(isTablet)
})()

//----------List---------------

async function createList() {
    let data = await getUsers()
    let container = document.querySelector(".content_container")
    let userList = new List(data,container)
    userList.render()
}
createList()