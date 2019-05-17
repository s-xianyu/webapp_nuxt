import {
  GET_USER,
  CITY_SAVE,
} from './mutations-type';
import {getStore} from "../config/util/util";
import {smallprogramlogin} from '~/config/getData'
export default {
  async getUserInfo({commit}){
    let name = JSON.parse(
      getStore('userInfo')
    );
    commit(GET_USER,name);
  },
  async getCity({commit}){

    let name = JSON.parse(
      getStore('cityInfo')
    )
    commit(CITY_SAVE,name);
  }
}
