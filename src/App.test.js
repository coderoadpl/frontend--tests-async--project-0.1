import App from './App'

const MOCK_USER = {
    avatar: 'https://randomuser.me/api/portraits/thumb/men/36.jpg',
    name: 'Mateusz Choma'
}

const MOCK_USERS = (new Array(10)).fill(MOCK_USER)

const loadUsersMocked = async function loadUsers() {
    this.setLoading(true)
    let users = null
    try {
        users = await Promise.resolve(MOCK_USERS)
        this.setUsers(users)
    } catch (error) {
        console.error('Error loading users', error)
    } finally {
        this.setLoading(false)
        this.scheduleLoadUsers()
    }
    return users
}

const createMockedApp = () => {
    const app = new App()
    app.loadUsers = jest.fn(loadUsersMocked)
    return app
}

describe('initial state', () => {

    it('before init', () => {
        const app1 = createMockedApp()

        expect(app1.container).toBe(null)
        expect(app1.users).toBe(null)
        expect(app1.loading).toBe(true)
    })

    it('after init', () => {
        const app1 = createMockedApp()
        app1.init()

        expect(app1.container instanceof HTMLDivElement).toBe(true)
        expect(app1.users).toBe(null)
        expect(app1.loading).toBe(true)
    })

})

describe('state after first load', () => {

    it('should have users loaded - queueMicrotask', (done) => {
        expect.assertions(1)

        const app1 = createMockedApp()
        app1.init()

        queueMicrotask(() => {
            expect(app1.users).toStrictEqual(MOCK_USERS)
            done()
        })
    })

    it('should have users loaded - jest mock function results', async () => {
        expect.assertions(2)

        const app1 = createMockedApp()
        app1.init()

        const users = await app1.loadUsers.mock.results[0].value

        expect(users).toStrictEqual(MOCK_USERS)
        expect(app1.users).toStrictEqual(MOCK_USERS)
    })

})
