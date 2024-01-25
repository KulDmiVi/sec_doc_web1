<template>

  <div class="row" v-if="isRbResponsibilitiesRequest">
    <h4>{{rbResponsibilities[responsibilities_uid]}}</h4>
    <div class="col-md-10 order-md-1">
      <form class="needs-validation"  @submit.prevent="submit">
        <div class="mb-1">
          <label for="org_names_choice">Отвественный</label>
          <input  class="form-control" list="employees" id="org_names_choice" name="org_names_choice" v-model="current_responsibility">
          <datalist id="employees">
            <option v-for ="employee in employees" :value = employee.id>{{employee.select_name}}</option>
          </datalist>
        </div>
        <div class="row">
          <div class="offset-md-10">
            <button class="btn btn-primary btn-lg btn-block" type="submit">Сохранить изменения</button>
          </div>
        </div>
      </form>
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
      responsibilities_uid: null,
      current_responsibility: null,
      employees: [],
      rbResponsibilities: {},
      responsibilities: [],
      commissions: {},
      isRbResponsibilitiesRequest: false,
      isResponsibilitiesRequest: true
    };
  },

  components: {
    TableEditor,
    AdvancedSelect
  },

  methods: {
    getRbResponsibilities() {
      OrganisationService.getRbResponsibilities()
          .then(response => {
            response.data.forEach(element =>
                this.rbResponsibilities[element.id] = element.value);
            this.isRbResponsibilitiesRequest = true;
          })
          .catch(error => {
                console.log(error);
              }
          );
    },
    getResponsibilities() {
      OrganisationService.getResponsibilities()
          .then(response => {
            this.responsibilities = response.data

          })
          .catch(error => {console.log(error);}
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
          (error) => {console.log(error);}
      );
    },


    submit() {
    },

    getCommissionMembers() {
      this.commissionsMembers = [];
      OrganisationService.getCommissionMembers().then(
          (response) => {
            response.data.forEach((item) =>{
              if (this.commissions[this.commissionType] == item.commission) {
              this.commissionsMembers.push(
                  {
                    role: item.role,
                    member: item.member
                  }
              )
            }});
            this.isMembersRequest = true;
          },
          (error) => { console.log(error);
          }
      )

    },
    addCommissionMember(data) {
      let commissions_id = this.commissions[this.$route.params.uid];
      if (!commissions_id) {
        let commission = {
          is_active: true,
          commission_type: this.$route.params.uid,
        };
        commissions_id = this.addCommission(commission)
      }
      data['commission'] = commissions_id;
      OrganisationService.postCommissionMember(data)
    },
    addCommission(commision) {
      OrganisationService.postCommission(commision).then(
          (response) => {
            let request = response.data;
            return request['id'];
          },
          (error) => {console.log(error);}
      );
    },
    updateCommissionMember() {
    },
    deleteCommissionMember() {
    },
  },

  watch: {
    '$route'(to, from) {
      this.isResponsibilitiesRequest = false;
      this.responsibilities_uid = this.$route.params.uid;
      this.getResponsibilities();

    }
  },

  mounted() {
    this.getRbResponsibilities();
    this.getEmployees();
  },
};

</script>
