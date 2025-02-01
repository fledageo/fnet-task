import Card from "./Card.js"

export class List {
    constructor(users, location) {
        this.users = users
        this.location = location
    }

    setUsers(users) {
        this.users = users
        this.render()
    }
    render(appendTo = this.location) {
        let list = document.getElementById("list")
        if (!list) {
            list = document.createElement("div")
            list.classList.add("content_list")
            list.id = "list"
        } else {
            list.innerHTML = ""
        }

        let fragment = document.createDocumentFragment()
        this.users.forEach((item,i) => {
            item.id = Date.now() * i
            let card = new Card(item, fragment,this.updateUser.bind(this),this.deleteUser.bind(this))
            card.createCard()
        })
        list.append(fragment)

        appendTo.append(list)

        return appendTo
    }

    updateUser(updatedUser){
        const updatedUsers = this.users.map(user => {
            if(user.id === updatedUser.id){
                return updatedUser
            }else{
                return user
            }
        })

        this.setUsers(updatedUsers) 
    }
    deleteUser(userId){
        let updatedUsers = this.users.filter(user => user.id !== userId)
        this.setUsers(updatedUsers)
    }
}