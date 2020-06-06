<template>
  <a-modal
    v-model="showLogin"
    :footer="null"
    :closable="false"
    :width="320"
    wrapClassName="login"
    centered
    :maskStyle="{backgroundColor: 'rgba(0, 0, 0, 0.1)'}"
  >
    <div v-if="now_login">
      <a-form id="login" :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            v-decorator="['user_name',{rules: [{ required: true, message: '用户不能为空!' }]}]"
            placeholder="用户名"
          >
            <!-- 改成我们需要的验证 -->
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="['user_password',{rules: [{ required: true, message: '密码不能为空!' }]}]"
            type="password"
            placeholder="密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            class="login-form-button"
            :loading="loading"
          >登录</a-button>
        </a-form-item>
      </a-form>
      <div class="register" @click="toRegister">注册</div>
    </div>
    <div v-else>
      <a-form id="login" :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            v-decorator="['user_name',{rules: [{ required: true, message: '用户不能为空!' }]}]"
            placeholder="用户名"
          >
            <!-- 改成我们需要的验证 -->
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="['user_password',{rules: [{ required: true, message: '密码不能为空!' }]}]"
            type="password"
            placeholder="密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="['user_password',{rules: [{ required: true, message: '密码不能为空!' }]}]"
            type="password"
            placeholder="再次输入密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            class="login-form-button"
            :loading="loading"
          >注册</a-button>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script>
import { mapState, mapGetters } from "vuex";
// import { login_cellphone, user_detail } from '@/api/user'
import { login, user_detail } from "@/api/user";
import eventBus from "@/utils/eventBus";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      loading: false,
      now_login: true
    };
  },
  computed: {},
  computed: {
    ...mapState("App", ["redirect"]),
    ...mapState("User", ["userInfo"]),
    ...mapGetters("User", ["hasUserInfo"]),
    showLogin: {
      get() {
        return this.$store.state.User.showLogin;
      },
      set(value) {
        this.$store.commit("User/SET_SHOW_LOGIN", value);
      }
    },
    userId() {
      return this.userInfo.userId;
    }
  },
  watch: {
    showLogin(newVal) {
      if (newVal) {
        this.loading = false;
        this.now_login = true;
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    toRegister() {
      // this.showLogin = false;
      this.now_login = false;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.loading = true;
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            const result = await login(values);
            // let { code, account } = await login(values)
            let code = result.code;
            let msg = result.msg;
            if (code === 200) {
              let user_id = result.data;
              localStorage.setItem("userId", user_id);
              this.$store.commit("User/SET_SHOW_LOGIN", false);
              // const detail = await user_detail(id)
              this.$store.commit("User/SET_USER_INFO", {
                userId: user_id,
                userName: values.userName
                // ...detail
              });
              setTimeout(() => {
                if (this.$route.name === "home") {
                  eventBus.$emit("refresh");
                } else {
                  let redirect = this.redirect || "/home";
                  this.$router.push({ path: redirect });
                }
                this.loading = false;
              }, 100);
            } else {
              this.loading = false;
            }
          } catch (error) {
            this.loading = false;
          }
        }
      });
    }
  }
};
</script>
<style>
.ant-modal-wrap.login {
  z-index: 100000;
}
.login .ant-modal-content {
  min-height: 400px;
  background: #f8f8f8 url("./../../assets/images/login.jpg") top center/contain
    no-repeat !important;
  /* background: #f8f8f8 url("./../../assets/images/loginBg.jpg") top
    center/contain no-repeat !important; */
}

#login {
  margin-top: 180px;
}

#login .login-form-button {
  width: 100%;
}

.register {
  width: 100%;
  text-align: center;
}
</style>
