import { storeManage } from "../lib"
import { execute, treeShakingTest } from './second.js'

const store = storeManage()
execute()

console.log(store.getV('name'));

try {
    store.storeToLocal()
} catch (error) {
    // console.log(error);
}

// ========== tree shaking ==========

/* #__PURE__ */ treeShakingTest(() => {
    console.log('tree-shaking 执行');
})
/* #__PURE__ */console.log('main');

// ==================================