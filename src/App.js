import Loader from './components/Loader'

import { fetchUsers } from './api/fetchUsers'

export class App {
    constructor() {
        this.container = null
        this.users = null
        this.loading = true

        this.init()
    }

    init() {
        this.loadUsers()
    }

    setUsers(newUsers) {
        this.users = newUsers
        this.render()
    }

    setLoading(newLoading) {
        this.loading = newLoading
        this.render()
    }

    scheduleLoadUsers() {
        setTimeout(
            () => this.loadUsers(),
            2000
        )
    }

    async loadUsers() {
        this.setLoading(true)
        let users = null
        try {
            users = await fetchUsers()
            this.setUsers(users)
        } catch (error) {
            console.error('Error loading users', error)
        } finally {
            this.setLoading(false)
            this.scheduleLoadUsers()
        }
        return users
    }

    render() {
        if (this.container === null) {
            this.container = document.createElement('div')
            this.container.style.position = 'relative'
        }

        this.container.innerHTML = ''

        if (this.loading) {
            const loaderElement = new Loader()
            this.container.appendChild(loaderElement.render())
        }

        const text = JSON.stringify(this.users)
        const textNode = document.createTextNode(text)

        this.container.appendChild(textNode)

        return this.container
    }
}

export default App