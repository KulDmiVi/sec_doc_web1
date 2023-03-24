<template>
<!--  <div class="container">-->
    {{departments}}

  <TableEditor v-bind:fields="fields" v-bind:departments="departments"/>


</template>

<script>
import TableEditor from '@/components/VueEditortable.vue'
import UserService from "@/services/organisation.service";
import EventBus from "@/common/EventBus";



export default {
  name: "departmens",
  data() {
    return {
      fields: [
        { key: "name", label: "Наименование"},
        { key: "is_branch", label: "is_branch" },
        { key: "KPP", label: "KPP" },
        { key: "address", label: "address" },
      ],
      departments: [],
    };
  },
  components: {
    TableEditor,
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

