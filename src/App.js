import { fetchUsers } from './api/fetchUsers'

export class App {
    constructor() {
        this.container = null
        this.users = null

        this.init()
    }

    init() {
        this.loadUsers()
    }

    setUsers(newUsers) {
        this.users = newUsers
        this.render()
    }

    scheduleLoadUsers() {
        setTimeout(
            () => this.loadUsers(),
            2000
        )
    }

    async loadUsers() {
        let users = null
        try {
            users = await fetchUsers()
            this.setUsers(users)
        } catch (error) {
            console.error('Error loading users', error)
        } finally {
            this.scheduleLoadUsers()
        }
        return users
    }

    render() {
        if (this.container === null) {
            this.container = document.createElement('div')
        }

        this.container.innerHTML = JSON.stringify(this.users)

        return this.container
    }
}

export default App