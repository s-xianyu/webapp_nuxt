import {GET_USER} from './mutations-type';
import {getStore} from "../config/util/util";
export default {
  async getUserInfo({commit}){
    let name = JSON.parse(
      getStore('userInfo')
    );
    commit(GET_USER,name);
  }
}
