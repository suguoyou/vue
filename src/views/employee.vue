<template>
  <div class="home-wrap">
    <div class="warp-slider">
      <DeparList :list="departList" :activeIndex="defaultDepartCode" @selectDepart="selectDepart"></DeparList>
    </div>
    <div class="warp-main">
      <div class="form-box">
        <div class="form-line">
          <div class="line-left">
            <span>姓名</span>
            <el-input v-model="params.empName" placeholder="员工姓名" style="width: 200px; margin-left: 30px" />
          </div>
          <div class="line-right">
            <el-button type="primary" v-permission="'search'" @click="doSearch">搜索</el-button>
            <el-button v-permission="'search'" @click="doReset">重置</el-button>
          </div>
        </div>
        <div class="form-line">
          <div class="line-left">
            <el-button type="primary" v-permission="'create'" @click="doAdd">新增</el-button>
          </div>
          <div class="line-right">
            <el-icon v-permission="'search'" @click="doRefresh">
              <Refresh />
            </el-icon>
          </div>
        </div>
      </div>
      <div class="table-box">
        <el-table :data="tableData" stripe empty-text="暂无数据" height="100%" style="width: 100%">
          <el-table-column label="工号">
            <template #default="{ row }">
              <div style="display: flex; align-items: center">
                <div class="avatar"></div>
                <div class="employeeInfo">
                  <div class="name">{{ row.name }}</div>
                  <div class="id">ID: {{ row.code }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="gender" label="性别" width="120" />
          <el-table-column fixed="right" label="操作" width="200">
            <template #default="{ row }">
              <el-button link type="primary" size="small" v-permission="'view'" @click="doView(row)">查看</el-button>
              <el-button link type="primary" size="small" v-permission="'delete'" @click="doDelete(row)">删除</el-button>
              <el-button link type="primary" size="small" v-permission="'update'" @click="doEdit(row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-box">
        <el-pagination background layout="prev, pager, next" :current-page="params.pageNo" :total="totalCount"
          @current-change="doChangePage" />
      </div>
    </div>
    <el-drawer v-model="drawer" :title="employeeType == 'add' ? '新建' : '修改'">
      <AddEmployee :employee-info="employeeInfo" :type="employeeType" @submit="doSumbit" @cancel="doCloseDrawer" />
    </el-drawer>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"
import { GetDepartListApi, GetEmployeesApi, DeleteEmployeeApi, CreateEmployeeApi, UpdateEmployeeApi } from "@/https/employee";
import { arrToTree } from "@/utils/util";
import DeparList from "./components/departList.vue";
import { Refresh } from "@element-plus/icons-vue";
import AddEmployee from "./components/addEmployee.vue";
const departList = ref([]);
const defaultDepartCode = ref("");
const selectDepartCode = ref("");

const router = useRouter()

onMounted(() => {
  getdepartList();
});

const selectDepart = code => {
  selectDepartCode.value = code;
  params.value.pageNo = 1
  params.value.empName = ''
  getEmployees()
};

const getdepartList = async () => {
  try {
    const resp = await GetDepartListApi();
    const list: any = arrToTree({
      list: resp,
      code: "code",
      pcode: "pcode",
      children: "children"
    });
    departList.value = list;
    if (list.length > 0 && list[0].children.length > 0) {
      defaultDepartCode.value = list[0].children[0].code;
      selectDepartCode.value = list[0].children[0].code;
    }
    getEmployees()
  } catch (err) {
    ElMessage.error(err.message || "系统出错");
  }
};

const tableData = ref<any>([]);
const totalCount = ref(0)
const params = ref({
  pageNo: 1,
  pageSize: 10,
  departCode: '',
  empName: ''
})

const doSearch = () => {
  params.value.pageNo = 1
  getEmployees()
}

const doReset = () => {
  params.value.pageNo = 1
  params.value.empName = ''
  getEmployees()
}

const doRefresh = () => {
  getEmployees()
}

const doAdd = (row) => {
  employeeType.value = 'add'
  employeeInfo.value.name = ''
  employeeInfo.value.code = ''
  employeeInfo.value.gender = '男'
  drawer.value = true
}

const doDelete = (row) => {
  ElMessageBox.confirm(
    '确认是否删除该名员工',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      try {
        await DeleteEmployeeApi({ empCode: row.code });
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      } catch (err) {
        ElMessage.error(err.message || "系统出错");
      }
    })
}

const doEdit = (row) => {
  employeeType.value = 'edit'
  employeeInfo.value = row
  drawer.value = true
}

const doView = (row) => {
  router.push({
    name: 'employeeDetail',
    query: {
      code: row.code
    }
  })
}

const doChangePage = (data) => {
  params.value.pageNo = data
  params.value.empName = ''
  getEmployees()
}

const getEmployees = async () => {
  const body = {
    ...params.value,
    departCode: selectDepartCode.value
  }
  try {
    const resp = await GetEmployeesApi(body);
    if (resp.list) {
      tableData.value = resp.list
      totalCount.value = resp.totalCount
    }
  } catch (err) {
    ElMessage.error(err.message || "系统出错");
  }
}

const drawer = ref(false)

const doCloseDrawer = () => {
  drawer.value = false
}

const doSumbit = (info) => {
  const body = {
    code: info.code,
    name: info.name,
    gender: info.gender,
    departCode: selectDepartCode.value
  }
  if (employeeType.value == 'add') {
    addEmployee(body)
  } else {
    editEmployee(body)
  }
}

const addEmployee = async (body) => {
  try {
    await CreateEmployeeApi(body);
    doReset()
     drawer.value = false
    ElMessage({
      type: 'success',
      message: '新增成功',
    })
  } catch (err) {
    ElMessage.error(err.message || "系统出错");
  }
}
const editEmployee = async (body) => {
  try {
    await UpdateEmployeeApi(body);
    doRefresh()
    drawer.value = false
    ElMessage({
      type: 'success',
      message: '修改成功',
    })
  } catch (err) {
    ElMessage.error(err.message || "系统出错");
  }
}

const employeeType = ref('add')
const employeeInfo = ref<any>({})

</script>
<style lang="scss" scoped>
.home-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .warp-slider {
    width: 200px;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
  }

  .warp-main {
    flex: 1;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;

    .form-box {
      width: 100%;

      .form-line {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .line-left {
          flex: 1;
          height: 40px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .line-right {
          width: 200px;
          height: 40px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
      }
    }

    .table-box {
      height: calc(100vh - 320px);

      .avatar {
        width: 20px;
        height: 20px;
        background: #ccc;
        border-radius: 50%;
        margin-right: 6px;
      }
    }

    .page-box {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    }
  }
}
</style>
  