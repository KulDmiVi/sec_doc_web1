<template>

    <h1>Сотрудники</h1>
  <div> sawfdaew  <AdvancedSelect
      :options="['go', 'python', 'rust', 'javascript']"
      :default="'go'"
      class="select"

    />
    <!--      @input="alert(displayToKey($event))"-->
  </div>
    <TableEditor
        v-if="isRequest && isDepartmentRequest && isPostRequest"
        v-bind:fields="fields"
        v-bind:items="employees"
        @addRow="addEmployee"
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
    addEmployee(data){
      let current_user = JSON.parse(localStorage.getItem("user"))
      data['organisation'] = current_user.organisation
      OrganisationService.postEmployee(data).then(
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


  mounted(){
    let user = JSON.parse(localStorage.getItem("user"))

    let departments = [{id:null, name:'Выберети значение'},]
    let posts = [{id:null, name:'Выберети значение'},]
    OrganisationService.getDepartments(user.organisation).then(
        (response) => {
          departments = departments.concat(response.data);
          this.fields.forEach((element) => {
            if(element["key"] === "department"){
              element['options'] = departments
              }
          });

          this.isDepartmentRequest = true
        },
        (error) => {
          departments =
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

    OrganisationService.getPosts(user.organisation).then(
        (response) => {
          let optionsData = response.data.map(item => ({id: item['id'], name:item['post'] }));
          posts = posts.concat(optionsData);
          this.fields.forEach((element) => {
            if(element["key"] === "post"){
              element['options'] = posts
            }
          });

          this.isPostRequest = true
        },
        (error) => {
          departments =
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

    OrganisationService.getEmployees(user.organisation).then(
        (response) => {
          this.employees = response.data;
          this.isRequest=true
        },
        (error) => {
          this.employees =
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

