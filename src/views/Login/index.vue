<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { User, Lock, Iphone } from '@element-plus/icons-vue'
let formRef = ref<FormInstance>();
const loginForm = reactive({
    username: "",
    password: "",
    authCode: ""
})
let loginRules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
        },
    ]
});
let language = ref("");
let languageSwitch = (lang) => {
    language.value = lang;
}
</script>
<template>
    <div class="login_container">
        <div class="login_logo_div">
            <div class="login_title_box">
                <!-- <img class="login_title_img" src="@/assets/images/login/logo.png" alt="" /> -->

                <div class="login_title_word">
                    <div class="login_gs">广州某某科技有限公司</div>
                    <div class="login_xt">实验室综合管理系统</div>
                </div>
            </div>
            <div class="login_qrcode_img">
                <div class="qrcodediv">
                    <canvas id="qrcode_canvas"></canvas>
                </div>
                <span class="qrcodeText">移动端入口</span>
            </div>
        </div>
        <div class="login_form_box">
            <img class="login_form_bg" src="@/assets/images/login/login_bg.png" />

            <div class="login_form">
                <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="formRef"
                    label-position="left">
                    <div class="login_title">
                        <div class="title" @click="showLogoCheck">欢迎登录</div>
                    </div>
                    <div>
                        <el-form-item prop="username">
                            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on"
                                placeholder="请输入用户名" :prefix-icon="User">
                            </el-input>
                            <div class="iconFormItem">
                                <!-- <img src="assets/images/login/L_user.png" /> -->
                            </div>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input name="password" :type="passwordType" v-model="loginForm.password"
                                autoComplete="on" placeholder="请输入密码" :prefix-icon="Lock">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="authCode" class="mb20">
                            <el-input class="yanzhengmaCls" name="authCode" v-model="loginForm.authCode"
                                autoComplete="on" placeholder="请输入验证码" :prefix-icon="Iphone"></el-input>
                            <div class="iconFormItem">
                                <!-- <img src="assets/images/login/L_code.png" /> -->
                            </div>
                            <div class="codeRight">
                                <img @click="updateCode()" :src="loginForm.codeImg" />
                            </div>
                        </el-form-item>
                        <el-form-item class="btn_container mb15">
                            <div @click="handleLogin" class="btnBox">立即登录</div>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="login_bottom_div">
            <div class="copyright-box">
                <div>
                    <span class="lang zh" :class="{ active: language === 'zh' }"
                        @click="languageSwitch('zh')">简体中文</span>
                    <span> | </span>
                    <span class="lang en" :class="{ active: language === 'en' }"
                        @click="languageSwitch('en')">English</span>
                </div>
                <div>Copyright@2015-2024 广州某某科技有限公司</div>
                <div>{{ 'Version:' + "1.0" }}</div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.lang {
    cursor: pointer;

    &.active {
        color: $color-primary;
        font-weight: bold;
    }
}

.zh {
    margin-right: pxTovw(10);
}

.en {
    margin-left: pxTovw(10);
}

.login_container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .login_form_box {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        width: 100%;
        position: relative;

        .login_form_bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -99;
        }
    }
}

.login_title_box {
    height: pxTovw(70);
    display: flex;
    margin-left: pxTovw(120);
    margin-right: auto;

    .login_title_img {
        // height: 100%;
        height: pxTovw(100);
    }

    .login_title_word {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: pxTovw(18);

        .login_gs {
            font-size: pxTovw(27);
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #0b59b8;
            line-height: pxTovw(26);
        }

        .login_xt {
            font-size: pxTovw(24);
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #555555;
            line-height: pxTovw(24);
        }
    }
}

.login_qrcode_img {
    text-align: right;
    margin-right: pxTovw(180);
    margin-left: auto;
    padding-top: pxTovw(4);
    display: flex;
    align-items: center;

    .qrcodeText {
        font-size: pxTovw(18);
        font-weight: 600;
        color: #555;
        width: pxTovw(20);
        line-height: pxTovw(21);
        margin-left: pxTovw(8);
        display: inline-block;
    }
}

.login_content_img {
    position: absolute;
    left: pxTovw(150);
    top: pxTovw(100);
}

.login_form {
    background-color: #ffffff;

    border-radius: pxTovw(15);
    width: pxTovw(450);
    min-width: pxTovw(450);
    // height: pxTovw(630);
    box-sizing: border-box;
    position: relative;
    margin: auto 0;
    text-align: left;
    padding: pxTovw(30) pxTovw(40);

    margin-right: pxTovw(72);
}

.login_form input {
    height: pxTovw(50) !important;
}

.login_title {
    text-align: left;
    margin-bottom: pxTovw(24);
    border-radius: pxTovw(4);
    color: #919dad;
    font-size: pxTovw(30);
}

.login_title .title {
    line-height: 1;
}

.btn_container {
    text-align: center;
}

.auth_code {
    width: pxTovw(63);
    height: pxTovw(37);
}

.url_div {
    position: absolute;
    right: pxTovw(10);
    top: pxTovw(10);
}

.login_logo_div {
    background-color: #fff;
    width: 100%;
    height: pxTovw(120);
    display: flex;
    align-items: center;
}

.login_bottom_div {
    background-color: #fff;
    width: 100%;
    height: pxTovw(120);
}

.regPass {
    float: right;
}

.regPass>a {
    color: #555555;
    font-weight: bold;
    font-size: pxTovw(14);
    text-decoration: underline;
}

// .regPass > a:hover {
//   color: $--color-primary;
// }

.yanzhengma {
    width: pxTovw(65);
    height: pxTovw(37);
}

.login_img {
    position: absolute;
    top: pxTovw(16);
    right: pxTovw(16);
}

.copyright-box {
    position: absolute;
    bottom: pxTovw(46);
    right: pxTovw(15);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    line-height: pxTovw(22);
    font-size: pxTovw(14);
}

.tips {
    font-size: pxTovw(14);
    text-align: center;
    color: #919dad;
}

:deep(.mycheckbox.el-form-item--mini .el-form-item__content) {
    line-height: 1;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
    background-color: #0495ef !important;
    border-color: #0495ef !important;
}

:deep(.el-checkbox__inner:hover) {
    border-color: #0495ef !important;
}

:deep(.el-input__inner) {
    height: pxTovw(58) !important;
    line-height: pxTovw(58) !important;
    box-sizing: border-box;
}

:deep(.yanzhengmaCls .el-input__inner) {
    height: pxTovw(58) !important;
}

:deep(.login-form .el-form-item) {
    .el-input__wrapper {
        background-color: #e0e8f6 !important;
        border: #e0e8f6 !important;
    }

    .el-input__inner {
        font-size: pxTovw(16) !important;
        border-radius: pxTovw(8) !important;
    }
}

:deep(.url_div .el-select .el-input__inner) {
    padding-left: pxTovw(15) !important;
    height: pxTovw(36) !important;
    line-height: pxTovw(36) !important;
}

:deep(.login-form .el-form-item .el-input__inner::placeholder) {
    color: #919dad !important;
    font-size: pxTovw(16) !important;
}

.login-form .iconFormItem {
    position: absolute;
    left: pxTovw(20);
    top: 50%;
    transform: translateY(-50%);
    height: pxTovw(29);
    width: pxTovw(24);

    img {
        width: 100%;
    }
}

.login-form .codeRight {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: pxTovw(7);
    line-height: 1;
    height: pxTovw(42);
    width: pxTovw(115);

    img {
        width: 100%;
        height: 100%;
    }
}

:deep(.yanzhengmaCls .el-input__inner) {
    padding-right: pxTovw(129);
}

.el-form-item--mini.el-form-item {
    margin-bottom: pxTovw(25) !important;
}

.mb20.el-form-item {
    margin-bottom: pxTovw(20) !important;
}

.mb15.el-form-item {
    margin-bottom: pxTovw(15) !important;
}

.btnBox {
    background-image: url('@assets/images/login/loginbtn.png');
    background-size: 100% 100%;
    height: pxTovw(58);
    line-height: pxTovw(58);
    width: 100%;
    box-sizing: border-box;
    letter-spacing: pxTovw(2);
    font-size: pxTovw(20);
    color: #ffffff;
    position: relative;
    box-shadow: 6px 6px 12px #cae9fc;
    -webkit-box-shadow: 6px 6px 12px #cae9fc;
    border-radius: pxTovw(30);
    cursor: pointer;
}

.btnBoxImg {
    position: absolute;
}

.mycheckbox {
    margin-bottom: pxTovw(20) !important;
}

.mycheckbox .el-checkbox__label {
    font-size: pxTovw(16);
    color: #919dad;
}

:deep(.mycheckbox .el-checkbox__input.is-checked + .el-checkbox__label) {
    color: #0495ef !important;
}

.otherLogin {
    background: url('../../../../assets/images/login/line.png') no-repeat;
    background-position: center;
    margin-bottom: pxTovw(15);
}

.otherLoginIcon {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .icon1,
    .icon2 {
        position: relative;

        img {
            height: pxTovw(76);
            display: block;
            margin: auto;
        }

        .word_box {
            position: absolute;
            right: 0;
            top: 0;
            width: 58%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;

            .title {
                font-size: pxTovw(15);
                font-family: 'Microsoft YaHei';
                font-weight: bold;
                color: #2f9df1;
                margin-bottom: pxTovw(4);
            }

            .value {
                font-size: pxTovw(12);
                font-family: 'Microsoft YaHei';
                font-weight: 400;
                color: #2f9df1;
            }
        }
    }

    .icon1 {
        cursor: pointer;
    }
}

/**单点登录 */
.login-type {
    display: flex;
    align-items: center;
    padding: 0 0 25px;

    .type-item {
        cursor: pointer;
        font-size: 25px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #919dad;
        line-height: 30px;
        margin: 0 15px;
        padding: 10px 0;
    }

    .active-item {
        color: #0495ef;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 2px;
            background: #0495ef;
            border-radius: 1px;
        }
    }
}

.otherLoginBox {
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;

    // justify-content: center;
    .mb20.el-form-item {
        width: 100%;
    }

    .other_login_img {
        padding: 5px 0 50px;
        width: 345px;
        height: auto;
        margin: auto;
    }
}
</style>
