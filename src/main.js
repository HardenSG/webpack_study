import { storeManage } from "../lib"
import { execute } from './second.js'

const store = storeManage()
execute()

console.log(store.getV('name'));

try {
    store.storeToLocal()
} catch (error) {
    // console.log(error);
}
