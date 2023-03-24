<template>
  <h1>тест </h1>
</template>

<script>
import UserService from "@/services/organisation.service";
import EventBus from "@/common/EventBus";

export default {
  name: 'department',
  data(){
    return {
    departments: '',
    }
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"))
    UserService.getDepartments(user.organisation).then(
        (response) => {
          this.departments = response.data;
        },
        (error) => {
          this.departments =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();

          if (error.response && error.response.status === 403) {
            EventBus.dispatch("logout");
          }
        }
    );

  },
}
</script>

