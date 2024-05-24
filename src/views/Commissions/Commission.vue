<template>

  <label>Члены комиссии</label>
  <TableEditor
      v-if="isMembersRequest && isEmployeeRequest"
      v-bind:fields="fields"
      v-bind:items="commissionsMembers"
      v-bind:enableEditForm= false
      @saveRow="addCommissionMember"
      @updateRow="updateCommissionMember"
      @deleteRow="deleteCommissionMember"
  />


</template>

<script>
import TableEditor from '@/components/VueEditortable.vue'
import OrganisationService from "@/services/organisation.service";

export default {
  name: "commission",
  data() {
    return {
      employees: [],
      fields: [
        {
          key: "role",
          default: '',
          label: "Роль",
          class: 'form-control',
          type: 'text',
          teg: 'select',
          options: [{id: 'chairman', select_name: 'Председатель'},
                    {id: 'deputy', select_name: 'Заместитель'},
                    {id: 'member', select_name: 'Член комиссии'},]
        },
         {
           key: "member",
          default: '',
          label: "Член",
          class: 'form-control',
          type: 'text',
          teg: 'select',
          options: []
        },
      ],


      commissionsMembers: [],
      commission_uid: null,
      commissionType: null,
      isMembersRequest: false,
      isEmployeeRequest: false,
      commissionUsed: false,
    };
  },

  components: {
    TableEditor,
  },

  methods: {

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

    getCommissionMembers() {
      this.commissionsMembers = [];
      OrganisationService.getCommissionMembers().then(
          (response) => {
            response.data.forEach((item) =>{
              if (item.commission === this.commission_uid){
                       this.commissionsMembers.push(item)
              }
            });
            this.isMembersRequest = true;
          },
          (error) => { console.log(error);}
      )
    },

    addCommissionMember(data) {
      data['commission'] = this.commission_uid;
      OrganisationService.postCommissionMember(data)
    },

    updateCommissionMember(data) {
      OrganisationService.updateCommissionMember(data).then(
          (response) => {console.log(response)},
          (error) => {console.log(error)}
      )
    },

    deleteCommissionMember(data){
      console.log(data.id)
      OrganisationService.deleteCommissionMember(data.id).then(
        (response) => {console.log(response)},
        (error) => {console.log(error)}
    )
    },

    getCommissions(){
      OrganisationService.getCommissions().then(
          (response) => {
            console.log(response.data)
            if (response.data.length!==0) {

              response.data.forEach((item) => {
                if (item.commission_type === this.$route.params.commission_uid) {
                  this.commission_uid = item.id
                  this.getCommissionMembers();
                  this.commissionUsed = true
                }

              })
              if(!this.commissionUsed){
                this.addCommission()
              }
            }
            else{
                  console.log("?????")
                  this.addCommission()

            }


            },
          (error) => {console.log(error);}
      );
    },

    addCommission(){
      OrganisationService.postCommissions({commission_type: this.$route.params.commission_uid}).then(
          (response) => {console.log('good');},
          (error) => {console.log(error);}
      );
    }
  },


  mounted() {
    this.getCommissions();
    this.getEmployees();
  },
};

</script>
