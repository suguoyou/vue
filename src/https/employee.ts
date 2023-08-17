import request from "./request.ts"

/** 获取部门 */
export function GetDepartListApi() {
    return request<any>({
        url: "api/Data/GetDepartList",
        method: "post"
    })
}

/** 员工列表 */
export function GetEmployeesApi(data) {
    return request<any>({
        url: "api/Data/GetEmployees",
        method: "post",
        data
    })
}

/** 新增员工 */
export function CreateEmployeeApi(data) {
    return request<any>({
        url: "api/Data/CreateEmployee",
        method: "post",
        data
    })
}

/** 修改员工 */
export function UpdateEmployeeApi(data) {
    return request<any>({
        url: "api/Data/UpdateEmployee",
        method: "post",
        data
    })
}

/** 删除员工 */
export function DeleteEmployeeApi(data) {
    return request<any>({
        url: "api/Data/DeleteEmployee",
        method: "post",
        data
    })
}



/** 员工详情 */
export function GetEmployeeDetailApi(data) {
    return request<any>({
        url: "api/Data/GetEmployeeDetail",
        method: "post",
        data
    })
}