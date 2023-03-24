<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row flex-nowrap">
        <Sidebar/>
      <main class="app-content">
        <div class="col py-3">
          <router-view/>
        </div>
     </main>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue'
import Sidebar from '@/components/app/Sidebar.vue'
// import messages from '@/utils/messages'

export default {
  name: 'main-layout',
  // data: () => ({
  //   isOpen: true,
  //   loading: true
  // }),
  // async mounted() {
  //   if (!this.$store.getters.info.bill || !this.$store.getters.info.name) {
  //     await this.$store.dispatch('fetchInfo')
  //   }
  //
  //   this.loading = false
  // },
  components: {
    Navbar,
    Sidebar
  },
  // computed: {
  //   error() {
  //     return this.$store.getters.error
  //   },
  //   locale() {
  //     return this.$store.getters.info.locale
  //   }
  // },
  // watch: {
  //   error(fbError) {
  //     this.$error(messages[fbError.code] || 'Что-то пошло не так')
  //   }
  // }
}
</script>
