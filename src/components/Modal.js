export default class Modal {
    layer = null
    modal = null

    openModal(content = "") {
        let body = document.querySelector("body")
        let modal = document.createElement("div")
        let layer = document.createElement("div")

        this.modal = modal
        this.layer = layer

        this.layer.classList.add("layer")
        this.modal.classList.add("modal")
        this.layer.addEventListener("click", (e) => {
            if (e.target === this.layer) {
                this.closeModal()
            }
        })

        this.modal.append(content)
        this.layer.append(this.modal)
        body.append(this.layer)
    }

    
    modalDetails(user) {
        let details = document.createElement("div")
        details.classList.add("details")
        details.innerHTML = `
            <div class="details_item">
                <h4>Role</h4>
                <p>${user.role}</p>
            </div>
            <div class="details_item">
                <h4>Occupation</h4>
                <p>${user.occupation}</p>
            </div>
            <div class="details_item">
                <h4>Email address</h4>
                <p>${user.email}</p>
            </div>
            <div class="details_item">
                <h4>Phone number</h4>
                <p>${user.phoneNumber}</p>
            </div>
        `
        this.openModal(details)
    }
    
    modalEdit(user, updateUser) {
        let editBlock = document.createElement("div")
        editBlock.classList.add("edit")

        let form = document.createElement("form")
        form.classList.add("edit_form")
        form.innerHTML = `
            <h3 class="modal_title">Edit User</h3>
            <div class="form_fullname">
                <div class="form_field">
                <label for="name">Name</label>
                <input id="name" name="name" value="${user.name}">
            </div>
            <div class="form_field">
                <label for="surname">Surname</label>
                <input id="surname" name="surname" value="${user.surname}">
            </div>
            </div>
            <div class="form_field">
                <label for="email">Email</label>
                <input id="email" name="email" value="${user.email}">
            </div>
            <div class="form_field">
                <label for="phoneNumber">Phone Number</label>
                <input id="phoneNumber" name="phoneNumber" value="${user.phoneNumber}">
            </div>
        `

        let actions = document.createElement("div")
        actions.classList.add("modal_actions")

        let cancelBtn = document.createElement("button")
        cancelBtn.innerHTML = "Cancel"
        cancelBtn.classList.add("cancelBtn", "actions_btn")
        cancelBtn.onclick = this.closeModal.bind(this)

        let saveBtn = document.createElement("button")
        saveBtn.innerHTML = "Save"
        saveBtn.classList.add("applyBtn", "actions_btn")
        saveBtn.onclick = () => {
            let data = new FormData(form)
            let updated = {
                ...user,
                name: data.get("name"),
                surname: data.get("surname"),
                email: data.get("email"),
                phoneNumber: data.get("phoneNumber"),
            }
            this.closeModal()
            this.isSure("edit",{user:updated,action:updateUser})
        }

        actions.append(cancelBtn, saveBtn)
        editBlock.append(form, actions)

        this.openModal(editBlock)
    }

    isSure(type,payload){
        let {user,action} = payload

        let block = document.createElement("div")
        block.classList.add("modal_block")

        let title = document.createElement("h3")
        title.classList.add("modal_title")

        let text = document.createElement("p")
        text.classList.add("modal_text")

        let actions = document.createElement("div")
        actions.classList.add("modal_actions")

        let cancelBtn = document.createElement("button")
        cancelBtn.innerHTML = "Cancel"
        cancelBtn.classList.add("cancelBtn", "actions_btn")
        cancelBtn.onclick = this.closeModal.bind(this)

        let applyBtn = document.createElement("button")
        applyBtn.classList.add("applyBtn", "actions_btn")

        if(type === "delete"){
            applyBtn.innerHTML = "Delete"
            title.innerHTML = `Delete User`
            text.innerHTML = `Are you sure you want to delete ${user.name} ${user.surname}? `
            applyBtn.onclick = () => {
                action(user.id)
                this.closeModal()
            }
        }else{
            applyBtn.innerHTML = "Save"
            title.innerHTML = `Edit User`
            text.innerHTML = `Are you sure you want to save changes?`
            applyBtn.onclick = () => {
                action(user)
                this.closeModal()
            }
        }

        actions.append(cancelBtn,applyBtn)
        block.append(title,text,actions)
        this.openModal(block)
    }

    closeModal() {
        this.layer.remove()
    }
}