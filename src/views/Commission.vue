<template>
  <h2 v-if="isCommissionRequest && isCommissionTypeRequest">{{commissionTypes[commissionType] }}</h2>
  <label>Члены комиссии</label>
  <TableEditor
      v-if="isMembersRequest && isEmployeeRequest"
      v-bind:fields="fields"
      v-bind:items="commissionsMembers"
      v-bind:enableEditForm=false
      @saveRow="addCommissionMember"
      @updateRow="updateCommissionMember"
      @deleteRow="deleteCommissionMember"
  />
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
      fields: [
        { key: "role",
          default: '',
          label: "Роль",
          class: 'form-control',
          type: 'text',
          teg: 'select',
          options: [{id: 'chairman', select_name: 'Председатель'},
                    {id: 'deputy', select_name: 'Заместитель'},
                    {id: 'member', select_name: 'Член комиссии'},]
        },
         { key: "member",
          default: '',
          label: "Член",
          class: 'form-control',
          type: 'text',
          teg: 'select',
          options: []
        },
      ],
      commissions: {},
      commissionsMembers: [  ],
      commissionTypes: {},
      commissionType: null,
      isCommissionRequest: false,
      isEmployeeRequest: false,
      isCommissionTypeRequest: false,
      isMembersRequest: false,
    };
  },

  components: {
    TableEditor,
    AdvancedSelect
  },

  methods: {
    submit() {
    },
    getCommissions() {
      OrganisationService.getCommissions()
          .then(response => {
            response.data.forEach(item => { this.commissions[item.commission_type] = item.id; });
            this.isCommissionRequest = true;
          })
          .catch(error => {console.log(error);}
          );
    },
    getEmployees() {
      OrganisationService.getEmployees().then(
          (response) => {
            response.data.forEach((item) => {
              this.fields[1].options.push(
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
    getCommissionTypes() {
      OrganisationService.getCommissionTypes()
          .then(response => {
            response.data.forEach(element => this.commissionTypes[element.id] = element.value);
            this.isCommissionTypeRequest = true;
          })
          .catch(error => {
                console.log(error);
              }
          );
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
      this.isMembersRequest = false;
      this.commissionType = this.$route.params.uid;
      this.getCommissionMembers();
      this.getCommissions();
    }
  },

  mounted() {
    this.getCommissionTypes();
    this.getCommissions();
    this.getCommissionMembers();
    this.getEmployees();
  },
};

</script>
