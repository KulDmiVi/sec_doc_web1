<template>


  <div>
    <h1>Подразделения</h1>
    <DepartmentForms ref = 'DepartmentForm' v-bind:uid="departmentUID"  v-show="isInfoPopupVisible"/>

    <TableEditor
        v-if="isRequest"
        v-bind:fields="fields"
        v-bind:items="departments"
        v-bind:enableEditForm="enableEditForm"
        @saveRow="addDepartment"
        @updateRow="updateDepartment"
        @deleteRow="deleteDepartment"
    />

  </div>
</template>

<script>
import TableEditor from '@/components/VueEditortable.vue'
import OrganisationService from "@/services/organisation.service";
import EventBus from "@/common/EventBus";
import DepartmentForms from "@/views/Organisation/Department.vue";



export default {
  name: "departments",

  data() {
    return {
      isAdded: false,
      isInfoPopupVisible: false,
      enableEditForm: false,
      isRequest: false,
      departments: [],
      departmentUID: '',
      fields: [
        { key: "name", default:'', label: "Наименование", class: 'form-control', type: 'text', teg: 'input' },
        { key: "is_branch" , default: 0, label: "Филиал", class: 'form-check-input', type: 'checkbox', teg: 'input'},
        { key: "KPP", default:'', label: "КПП", class: 'form-control', type: 'text', teg: 'input'},
        { key: "address", default:'', label: "Адрес", class: 'form-control', type: 'text', teg: 'input'},
      ],
    };
  },


  components: {
    TableEditor,
    DepartmentForms
  },

  methods: {
    addDepartment(data){
      let current_user = JSON.parse(localStorage.getItem("user"))
      data["organisation"] = current_user.organisation
      OrganisationService.postDepartment(current_user.organisation, data).then(
          (response) => {
            this.request = response.data;
          },
          (error) => {
            this.request = (
                error.response &&
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

    updateDepartment(data){
      OrganisationService.patchDepartment(data).then(
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

  deleteDepartment(data){
    OrganisationService.deleteDepartment(data.id).then(
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
},

  created(){
    let user = JSON.parse(localStorage.getItem("user"))
    OrganisationService.getDepartments().then(
        (response) => {
          this.departments = response.data;
          this.isRequest=true
        },
        (error) => {
          this.departments =
              (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          if (error.response && error.response.status === 403) {
            EventBus.dispatch("logout");
          }
        }
    );
  },
}
</script>

