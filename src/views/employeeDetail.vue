<template>
    <div class="employee-Detail">
        <div class="text item line">
            工号： {{ employeeInfo.code }}
        </div>
        <div class="text item line">
            姓名： {{ employeeInfo.name }}
        </div>
        <div class="text item line">
            描述： {{ employeeInfo.info }}
        </div>
        <div class="text item line">
            查看次数： {{ employeeInfo.count }}
        </div>
        <div class="text item line">
            上次查看时间： {{ employeeInfo.time }}
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { GetEmployeeDetailApi } from "@/https/employee";
import { getEmployee } from '@/utils/util'

const route = useRoute();
const employeeInfo = ref<any>({})
onMounted(() => {
    const empCode = route.query.code;
    getEmployeeDetail(empCode);
});
const getEmployeeDetail = async (empCode) => {
    try {
        const resp = await GetEmployeeDetailApi({ empCode: empCode });
        employeeInfo.value = {
            ...resp,
            ...getEmployee(resp.code)
        }
    } catch (err) {
        ElMessage.error(err.message || "系统出错");
    }
}

</script>
<style scoped>
.employee-Detail {
    padding: 20px;
}
.line {
    margin-top: 10px;
}
</style>
  