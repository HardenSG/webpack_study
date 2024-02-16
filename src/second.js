import { storeManage } from "../lib";
import '../lib/css/loader-test.css'

export const execute = () => storeManage().setV('name', 'SG')

/**
 * Tree-Shaking effect 验证
 * @param {Function} cb 
 * @returns 
 */
/* #__NO_SIDE_EFFECTS__ */
export const treeShakingTest = cb => {
    return cb()
}