<template>
  <section id="pageLogin" class="body-login h-100 d-flex flex-column m-0">
  <div class="card card-login mx-auto my-auto">
    <div class="card-header">
      Вход
    </div>
    <div class="card-body p-4">
      <form  class="card auth-card" @submit.prevent="handleLogin">
        <div class="form-group">
          <div class="input-group">
            <input id="username" name="username" class="form-control" placeholder="Логин" required="" autofocus="" type="text" v-model.trim="username">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <input id="password" name="password" class="form-control" placeholder="Пароль" required="" type="password" v-model.trim="password">
          </div>
          <div class="form-group mt-4 mb-2">
            <button type="submit" class="btn btn-primary btn-login">
              Войти
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  </section>
</template>

<script>

import RefBooks from "../services/refbooks.service";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: 'login',
  data: () => ({
    username: '',
    password: ''
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  methods: {
    handleLogin() {
      const formData = {
        username: this.username,
        password: this.password}

      this.$store.dispatch("auth/login", formData).then(
          () => {
            let user_data = JSON.parse(localStorage.getItem('user'));
            let token_data = VueJwtDecode.decode(user_data.access);
            localStorage.setItem('organisation',  token_data.organisation_id);
            new RefBooks();
            this.$router.push("/organisation/");
            this.loading = true;
          },
          (error) => {console.log(error)}
      );
    },
  },
}
</script>
