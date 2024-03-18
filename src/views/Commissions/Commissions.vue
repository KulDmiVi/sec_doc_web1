<template>
  <h4>Коммисии</h4>
  <div v-for="value, key in commissionTypes">


    <template v-for="value1, key1 in commissions[key]">
      <button style="border:none;"  @click="editCommission(value1.id)">
        <img src="/src/components/icons/2931178_creative_edit_pencil_change_draw_design_pen.svg" alt="Редактировать"  width="20" height="20">
      </button>
      {{value}}

    </template>


  </div>
</template>

<script>

import OrganisationService from "@/services/organisation.service";
import router from "@/router";
export default {
  name: "Commissions",
  data() {
    return {
      commissionTypes: {},
      commissions: {},
      isCommissionsTypesRequest: false,
      isCommissionsRequest: false,
    };
  },

  methods: {
    getCommissionTypes() {
      OrganisationService.getCommissionTypes().then(
          (response) => {
            var index, response_data;
            response_data = response.data;
            this.isCommissionsTypesRequest = true;
            for (index = 0; index < response_data.length; index++){
              this.commissionTypes[response_data[index].id] = response_data[index].value;
            }
          },
          (error) => {console.log(error);}
      );
    },

    editCommission(id){
      router.push({ path: '/commission/'+id})
    },

    getCommissions(){
      OrganisationService.getCommissions().then(
          (response) => {
            var response_data, index, commission_item=[];
            response_data = response.data;
            for (index = 0; index < response_data.length; index++){
               commission_item = this.commissions[response_data[index].commission_type];
              if (commission_item === undefined){
                this.commissions[response_data[index].commission_type] = [response_data[index]];
              } else {
                this.commissions[response_data[index].commission_type].push([response_data[index]])
              }
            }
            this.isCommissionsRequest = true;
          },
          (error) => {console.log(error);}
      );
    }
  },

  mounted() {
    this.getCommissionTypes();
    this.getCommissions();
  },
}
</script>

<style scoped>

</style>