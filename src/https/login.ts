import request from "./request.ts"

/** 登录 */
export function LoginApi(data: any) {
  return request<any>({
    url: "api/Authentication/Login",
    method: "post",
    data
  })
}

/** 权限获取 */
export function GetMenuList() {
  return request<any>({
    url: "api/Data/GetMenuList",
    method: "post"
  })
}