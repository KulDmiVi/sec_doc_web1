<template>
  <h4  v-if="typeRequest"> {{item_type.value}}</h4>
  <table v-if="responsibilitiesRequest">
    <tr>
      <th>Тип</th>
      <th>Информационная система персональных данных</th>
      <th>Ответственный</th>
      <th>Заместитель отвественного</th>
      <th>Подразделение</th>
    </tr>
    <tr v-for="resp in responsibilities">
      <td>{{resp.responsible_type}}</td>
      <td>{{resp.ISPDn}}</td>
      <td>{{resp.employee}}</td>
      <td>{{resp.deputy_employee}}</td>
      <td>{{resp.department}}</td>
    </tr>
  </table>
</template>

<script>
import TableEditor from '@/components/VueEditortable.vue'
import OrganisationService from "@/services/organisation.service";
import AdvancedSelect from '@/components/AdvancedSelect.vue';
export default {
  name: "commission",
  data() {
    return {
      employees: [],
      responsibilities: [],
      item_type: {},
      responsibilitiesRequest: false,
      typeRequest: false
    };
  },

  components: {
    TableEditor,
    AdvancedSelect
  },

  methods: {

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
  },

  mounted() {
    this.getResponsibilities();
    this.getResponsibilitiesTypes();
    this.getEmployees();
  },
};

</script>
