<template>
    <h1>Сотрудники</h1>
    <TableEditor
        v-if="isEmployee && isDepartmentRequest && isPostRequest"
        v-bind:fields="fields"
        v-bind:items="employees"
        @saveRow="addEmployee"
        @updateRow="updateEmployee"
        @deleteRow="deleteEmployee"
    />
</template>

<script>
import TableEditor from '@/components/VueEditortable.vue'
import OrganisationService from "@/services/organisation.service";
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
      isEmployee: false,
      isDepartmentRequest: false,
      isPostRequest: false
    };
  },

  components: {
    TableEditor,
    AdvancedSelect,
  },

  methods: {
    updateEmployee(data){
      OrganisationService.updateEmployee(data).then(
          response => {
            console.log(response);
            this.getEmployees();
          },
          error => {
            console.log(error);
          }
      )
    },

    addEmployee(data){
      OrganisationService.postEmployee(data).then(
          (response) => {
            this.request = response.data;
          },
          (error) => {console.log(error);}
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
         (error) => {console.log(error);}
      );
    },

    getEmployees(){
      OrganisationService.getEmployees().then(
          (response) => {
            this.employees = response.data;
            this.isEmployee=true;
          },
          (error) => {console.log(error);}
      );
    },

    getPosts(){
      let posts = [{id:null, select_name:'Выберети значение'},]
      OrganisationService.getPosts().then(
          (response) => {
            let optionsData = response.data.map(
                item => ({id: item['id'], select_name:item['name'] })
            );
            posts = posts.concat(optionsData);
            this.fields.forEach((element) => {
              if(element["key"] === "post"){
                element['options'] = posts
                console.log(element['options'])
              }
            });
            this.isPostRequest = true
          },
          (error) => {console.log(error);}
      );
    },

    deleteEmployee(data){
      OrganisationService.deleteEmployee(data.id).then(
          (response) => {
            this.request = response.data;
          },
          (error) => {console.log(error);}
      );
    }
  },

  mounted(){
    this.getDepartments();
    this.getEmployees();
    this.getPosts();
  },
}
</script>

