import axios from '~/plugins/axios'
const api = `/api`;
// const api = ``;

/**
 * 获取首页猜您喜欢列表
 */
export const gainLike = (params) => get(`${api}/mobile/guessYouLike.json`,params);

/**
 * 详情页车辆信息
 */
export  const carDetail = params => get(`${api}/mobile/carDetail.json`,params);

/**
 *价格趋势图表
 */
export const getcardata = params => get(`${api}/mobile/getcardata.json`,params);

export  const carContrast = params => get(`${api}/mobile/carContrast.json?carids`,params);

/**
 * 获取验证码
 */
export const outcodephones = mobile => get(`${api}/code/outcodephones.json`,mobile);

/**
 * 验证码登录
 */
export const smallprogramlogin = mobile => get(`${api}/mobile/smallprogramlogin.json`,mobile);

/**
 *首页数据展示
 */
export const  indexoeo = () => get(`${api}/mobile/indexoeo.json`);

/**
 * 列表数据
 */
export const filteData = params => get(`${api}/mobile/filteData.json`,params);

/**
 *获取定位城市
 */
export const historyKeyAndHotKey = params => get(`${api}/car/historyKeyAndHotKey.json`,params);

/**
 *一级地区获取
 */
export const getprovinces = params => get(`${api}/tools/getprovinces.json`,params);

/**
 *二级地区获取
 */
export const getAreaByCityCode = params => get(`${api}/tools/getAreaByCityCode.json`,params);

/**
 *三级地区获取
 */
export const getAreaLevel3 = params => get(`${api}/mobile/getAreaLevel3.json`,params);

/**
 *热门搜索列表
 */
export const  gethotcar = () => get(`${api}/search/gethotcar.json`);

/**
 *搜索猜您喜欢列表
 */
export const  guessWhatYouLike = () => get(`${api}/mobile/guessWhatYouLike.json`);

/**
 *搜索
 */
export const  searchsuggest = params => get(`${api}/mobile/searchsuggest.json`,params);

/**
 *pingpai 1
 */
export const  getonelevelbrand = params => get(`${api}/tools/getonelevelbrand.json`,params);
/**
 *pingpai 2
 */
export const  getCarSerialByParentIdJson = params => get(`${api}/mobile/appMatchRequire/getCarSerialByParentIdJson.json`,params);

/**
 *pingpai 3
 */
export const  getCarTypeByParentIdJson = params => get(`${api}/car/getCarTypeByParentIdJson.json`,params);

/**
 *pingpai 4
 */
export const  getCarTypeByParentIdKuanxin = params => get(`${api}/car/getCarTypeByParentIdKuanxin.json`,params);


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


