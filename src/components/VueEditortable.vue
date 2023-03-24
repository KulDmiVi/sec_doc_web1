<template>
  <div>
    <table class="table table-striped">
      <thead>
      <tr>
        <th  v-for="field in fields" id="{{field.key}}">{{field.label}}</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, item_index) in items">
        <td v-for="field in fields">
          <input v-if="item.isEdit" v-model="item[field.key]">
          <span v-else>{{item[field.key]}}</span>
        </td>
        <td id="action">
          <button @click="editRowHandler(item_index)">
            <span v-if="!item['isEdit']">Редактировать</span>
            <span v-else>Сохранить</span>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    // return {
    //   fields: [
    //     { key: "name", label: "Name"},
    //     { key: "department", label: "Department" },
    //     { key: "age", label: "Age" },
    //     { key: "dateOfBirth", label: "Date Of Birth" },
    //     { key: 'edit', label: ''}
    //   ],
    //   items: [
    //     { age: 40, name: 'Dickerson', department: 'Development', dateOfBirth: '1984-05-20' },
    //     { age: 21, name: 'Larsen', department: 'Marketing', dateOfBirth: '1984-05-20' },
    //     { age: 89, name: 'Geneva', department: 'HR', dateOfBirth: '1984-05-20' },
    //     { age: 38, name: 'Jami', department: 'Accounting', dateOfBirth: '1984-05-20' }
    //   ],
    // };
  },
  props: {
    fields: Array,
    items: Array,


  },
  mounted() {
    this.items = this.items.map(item => ({...item, isEdit: false}));
  },
  methods: {
    editRowHandler(item_index) {
      console.log(item_index)

      this.items[item_index].isEdit = !this.items[item_index].isEdit;
    }
  }
}
</script>

<style>
#app {
  text-align: center;
  margin: 60px;
}
thead, tbody, tfoot, tr, td, th {
  text-align: left;
  width: 100px;
  vertical-align: middle;
}
pre {
  text-align: left;
  color: #d63384;
}
</style>