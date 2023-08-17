<template>
    <el-form :model="form" :rules="rules" label-width="120px">
        <el-form-item label="工号" prop="code">
            <el-input v-model="form.code" :disabled="type == 'edit'" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="性别">
            <el-radio-group v-model="form.gender">
                <el-radio label="男" />
                <el-radio label="女" />
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="doCancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps(['employeeInfo', 'type'])
const emit = defineEmits(['cancel', 'submit'])
const form = ref({
    name: '',
    code: '',
    gender: '男'
})
const rules = ref<any>({
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    code: [
        { required: true, message: '请输入工号', trigger: 'blur' }
    ],
})
watch(() => props.employeeInfo, (newVal, oldVal) => {
    form.value.name = newVal.name
    form.value.code = newVal.code
    form.value.gender = newVal.gender || '男'
}, {immediate: true, deep: true})

const doCancel = () => {
    emit('cancel')
}


const onSubmit = () => {
    console.log('提交', form.value)
    emit('submit', form.value)
}
</script>
<style scoped></style>
  