import {GET_USER} from './mutations-type';
import {getStore} from "../config/util/util";
export default {
  async getUserInfo({commit}){
    let name = getStore('username');
    commit(GET_USER,name);
  }
}
