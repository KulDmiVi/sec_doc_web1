<template>

  <div>
    <button class="btn btn-primary" @click="add_row">Добавить</button>
    <div class="col-md-10 order-md-1">


      <table class="table table-striped">
    <thead>

    <tr>
      <th v-for="field in fields" id="{{field.key}}">{{field.label}}</th>
      <th></th>
    </tr>
    </thead>
    <tbody v-if="this.table_items">
    <tr v-for="(item, item_index) in this.table_items">
      <td v-for="field in fields">

        <input v-if="item['isEdit'] && field['teg']==='input'" :class="field.class" :type="field.type" v-model="item[field.key]"  :list = "field['list']">
          <datalist :id="field['list']">
            <option v-for="value in field['datalist']" :value="value"></option>
          </datalist>


        <select   v-else-if="item['isEdit'] && field['teg']==='select'" class="form-select"  v-model="item[field.key]">
          <option v-for = 'option in field.options' v-bind:value="option.id" >{{option.name}}</option>
        </select>

        <span v-else :enabled = "!item['isEdit'] " >{{item[field.key]}}</span>

      </td>
      <td>

      </td>
      <td id="action">
        <button :class="item['btnClass']"  @click="editRowHandler(item_index)">
          <span v-if="!item['isEdit']">Редактировать</span>
          <span v-else>Сохранить</span>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
    </div>
  </div>

</template>

<script>
export default {
  name: "App",
  components: {},

  data() {
    return {
      isAdded: false,
      table_items: JSON.parse(JSON.stringify(this.items)),
      empty_record: {}
    };
  },

  props: {
    enableEditForm: Boolean,
    fields: Array,
    items: Array,
  },


  methods: {
    editRowHandler(item_index) {
      if (this.enableEditForm){
        this.$emit("showForm", this.items[item_index].id)
      }
      else {
        this.table_items[item_index].isEdit = !this.table_items[item_index].isEdit;
        if (this.table_items[item_index].isEdit) {
          this.table_items.map(item => item['btnClass'] = "btn btn-primary disabled");
          this.table_items[item_index].btnClass = "btn btn-primary"
        } else {
          this.table_items.map(item => item['btnClass'] = "btn btn-primary");
          if(!this.isAdded) {
            this.$emit("patchData", this.table_items[item_index])
          }else{
            let row_data = {}
            let index = ''
            for(index in this.fields){
              row_data[this.fields[index]['key']] = this.table_items[item_index][this.fields[index]['key']]
            }
            console.log(this.fields)
            console.log(this.table_items)
           this.$emit("addRow", row_data)
           this.isAdded = false
          }
        }
      }
    },

    add_row() {
      this.isAdded = true
      this.table_items.push(JSON.parse(JSON.stringify(this.empty_record)));
    }

  },

  created() {
    this.table_items = this.table_items.map(item => ({...item, isEdit: false, btnClass: "btn btn-primary "}));
  },

  mounted() {
    for (let elem in this.fields){
      this.empty_record[elem.key] = '';
    }
    this.empty_record['isEdit'] = true
    this.empty_record['btnClass'] = "btn btn-primary"
  },


}
</script>

