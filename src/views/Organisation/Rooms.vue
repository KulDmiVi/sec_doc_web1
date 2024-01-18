<template>
    <h1>Помещения</h1>
    <TableEditor v-if="isRequest && isDepartmentRequest"
                 v-bind:fields="fields"
                 v-bind:items="rooms"
                 @saveRow="addRoom"
                 />
</template>

<script>
import TableEditor from '@/components/VueEditortable.vue'
import OrganisationService from "@/services/organisation.service";
import EventBus from "@/common/EventBus";
import AdvancedSelect from "@/components/AdvancedSelect.vue";

export default {
  name: "departmens",
  data() {
    return {
      user: '',
      rooms: [],
      departments: [],
      fields: [
        { key: "department", label: "Подразделение",
          class: 'form-control', type: 'text',
          teg: 'select', options: [] },
        { key: "name", label: "Наименование", class: 'form-control', type: 'text', teg: 'input'},
        { key: "address", label: "Адресс", class: 'form-control', type: 'text', teg: 'input',},
        { key: "is_active" , default: 1, label: "Активна", class: 'form-check-input', type: 'checkbox', teg: 'input'},
      ],
      isRequest: false,
      isDepartmentRequest: false,
    };
  },

  components: {
    TableEditor,
    AdvancedSelect,
  },
  methods: {
   addRoom(data){
      OrganisationService.postRoom(data).then(
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
    },
   getDepartments(){
    OrganisationService.getDepartments().then(
        (response) => {
          this.request = response.data;
          this.request.forEach(element => {
            this.departments.push(
                {
                  id: element.id,
                  select_name: element.name,
                }
            )
          });
          this.fields[0].options = this.departments
          this.isDepartmentRequest = true
        },
        (error) => {
          this.request =
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
  },

  mounted(){
    OrganisationService.getRooms().then(
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

  created(){
    this.getDepartments();
  },
}
</script>

