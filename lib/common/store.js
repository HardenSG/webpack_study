const GLOBAL_STORE = {};
let GLOBAL_SINGLE_INSTANCE = null

/**
 */
class Store {
    #store
    constructor(prototype = {}) {
        this.#store = prototype
    }
    getV(key) {
        return this.#store[key]
    }
    setV(key, value) {
        try {
            this.#store[key] = value
        } catch {
            return 'FAILED'
        } finally {
            return this
        }
    }
    storeToLocal() {
        if (!localStorage) {
            throw new ReferenceError('LS不存在')
        } else {
            for (const k in this.#store) {
                if (Object.hasOwnProperty.call(this.#store, k)) {
                    const v = object[k];
                    localStorage.setItem(k, v)
                }
            }
        }
    }
}

export const storeManage = () => {
    if (!GLOBAL_SINGLE_INSTANCE) {
        GLOBAL_SINGLE_INSTANCE = new Store(GLOBAL_STORE)
    }
    return GLOBAL_SINGLE_INSTANCE
}