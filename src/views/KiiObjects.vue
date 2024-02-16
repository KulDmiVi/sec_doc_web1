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
import RefBooksKii from "@/services/kii_refbooks.service";
import AdvancedSelect from '@/components/AdvancedSelect.vue';
import router from "@/router";
export default {
  name: "kii_objects",
  data() {
    return {
      employees: [],
      fields: [
        { key: "name", label: "Наименование", class: 'form-control', type: 'text', teg: 'input'},
        { key: "purpose", label: "Назначение", class: 'form-control', type: 'text', teg: 'input'},
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
      console.log(row_id)
      router.push({ path: '/kii_object/'+this.KiiObjectsData[row_id].uid  })

    },
    getKiiRefBooks(){
      new RefBooksKii()
    },
    getKiiObjects() {
      OrganisationService.getKiiObjects()
          .then(response => {
            response.data.forEach(item => {
              this.KiiObjectsData.push(
                  {
                    name: item.name,
                    purpose: item.purpose,
                    type: item.type,
                    uid: item.id,
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
    this.getKiiRefBooks();
    this.getKiiObjects();
  },
};

</script>
