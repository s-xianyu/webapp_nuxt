import axios from '~/plugins/axios'
const api = `/api`;
// const api = ``;

/**
 * 获取猜您喜欢列表
 */
export const gainLike = (params) => get(`${api}/mobile/guessYouLike.json`,params);

/**
 * 详情页车辆信息
 */
export  const carDetail = id => get(`${api}/mobile/carDetail.json`,id);

/*
* 获取验证码
*/
export const outcodephones = mobile => get(`${api}/code/outcodephones.json`,mobile);

/*
* 验证码登录
*/
export const smallprogramlogin = mobile => get(`${api}/mobile/smallprogramlogin.json`,mobile);




/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
  return new Promise((resolve, reject) =>{
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res);
    }).catch(err =>{
      reject(err.data)
    })
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err =>{
        reject(err.data)
      })
  });
}


