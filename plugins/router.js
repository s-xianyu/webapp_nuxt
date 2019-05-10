import { getStore, setStore } from '@/config/util/util'
import axios from 'axios'
//
// export default ({ app }) => {
//   app.router.afterEach((to, from,next) => {
//     let arr = [
//       '/home',
//       '/carList'
//     ];
//     debugger
//     if(arr.includes(to.path)){
//       let isLogin = getStore('username');
//       if(isLogin){
//         // next();
//       }else{
//         // next({
//         //     path:'/login'
//         // })
//       }
//     }else{
//       // next();
//     }
//   })
// }
