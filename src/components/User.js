export class User {

    constructor(props) {
        const {
            avatar,
            name,
        } = props

        this.avatar = avatar
        this.name = name
    }

    render() {

        const containerEl = document.createElement('div')
        const avatarEl = document.createElement('div')
        const avatarImageEl = document.createElement('img')
        const textEl = document.createElement('div')

        containerEl.style.width = '100%'
        containerEl.style.display = 'flex'
        containerEl.style.justifyContent = 'space-between'
        containerEl.style.alignItems = 'center'
        containerEl.style.fontFamily = 'sans-serif'

        avatarEl.style.width = '40px'
        avatarEl.style.height = '40px'
        avatarEl.style.margin = '10px'
        avatarEl.style.borderRadius = '50%'
        avatarEl.style.overflow = 'hidden'

        avatarImageEl.style.width = '40px'
        avatarImageEl.style.height = '40px'

        textEl.style.fontSize = '14px'
        textEl.style.fontWeight = 500

        avatarImageEl.src = this.avatar
        textEl.innerText = this.name

        avatarEl.appendChild(avatarImageEl)
        containerEl.appendChild(avatarEl)
        containerEl.appendChild(textEl)

        return containerEl
    }

}

export default User
