import User from './components/User'
import Loader from './components/Loader'

import { fetchUsers } from './api/fetchUsers'

export class App {
    constructor() {
        this.container = null
        this.users = null
        this.loading = true
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
            this.container.style.maxWidth = '320px'
            this.container.style.margin = '0 auto'
        }

        this.container.innerHTML = ''

        if (this.loading) {
            const loaderElement = new Loader()
            this.container.appendChild(loaderElement.render())
        }

        if (this.users) {
            this.users.forEach((user) => {
                const userElement = new User(user)
                this.container.appendChild(userElement.render())
            })
        }

        return this.container
    }
}

export default App