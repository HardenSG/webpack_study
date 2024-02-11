import { storeManage } from "../lib";
import '../lib/css/loader-test.css'

export const execute = () => storeManage().setV('name', 'SG')