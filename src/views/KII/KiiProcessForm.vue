<template>

  <h4>Процесс КИИ</h4>
  <div class="mb-1">
    <label for="username">Наименование процесса </label>
    <div class="input-group">
      <input type="text" class="form-control" id="process_name" v-model="kii_process.name">
    </div>
  </div>
  <div class="mb-1">
    <label>Функции (полномочия) или виды деятельности</label>
    <div class="input-group">
      <input type="text" class="form-control" id="process_function" v-model="kii_process.function">
    </div>
  </div>

  <TreeItem
      v-for="node_item in incident_damages"
      v-bind:node_item="node_item"
      v-bind:nodes="node_item.childs"
      v-bind:checked_nodes="selected_damage"
   />
</template>


<script>
  import UserService from "../../services/organisation.service";
  export default {
    name: "kii_process",
    data() {
      return {
        isRequest: false,
        kii_process: { },
        selected_damage: [],
        incident_damages: {}
      };
    },
    methods: {
      add_process() {
        this.$emit("add_process", this.kii_process);
      },

      get_process() {
        this.isRequest = true
      },

      getKiiIncidentDamages(){
        this.incident_damages = JSON.parse(localStorage.getItem("incident-damages"))
      },
    },
    mounted(){
      this.get_process();
      this.getKiiIncidentDamages();
    },
  };
</script>
