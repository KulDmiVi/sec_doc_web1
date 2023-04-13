<template>
    <h1>Помещения</h1>
    <TableEditor v-if="isRequest"
                 v-bind:fields="fields"
                 v-bind:items="rooms"
                 @addRow = "addRoom" />
</template>

<script>
import TableEditor from '@/components/VueEditortable.vue'
import OrganisationService from "@/services/organisation.service";
import EventBus from "@/common/EventBus";

export default {
  name: "departmens",
  data() {
    return {
      user: '',
      rooms: [],
      fields: [
        { key: "department", label: "Подразделения", class: 'form-control', type: 'text', teg: 'input'},
        { key: "name", label: "Имя", class: 'form-control', type: 'text', teg: 'input'},
        { key: "address", label: "Адресс", class: 'form-control', type: 'text', teg: 'input',},
        { key: "is_active", label: "Активна", class: 'form-control', type: 'text', teg: 'input'},
      ],
      isRequest: false,
    };
  },
  components: {
    TableEditor,
  },

 methods: {
   addRoom(data){
     let user = JSON.parse(localStorage.getItem("user"))
      OrganisationService.postRoom(user.organisation, data).then(
          (response) => {
            this.request = response.data;
          },

          (error) => {
            this.request =
                (error.response &&
                 error.response.data &&
                 error.response.data.message) ||
                 error.message ||
                 error.toString();
            if (error.response && error.response.status === 403){
              EventBus.dispatch("logout");
            }
          }
    );
    }
 },


  mounted(){
    this.user = JSON.parse(localStorage.getItem("user"))
    OrganisationService.getRooms(this.user.organisation).then(
        (response) => {
          this.rooms = response.data;
          this.isRequest = true
        },
        (error) => {
          this.rooms =
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

