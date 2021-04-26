import App from './App'

describe('initial state', () => {

    it('before init', () => {
        const app1 = new App()

        expect(app1.container).toBe(null)
        expect(app1.users).toBe(null)
        expect(app1.loading).toBe(true)
    })

    it('after init', () => {
        const app1 = new App()
        app1.init()

        expect(app1.container instanceof HTMLDivElement).toBe(true)
        expect(app1.users).toBe(null)
        expect(app1.loading).toBe(true)
    })

})