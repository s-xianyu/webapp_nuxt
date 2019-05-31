import {
  USER_SAVE,
  GET_CITY,
  GET_HISTORYCITY,
  HISTORYSEARCH_SAVE,
  FINDCARVAL_SAVE
} from './mutations-type';
import {getStore} from "../config/util/util";
export default {

  //获取用户信息
  async getUserInfo({commit}){
    let name = JSON.parse(
      getStore('userInfo')
    );
    commit(USER_SAVE,name);
  },

  //获取当前城市信息
  async getCity({commit}){

    let name = JSON.parse(
      getStore('cityInfo')
    );
    commit(GET_CITY,name);
  },

  //获取地区历史记录
  async getHistoryCity({commit}){
    let name = JSON.parse(
      getStore('historyCity')
    );
    commit(GET_HISTORYCITY,name);
  },
  async getHistorySearch({commit}){
    let name = JSON.parse(
      getStore('historySearch')
    );
    commit(HISTORYSEARCH_SAVE,name)
  },
}
