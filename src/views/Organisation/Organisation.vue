<template>
      <div class="row">
        <div class="col-md-10 order-md-1">
          <div class="mb-1"> {{this.organisation}}</div>
          <h4 class="mb-1">Сведения об организации</h4>
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
              <label for="username">Хозяйствующий субъект</label>
              <div class="input-group">
                <input type="text" class="form-control" id="business_entity" v-model="organisation.business_entity">
              </div>
            </div>

            <div class="mb-1">
              <label for="username">Условное наименование</label>
              <div class="input-group">
                <input type="text" class="form-control" id="usl_name" required="">
              </div>
            </div>

            <div class="mb-1">
              <label for="username">Тип организации</label>
              <div class="input-group">
                <input type="text" class="form-control" id="type"  v-model="organisation.type">
              </div>
            </div>
            <div class="mb-1">
              <label for="username">Учредительный документ</label>
              <div class="input-group">
                <input type="text" class="form-control" id="foundation_document"  v-model="organisation.foundation_document">
              </div>
            </div>
            <div class="mb-1">
              <label for="username">Сфера деятельности организации</label>
              <div class="input-group">
                <input type="text" class="form-control" id="field_activity" required=""  v-model="organisation.field_activity">
              </div>
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
import UserService from "../../services/organisation.service";
import EventBus from "../../common/EventBus";
export default {
  name: "organisation",
  data() {
    return {
      organisation: {},
    };
  },
  methods: {
    submit() {
      UserService.patchOrganisation(this.$route.params.org_uid, this.organisation).then(
          (response) => {
            this.organisations = response.data;
          },
          (error) => {
            this.content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            if (error.response && error.response.status === 403) {
              EventBus.dispatch("logout");
            }
          }
      );


    }
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    UserService.getOrganisation(user.organisation).then(
        (response) => {
          this.organisation = response.data;
        }
    );
  },
};

</script>
