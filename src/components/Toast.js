export default class Toast{

    constructor(message = "Successfully"){
        this.message = message
        this.toast = document.createElement("div")
        this.toast.classList.add("toast")
        document.querySelector("body").append(this.toast)
    }
    show(){
        this.toast.innerHTML = `
            <p>${this.message}</p>
        `
        this.toast.classList.add("show")
        setTimeout(this.hide.bind(this),5000)
    }
    hide(){
        this.toast.remove()
    }
}