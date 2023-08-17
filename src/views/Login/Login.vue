<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router"
import { Lock, User } from '@element-plus/icons-vue'
import { LoginApi } from '@/https/login'
import { useUserStoreHook } from '@/store/modules/user'

const userInfo = ref({ username: 'uni1', password: '123456' })
const loading = ref(false)
const router = useRouter()


const onSubmit = async () => {
    const body = userInfo.value
    if (!userInfo.value.username || !userInfo.value.password) return
    loading.value = true
    const resp: any = await LoginApi(body)
    loading.value = false
    if (!resp.Result) {
        ElMessage.error(resp.Msg)
    } else {
        useUserStoreHook().setToken(resp.Token)
        router.push('/')
    }
}

</script>

<template>
    <div class="content">
        <div class="login-box">
            <div class="login-left">
                欢迎光临
            </div>
            <div class="login-right">
                <div class="title">欢迎回来</div>
                <el-form :model="userInfo" class="form-content">
                    <el-form-item>
                        <el-input v-model="userInfo.username" placeholder="请输入用户名" :prefix-icon="User"
                            style="width: 260px" />
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password" show-password v-model="userInfo.password" :prefix-icon="Lock"
                            placeholder="请输入密码" style="width: 260px" />
                    </el-form-item>
                    <el-button type="primary" @click="onSubmit" style="width: 260px" :loading="loading">登录</el-button>
                </el-form>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.content {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #6EB9FB 0%, #408EF5 100%);
    display: flex;
    justify-content: center;
    align-items: center;

    .login-box {
        width: 800px;
        height: 300px;
        border-radius: 10px;
        overflow: hidden;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .login-left {
        flex: 1;
        height: 300px;
        text-align: center;
        line-height: 300px;
        color: #fff;
        font-weight: 700;
        font-size: 50px;
        background: #4c63fa;
    }

    .login-right {
        flex: 1;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .title {
            width: 100%;
            height: 33px;
            font-size: 24px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #000000;
            line-height: 33px;
            text-align: center;
            margin-bottom: 40px;
        }
    }
}</style>
