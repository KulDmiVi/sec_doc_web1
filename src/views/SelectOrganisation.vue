<template>
  <div class="container">
    <form class="form-horizontal col-sm-8"  @submit.prevent="submit">
      <h3> Выберите организацию</h3>
      <br>
      <div class="form-group">
        <select class="form-control required organisation" data-placement="top" data-trigger="manual" v-model="current_organisation">
          <option v-for="organisation in organisations" v-bind:value="organisation">{{organisation.full_name}}</option>
        </select>
      </div>
      <br>
      <div class="form-group ">
        <button type="submit" class="btn btn-primary float-end" >Выбрать</button>
      </div>
    </form>
  </div>
</template>


<script>
import UserService from "@/services/organisation.service";
import EventBus from "@/common/EventBus";

export default {
  name: 'select_organisation',
  data() {
    return {
      organisations: [
      ],
      current_organisation: '',
    }
  },
  methods: {
    submit() {
      let user = JSON.parse(localStorage.getItem("user"));
      user.organisation = this.current_organisation.id;
      localStorage.setItem("user", JSON.stringify(user));
      this.$router.push({name: "organisation"})
    }
  },
  mounted() {
    UserService.getOrganisations().then(
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
  },
}
</script>
