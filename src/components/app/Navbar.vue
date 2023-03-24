<template>
  <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#"></a>
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#">Войти</a>
<!--        <a class="nav-link" href="#">Выйти</a>-->
      </li>
    </ul>
  </nav>
<!--  <nav class="navbar orange lighten-1">-->
<!--    <div class="nav-wrapper">-->
<!--      <div class="navbar-left">-->
<!--        <a href="#" @click.prevent="$emit('click')">-->
<!--          <i class="material-icons black-text">dehaze</i>-->
<!--        </a>-->
<!--&lt;!&ndash;        <span class="black-text">{{date | date('datetime')}}</span>&ndash;&gt;-->
<!--      </div>-->

<!--      <ul class="right hide-on-small-and-down">-->
<!--        <li>-->
<!--          <a class="dropdown-trigger black-text" href="#" data-target="dropdown" ref="dropdown">-->
<!--            {{name}}-->
<!--            <i class="material-icons right">arrow_drop_down</i>-->
<!--          </a>-->

<!--          <ul id="dropdown" class="dropdown-content">-->
<!--            <li>-->
<!--              <router-link to="/profile" class="black-text">-->
<!--                <i class="material-icons">account_circle</i>-->
<!--                {{'ProfileTitle'|localize}}-->
<!--              </router-link>-->
<!--            </li>-->
<!--            <li class="divider" tabindex="-1"></li>-->
<!--            <li>-->
<!--              <a href="#" class="black-text" @click.prevent="logout">-->
<!--                <i class="material-icons">assignment_return</i>-->
<!--                {{'Exit'|localize}}-->
<!--              </a>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
<!--  </nav>-->
</template>


<script>
// export default {
//   data: () => ({
//     date: new Date(),
//     interval: null,
//     dropdown: null
//   }),
//   methods: {
//     async logout() {
//       await this.$store.dispatch('logout')
//       this.$router.push('/login?message=logout')
//     }
//   },
//   computed: {
//     name() {
//       return this.$store.getters.info.name
//     }
//   },
//   mounted() {
//     this.interval = setInterval(() => {
//       this.date = new Date()
//     }, 1000)
//     this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
//       constrainWidth: false
//     })
//   },
//   beforeDestroy() {
//     clearInterval(this.interval)
//     if (this.dropdown && this.dropdown.destroy) {
//       this.dropdown.destroy()
//     }
//   }
// }
</script>
