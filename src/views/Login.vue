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
      this.loading = true;
      this.$store.dispatch("auth/login", formData).then(
          () => {
            this.$router.push("/select_organisation");
          },
          (error) => {
            this.loading = false;
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },
  },
}
</script>
