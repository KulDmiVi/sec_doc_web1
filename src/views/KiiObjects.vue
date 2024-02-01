<template>
  <h2 v-if="isCommissionRequest && isCommissionTypeRequest">{{commissionTypes[commissionType] }}</h2>
  <label>Объекты КИИ</label>
  <TableEditor
      v-if="isKiiObjectsRequest"
      v-bind:fields="fields"
      v-bind:items="KiiObjectsData"
      v-bind:enableEditForm=true
      @showForm="showEditForm"
      @saveRow="addKiiObject"
      @updateRow="updateKiiObject"
      @deleteRow="deleteKiiObject"
  />
</template>

<script>
import TableEditor from '@/components/VueEditortable.vue'
import OrganisationService from "@/services/organisation.service";
import AdvancedSelect from '@/components/AdvancedSelect.vue';
import router from "@/router";
export default {
  name: "kii_objects",
  data() {
    return {
      employees: [],
      fields: [
        { key: "name", label: "Наименование", class: 'form-control', type: 'text', teg: 'input'},
        { key: "INN", label: "ИНН", class: 'form-control', type: 'text', teg: 'input'},
        { key: "type", label: "Тип", class: 'form-control', type: 'text', teg: 'input'},
      ],
      KiiObjectsData: [],
      isKiiObjectsRequest: false,

    };
  },

  components: {
    TableEditor,
    AdvancedSelect
  },

  methods: {
    showEditForm(row_id){
      router.push({ path: '/employees' })
      console.log(row_id)
    },

    getKiiObjects() {
      OrganisationService.getKiiObjects()
          .then(response => {
            response.data.forEach(item => {
              this.KiiObjectsData.push(
                  {
                    name: item.name,
                    INN: item.name,
                    type: item.name,
                  }

            ) });
            this.isKiiObjectsRequest = true;
          })
          .catch(error => {console.log(error);}
          );
    },
    addKiiObject(){   },
    updateKiiObject(){    },
    deleteKiiObject(){    },
  },



  mounted() {
    this.getKiiObjects();
  },
};

</script>
