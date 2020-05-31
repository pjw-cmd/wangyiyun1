import request from '../utils/request_java.js'
/*
  登录和注册。
  用户的其他操作在 user.js 文件下
*/
export function login (params) {
  return request.post('/user/login', params)
}

// export function login_cellphone (params) {
//   return request.get('/login/cellphone', {
//     params
//   })
// }
// export function login_email (params) {
//   return request.get('/login/cellphone', {
//     params
//   })
// }
// export function login_refresh () {
//   return request.get('/login/refresh')
// }
// export function login_status () {
//   return request.get('/login/status')
// }
// export function logout () {
//   return request.get('/logout')
// }
