<template>
  <h4>Ответственные</h4>

  <div v-for="responsible in responsibilitiesTypes">
      <button style="border:none;"  @click="editResponsible(responsible.id)">
        <img src="/src/components/icons/2931178_creative_edit_pencil_change_draw_design_pen.svg" alt="Редактировать"  width="20" height="20">
      </button>
      {{responsible.value}}
  </div>

</template>

<script>

import OrganisationService from "@/services/organisation.service";
import router from "@/router";
export default {
  name: "Commissions",
  data() {
    return {
      responsibilitiesTypes: {},
      isResponsibilitiesTypesRequest: false,
    };
  },

  methods: {

    getResponsibilitiesTypes() {
      OrganisationService.getRbResponsibilities().then(
          (response) => {
              this.responsibilitiesTypes= response.data;
          },
          (error) => {console.log(error);}
      );
    },


    editResponsible(type_id){
      router.push({ path: '/responsible/'+type_id})
    },

  },

  mounted() {
    this.getResponsibilitiesTypes();
  },
}
</script>

<style scoped>

</style>