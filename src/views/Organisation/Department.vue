<template>

    <div class="modal">
      <div class="row">
         <div class="col-md-12 order-md-1">
          <h4 class="mb-1">Подразделение</h4>
          <form class="needs-validation"  @submit.prevent="submit">
            <div class="mb-1">
              <label for="username">Наименование</label>
              <div class="input-group">
                <input type="text" class="form-control" id="full_name" required=""  v-model="department.name">
              </div>
            </div>
            <div class="mb-1" >
              <label for="username">Является филиалом</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="department.is_branch">
              </div>
            </div>
            <div class="row mb-1" >
              <div class="col-md-6 ">
                <label for="firstName">ИНН</label>
                <input type="text" class="form-control" id="INN" v-model="department.INN">
              </div>
              <div class="col-md-6">
                <label for="lastName">КПП</label>
                <input type="text" class="form-control" id="KPP" v-model="department.KPP">
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

</template>

<script>
import TableEditor from '@/components/VueEditortable.vue';

export default {
  name: "department",
  data(){
    return{
      isRequest: false,
      enableEditForm: false,
      department:{name: '', is_branch: '', INN: '', KPP: '' },
      fields: [
        { key: "name", label: "Наименование", class: 'form-control', type: 'text', teg: 'input' },
        { key: "address", label: "Адрес", class: 'form-control', type: 'text', teg: 'input'},
      ],

    };
  },
  props: {
    uid: String
  },
  components: {
    TableEditor,
  },

  methods: {

  },


};

</script>
<style scoped>


.modal {
  background-color: white;

  display: flex;
  justify-content: center;
}

</style>
