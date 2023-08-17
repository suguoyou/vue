import axios from 'axios'
import { useUserStoreHook } from '@/store/modules/user'
import { ElMessage, ElMessageBox } from "element-plus"

// create an axios instance
const service = axios.create({
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  timeout: 20000, // request timeout
})

service.interceptors.request.use(
  (config) => {
    const token = useUserStoreHook().token
    config.baseURL = 'http://www.uerpn.cn/testapi'

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { status, statusText, data } = response;
    if (status == 200) {
      return data;
    }
    ElMessage.error(statusText || '系统出错');
    return Promise.reject(new Error(statusText || 'Error'));
  },
  (error) => {
    const { statusText, status } = error.response;
    console.log('error', error.response, status)
    if (status == 401) {
      ElMessageBox.confirm('当前页面已失效，请重新登录', '提示',
        {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning',
        }
      )
        .then(() => {
          localStorage.clear();
          window.location.href = '/login';
        })
    } else {
      ElMessage.error(statusText || '系统出错');
    }
    return Promise.reject(error.message);
  }
)

export default service
