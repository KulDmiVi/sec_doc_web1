<template>
    <h1>Сотрудники</h1>
    <TableEditor
        v-if="isRequest && isDepartmentRequest && isPostRequest"
        v-bind:fields="fields"
        v-bind:items="employees"
        @saveRow="addEmployee"
        @updateRow="updateEmployee"
    />
</template>

<script>
import TableEditor from '@/components/VueEditortable.vue'
import OrganisationService from "@/services/organisation.service";
import EventBus from "@/common/EventBus";
import AdvancedSelect from '@/components/AdvancedSelect.vue';

export default {
  name: "employees",
  data() {
    return {
      departments: [],
      fields: [
        { key: "surname", label: "Фамилия", class: 'form-control', type: 'text', teg: 'input'  },
        { key: "name", label: "Имя", class: 'form-control', type: 'text', teg: 'input'    },
        { key: "patronymic", label: "Отчество", class: 'form-control', type: 'text', teg: 'input'    },
        { key: "post", label: "Должность",
          class: 'form-control', type: 'text',
          teg: 'select',  options: [] },
        { key: "department", label: "Подразделение",
          class: 'form-control', type: 'text',
          teg: 'select', options: [] },
        { key: "email", label: "email", class: 'form-control', type: 'text', teg: 'input'   },
        { key: "phone", label: "Телефон", class: 'form-control', type: 'text', teg: 'input'   },
      ],
      employees: [],
      isRequest: false,
      isDepartmentRequest: false,
      isPostRequest: false
    };
  },

  components: {
    TableEditor,
    AdvancedSelect,
  },

  methods: {
    updateEmployee(){console.log("updateEmployee")},

    addEmployee(data){
      OrganisationService.postEmployee(data.department, data).then(
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
            this.fields[4].options = this.departments
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

    getEmployees(){
      OrganisationService.getEmployees().then(
          (response) => {
            this.employees = response.data;
            console.log(this.employees );
            this.isRequest=true;
            this.isDepartmentRequest=true;
            this.isPostRequest=true;
          },
          (error) => {
            this.request =
                (error.response && error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            if (error.response && error.response.status === 403) {
              EventBus.dispatch("logout");
            }
          }
      );
    }
  },

  mounted(){
    let posts = [{id:null, select_name:'Выберети значение'},]
    OrganisationService.getPosts().then(
        (response) => {

          let optionsData = response.data.map(item => ({id: item['id'], select_name:item['name'] }));
          posts = posts.concat(optionsData);
          console.log(posts)
          this.fields.forEach((element) => {
            if(element["key"] === "post"){
              element['options'] = posts
            }
          });
          console.log(this.fields);
          this.isPostRequest = true
        },
        (error) => {
          posts =
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
    this.getEmployees();
    this.getDepartments();
  },
}
</script>

