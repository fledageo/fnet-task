import Modal from "./Modal.js"

export default class Card {
    user = null
    constructor(user, location, updateUser, deleteUser) {
        this.user = user
        this.location = location
        this.updateUser = updateUser
        this.deleteUser = deleteUser
    }

    setUser(data) {
        this.user = {
            ...this.user,
            name: data.name,
            surname: data.surname,
            email: data.email,
            phoneNumber: data.phoneNumber
        }
    }

    createCard(appendTo = this.location) {
        const card = document.createElement("div")
        card.id = this.user.id
        card.classList.add("card")

        const menuBtn = document.createElement("div")
        menuBtn.classList.add("card_menu_btn")
        menuBtn.innerHTML = `<i class="fa-solid fa-ellipsis-vertical"></i>`
        menuBtn.addEventListener("click", () => {
            this.toggleMenu(card, menuBtn)
        })

        const avatar = document.createElement("div")
        avatar.classList.add("card_avatar")
        avatar.innerHTML = `<i class="fa-solid fa-user"></i>`

        const fullName = document.createElement("p")
        fullName.classList.add("card_name")
        fullName.innerHTML = `${this.user.name} ${this.user.surname}`

        const details = document.createElement("button")
        details.classList.add("card_details")
        details.innerHTML = `Details`;
        details.onclick = this.details.bind(this)

        card.append(menuBtn, avatar, fullName, details)
        appendTo.append(card)
        return appendTo
    }

    toggleMenu(card, btn) {
        const openBtn = document.querySelector(".card_menu_btn.open")
        const otherOpenMenu = document.querySelector(".menu.open")
        if (otherOpenMenu) {
            otherOpenMenu.classList.remove("open")
            openBtn.classList.remove("open")
        }

        let menu = card.children.namedItem("menu")

        let menuBtnPos = btn.getBoundingClientRect()
        let cardPos = card.getBoundingClientRect()

        let x = menuBtnPos.left - cardPos.left
        let y = (menuBtnPos.top - cardPos.top) + btn.clientHeight

        if (!menu) {
            let deleteBtn = document.createElement("a")
            deleteBtn.innerHTML = `
                <i class="fa-solid fa-trash"></i>
                <span>Delete</span>
            `
            deleteBtn.classList.add("menu_item")

            let editBtn = document.createElement("a")
            editBtn.innerHTML = `
                <i class="fa-regular fa-pen-to-square"></i>
                <span>Edit</span>
            `
            editBtn.classList.add("menu_item")

            deleteBtn.onclick = () => {
                let modal = new Modal()
                modal.isSure('delete',{user:this.user,action:this.deleteUser})
            }
            editBtn.onclick = () => {
                let modal = new Modal()
                modal.modalEdit(this.user,this.updateUser)
            }

            menu = document.createElement("div")
            menu.setAttribute("name", "menu")
            menu.classList.add("menu")
            menu.append(editBtn)
            menu.append(deleteBtn)
            card.append(menu)
        }

        menu.style.left = x + "px"
        menu.style.top = y + "px"
        menu.classList.add("open")
        btn.classList.add("open")
        document.addEventListener("click", closeCurrent)


        function closeCurrent(e) {
            if (!menu.contains(e.target) && !btn.contains(e.target)) {
                menu.classList.remove("open")
                btn.classList.remove("open")
                document.removeEventListener("click", closeCurrent)
            }
        }
    }
    details() {
        let modal = new Modal()
        modal.modalDetails(this.user)
    }
}

