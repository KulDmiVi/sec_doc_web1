<template>
  <h4>Коммисии</h4>

  <table>
    <tr v-for="(type, key) in commissionTypes">
      <td>{{type}}</td>
      <td>
        <button style="border:none;"  @click="editCommission(key)">
          <img src="/src/components/icons/2931178_creative_edit_pencil_change_draw_design_pen.svg" alt="Редактировать"  width="20" height="20">
        </button>
      </td>
    </tr>
  </table>
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


  },

  mounted() {
    this.getCommissionTypes();
  },
}
</script>

<style scoped>

</style>