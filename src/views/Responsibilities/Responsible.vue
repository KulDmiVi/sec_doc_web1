<template>
  <h4  v-if="typeRequest"> {{item_type.value}}</h4>

  <input type="radio"  v-model="responseType" value="employee" v-on:change="modifyTypeResponse('employee') "/>
  <label> Отвественный</label><br>

  <input type="radio"   v-model="responseType" value="deputy_employee"  v-on:change="modifyTypeResponse('deputy_employee')"/>
  <label> Заместитель</label><br>

  <input type="radio"  v-model="responseType" value="department" v-on:change="modifyTypeResponse('department')"/>
  <label> Подразделение</label><br>

  <input type="radio"   v-model="responseType" value="isppdn"   v-on:change="modifyTypeResponse('isppdn')"/>
  <label> На сотрудников, чьи полномочия ограничены конкретной ИСПДн</label><br>



  <div class="col-md-10 order-md-1">
    <div class="mb-1" v-show="responseTypes['employee']">
      <select
              class="form-select"
              v-model="employe"
      >
        <option v-for = 'emp in employees' v-bind:value="emp.id" >{{emp.select_name}}</option>
      </select>

    </div>

    <div class="mb-1" v-show="responseTypes['deputy_employee']" >
      <label for="username">Заместитель отвественного</label>
      <select
          class="form-select"
          v-model="deputy_employee"
      >
        <option v-for = 'emp in employees' v-bind:value="emp.id" >{{emp.select_name}}</option>
      </select>
    </div>

    <div class="mb-1" v-show="responseTypes['department']">
      <label for="username">Структурное подразделение</label>
      <select
          class="form-select"
          v-model="department"
      >
        <option v-for = 'dep in departments' v-bind:value="dep.id" >{{dep.select_name}}</option>
      </select>
    </div>

    <div class="mb-1" v-show="responseTypes['isppdn']">
      <label for="username" >ИСПДн</label>
      <div class="input-group">
        <input type="text" class="form-control" id="short_name">
      </div>
    </div>
  </div>
</template>

<script>
import TableEditor from '@/components/VueEditortable.vue'
import OrganisationService from "@/services/organisation.service";
import AdvancedSelect from '@/components/AdvancedSelect.vue';
export default {
  name: "commission",
  data() {
    return {
      responseType: "employee",
      responseTypes: {
        employee: true,
        deputy_employee: false,
        department: false,
        isppdn: false,
    },
      employe: '',
      deputy_employee: '',
      typeRessponseCheked:[],

      employees: [],
      departments: [],

      responsibilities: [],
      item_type: {},

      responsibilitiesRequest: false,
      typeRequest: false,
      departmentRequest: false,
      isEmployeeRequest: false,
    };
  },

  components: {
    TableEditor,
    AdvancedSelect
  },

  methods: {

    modifyTypeResponse(type) {
      switch(type) {
        case  "employee":
          this.responseTypes['employee'] = true;
          this.responseTypes['deputy_employee'] = false;
          this.responseTypes['department'] = false;
          this.responseTypes['isppdn'] = false;
          break;
        case  "deputy_employee":
          this.responseTypes['employee'] = false;
          this.responseTypes['deputy_employee'] = true;
          this.responseTypes['department'] = false;
          this.responseTypes['isppdn'] = false;
          break;
        case  "department":
          this.responseTypes['employee'] = false;
          this.responseTypes['deputy_employee'] = false;
          this.responseTypes['department'] = true;
          this.responseTypes['isppdn'] = false;
          break;
        case  "isppdn":
          this.responseTypes['employee'] = true;
          this.responseTypes['deputy_employee'] = false;
          this.responseTypes['department'] = false;
          this.responseTypes['isppdn'] = true;
          break;
      }
    },

    getResponsibilitiesTypes() {
      OrganisationService.getRbResponsibilities().then(
          (response) => {
            response.data.forEach(
                (resp) => {
                  if(resp.id === this.$route.params.responsible_type){
                    this.item_type = resp;
                    this.typeRequest = true;
                  }
                }

            );
          },
          (error) => {console.log(error);}
      );
    },


    getResponsibilities() {
      OrganisationService.getResponsibilities()
          .then(response => {
            this.responsibilities = response.data
            this.responsibilitiesRequest = true

          })
          .catch(error => {
                console.log(error);
              }
          );
    },

    getEmployees() {
      OrganisationService.getEmployees().then(
          (response) => {
            response.data.forEach((item) => {
              this.employees.push(
                  {
                    id: item.id,
                    select_name: item.surname + ' ' + item.name + ' ' + item.patronymic
                  }
              );
            });
            this.isEmployeeRequest = true;
          },
          (error) => {
            console.log(error);
          }
      );
    },

    getDepartments(){
      OrganisationService.getDepartments().then(
          (response) => {
              response.data.forEach((item) => {
              this.departments.push(
                  {
                    id: item.id,
                    select_name: item.name
                  }
              );
            });
            this.isDepartmentRequest = true;

          },
          (error) => {console.log(error);}
      );
    },
  },

  mounted() {
    this.getResponsibilities();
    this.getResponsibilitiesTypes();
    this.getEmployees();
    this.getDepartments()

  },
};

</script>
