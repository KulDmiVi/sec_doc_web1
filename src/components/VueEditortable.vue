<template>

  <div>
    <button class="btn btn-primary" @click="addRow">Добавить</button>
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
        <input v-if="item['isEdit'] && field['teg']==='input' &&  field['list']" :class="field.class" :type="field.type" v-model="item[field.key]"  :list = "field['list']">
        <datalist v-if="item['isEdit'] && field['teg']==='input' &&  field['list']"  :id="field['list']">
          <option class="form-control" v-for="value in field['datalist']" :value="value"></option>
        </datalist>

        <input v-else-if ="item['isEdit'] && field['teg']==='input' " :class="field.class" :type="field.type" v-model="item[field.key]">

        <select v-else-if="item['isEdit'] && field['teg']==='select'" class="form-select"  v-model="item[field.key]">
          <option v-for = 'option in field.options' v-bind:value="option.id" >{{option.name}}</option>
        </select>

        <span v-else :enabled = "!item['isEdit'] " >{{item[field.key]}}</span>
      </td>


      <td id="action" align="right">

        <button v-if="item['showUpdateButton']" style="border:none;"  @click="updateRow(item_index)">
          <img src="./icons/2931176_diskette_disk_usb_drive_guardar_save_floppy.svg" alt="Сохранить"  width="20" height="20">
        </button>

        <button v-if="item['showAddButton']" style="border:none;"  @click="saveRow(item_index)">
          <img src="./icons/2931176_diskette_disk_usb_drive_guardar_save_floppy.svg" alt="Сохранить"  width="20" height="20">
        </button>

        <button v-if="item['showEditButton']"  style="border:none;" @click="editeRow(item_index)">
          <img src="./icons/2931178_creative_edit_pencil_change_draw_design_pen.svg" alt="Редактировать"  width="20" height="20">
        </button>

        <button v-if="item['showDeleteButton']"  style="border:none;"  @click="deleteRow(item_index)">
          <img src="./icons/2931168_garbage_trash_bin_delete_remove.svg" alt="Удалить"  width="20" height="20" >
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
    editeRow(item_index) {
      if (this.enableEditForm){
        this.$emit("showForm", this.items[item_index].id)
      }
      else {
        this.table_items[item_index].showAddButton = false
        this.table_items[item_index].showUpdateButton = true
        this.table_items[item_index].showEditButton = false
        this.table_items[item_index].showDeleteButton = true
        this.table_items[item_index].isEdit = !this.table_items[item_index].isEdit
      }
    },

    updateRow(item_index) {
      this.table_items[item_index].isEdit = !this.table_items[item_index].isEdit
      this.table_items[item_index].showAddButton = false
      this.table_items[item_index].showUpdateButton = false
      this.table_items[item_index].showEditButton = true
      this.table_items[item_index].showDeleteButton = true
      this.$emit("updateRow",  this.table_items[item_index])
    },

    addRow() {
      let row_number = this.table_items.push(JSON.parse(JSON.stringify(this.empty_record)));
      this.table_items[row_number-1].showAddButton = true
      this.table_items[row_number-1].showUpdateButton = false
      this.table_items[row_number-1].showEditButton = false
      this.table_items[row_number-1].showDeleteButton = true
      this.table_items[row_number-1].isEdit = true
    },

    saveRow(item_index) {
      this.table_items[item_index].isEdit = false
      this.table_items[item_index].showAddButton = false
      this.table_items[item_index].showUpdateButton = false
      this.table_items[item_index].showEditButton = true
      this.table_items[item_index].showDeleteButton = true
      this.$emit("saveRow", this.table_items[item_index])
    },

    deleteRow(item_index) {
      this.$emit("deleteRow", this.table_items[item_index])
      this.table_items.splice(item_index, 1)
    },
  },

  created() {
    this.table_items = this.table_items.map(item => ({...item,
      isEdit: false,
      showEditButton: true,
      showDeleteButton: true,
      btnClass: "btn btn-primary "}));
  },

  mounted() {
    for (let elem in this.fields){
      this.empty_record[elem.key] = "";
    }
    this.empty_record['isEdit'] = true
    this.empty_record['btnClass'] = "btn btn-primary"
  },


}
</script>

