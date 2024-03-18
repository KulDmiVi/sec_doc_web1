<template>
      <h1>Сведения об организации</h1>
      <div class="row" v-if="isOrganisatonRequest">
        <div class="col-md-10 order-md-1">
          <form class="needs-validation"  @submit.prevent="submit">
            <div class="mb-1">
              <label for="username">Полное наименование</label>
              <div class="input-group">
                <input type="text" class="form-control" id="full_name" required=""  v-model="organisation.full_name">
              </div>
            </div>
            <div class="mb-1" >
              <label for="username">Сокращенное наименование</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>
            <div class="row mb-1" >
              <div class="col-md-6 ">
                <label for="firstName">ИНН</label>
                <input type="text" class="form-control" id="INN" v-model="organisation.INN">
              </div>
              <div class="col-md-6">
                <label for="lastName">КПП</label>
                <input type="text" class="form-control" id="KPP" v-model="organisation.KPP">
              </div>
            </div>
            <div class="mb-1">
              <label for="org_names_choice">Хозяйствующий субъект</label>
              <input  class="form-control"
                      list="organisation-names"
                      id="org_names_choice"
                      name="org_names_choice"
                      v-model="organisation.business_entity"
              >
              <datalist id="organisation-names">
                <option
                    v-for ="org_name in names"
                    :value = org_name>
                </option>
              </datalist>
            </div>
            <div class="mb-1">
              <label for="org_types_choice">Тип организации</label>
              <input
                  class="form-control"
                  list="organisation-types"
                  id="org_types_choice"
                  name="org_types_choice"
                  v-model="organisation.type">
              <datalist id="organisation-types">
                <option v-for ="org_type in types" :value = org_type></option>
              </datalist>
            </div>
            <div class="mb-1">
              <label for="org_foundation_document">Учредительный документ</label>
              <input
                  class="form-control"
                  list="foundation-document"
                  id="org_foundation_document"
                  name="org_foundation_document"
                  v-model="organisation.foundation_document">
              <datalist id="foundation-document">
                <option v-for ="foundation_doc in foundation_documents" :value = foundation_doc></option>
              </datalist>
            </div>
            <div class="mb-1">
              <label for="org_sphere">Сфера деятельности организации</label>
              <input
                  class="form-control"
                  list="org-sphere"
                  id="org_sphere"
                  name="org_sphere"
                  v-model="organisation.field_activity">
              <datalist id="org-sphere">
                <option v-for ="field_activity in field_activities" :value = field_activity></option>
              </datalist>
            </div>
            <div class="mb-1">
              <label for="username">Населенный пункт, в котором расположена организация</label>
              <div class="input-group">
                <input type="text" class="form-control" id="locality"  v-model="organisation.locality">
              </div>
            </div>
            <div class="mb-1">
              <label for="username">Юридический адрес</label>
              <div class="input-group">
                <input type="text" class="form-control" id="legal_address"  v-model="organisation.legal_address">
              </div>
            </div>
            <div class="mb-1">
              <label for="username">Фактический адрес организации</label>
              <div class="input-group">
                <input type="text" class="form-control" id="actual_address"  v-model="organisation.actual_address">
              </div>
            </div>
            <div class="mb-1">
              <label for="username">Тип распорядительного документа</label>
              <div class="input-group">
                <input type="text" class="form-control" id="administrative_document"  v-model="organisation.administrative_document">
              </div>
            </div>
            <div class="mb-1">
              <label for="username">Руководитель</label>
              <div class="input-group">
                <input type="text" class="form-control" id="chief"  v-model="organisation.chief">
              </div>
            </div>
            <div class="mb-1">
              <div class="offset-md-10">
                <button class="btn btn-primary btn-lg btn-block" type="submit">Сохранить</button>
              </div>
            </div>
          </form>
        </div>
      </div>
</template>

<script>
import UserService from "../../services/organisation.service";

export default {
  name: "organisation",
  data() {
    return {
      isOrganisatonRequest: false,
      organisation: {},
      names: [],
      types: [],
      foundation_documents: [],
      field_activities: [],

    };
  },
  methods: {
    submit() {
      UserService.patchOrganisation(this.organisation).then(
          (response) => {
            this.organisations = response.data;
          },
          (error) => {console.log(error);}
      );
    },

    getOrganisation(){
      let organisation = localStorage.getItem("organisation");
      UserService.getOrganisation(organisation).then(
          (response) => {
            this.organisation = response.data;
            this.isOrganisatonRequest = true;
          },
          (error) => {console.log(error);}
      );
    },

    getOrgNames(){
      let temp_data = JSON.parse(localStorage.getItem("org-names"));

      temp_data.forEach((item) => {
        this.names.push(item.value);
      });
    },

    getOrgTypes(){
      let temp_data = JSON.parse(localStorage.getItem("org-types"));
      temp_data.forEach((item) => {
        this.types.push(item.value);
      });
    },

    getFoundationDocuments(){
      let temp_data = JSON.parse(localStorage.getItem("foundation-documents"));
      temp_data.forEach((item) => {
        this.foundation_documents.push(item.value);
      });
    },

    getFieldActivities(){
      let temp_data = JSON.parse(localStorage.getItem("field-activities"));
      temp_data.forEach((item) => {
        this.field_activities.push(item.value);
      });
    },
  },

  mounted() {
    this.getOrganisation();
    this.getOrgNames();
    this.getOrgTypes();
    this.getFoundationDocuments();
    this.getFieldActivities();

  },
};

</script>
