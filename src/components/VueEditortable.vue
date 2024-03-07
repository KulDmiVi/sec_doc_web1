<template>
  <div>
    <button class="btn btn-primary" @click="addTableRow">Добавить</button>
    <div class="col-md-10 order-md-1">
      <table class="table table-striped">
        <thead>
          <tr>
            <th v-for="field in fields" id="{{field.key}}">{{field.label}}</th>
            <th></th>
          </tr>
        </thead>
       <tbody v-if="table_items">
    <tr v-for="(item, item_index) in table_items">
      <td v-for="field in fields">
        <input v-bind:class="field.class"
               v-if="item.property['isEdit'] && field['teg']==='input' &&  field['list']"
               :type="field.type"
               v-model="item.data[field.key]"
               :list = "field['list']">
        <datalist v-if="item.property['isEdit'] && field['teg']==='input' &&  field['list']"
                  :id="field['list']">
          <option v-for="option in field.options" :value="option.id">{{option.name}}</option>
        </datalist>

        <input v-else-if ="item.property['isEdit'] && field['teg']==='input'"
               :class="field.class"
               :type="field.type"
               v-model="item.data[field.key]">

        <select v-else-if="item.property['isEdit'] && field['teg']==='select'"
                class="form-select"
                v-model="item.data[field.key]">
          <option v-for = 'option in field.options' v-bind:value="option.id" >{{option.select_name}}</option>
        </select>
        <AdvancedSelect
            v-else-if="item.property['isEdit'] &&  field['teg']==='AdvancedSelect'"
            :options="field.options"
            :value="item.data[field.key]"
            v-model="item.data[field.key]"
            class="select"
        />
        <span v-else>{{item.data[field.key]}}</span>
      </td>
      <td id="action">
        <button v-show="item.property['showUpdateButton']" style="border:none;"  @click="updateTableRow(item_index)">
          <img src="./icons/2931176_diskette_disk_usb_drive_guardar_save_floppy.svg" alt="Сохранить"  width="20" height="20">
        </button>
        <button v-show="item.property['showAddButton']" style="border:none;"  @click="saveTableRow(item_index)">
          <img src="./icons/2931176_diskette_disk_usb_drive_guardar_save_floppy.svg" alt="Сохранить"  width="20" height="20">
        </button>
        <button v-show="item.property['showEditButton']"  style="border:none;" @click="editTableRow(item_index)">
          <img src="./icons/2931178_creative_edit_pencil_change_draw_design_pen.svg" alt="Редактировать"  width="20" height="20">
        </button>
        <button v-show="item.property['showDeleteButton']"  style="border:none;"  @click="deleteTableRow(item_index)">
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
import AdvancedSelect  from '@/components/AdvancedSelect.vue'

export default {
  name: "App",
  components: {
    AdvancedSelect,
  },

  props: {
    enableEditForm: Boolean,
    fields: Array,
    items: Array,
  },

  data() {
    return {
      table_items: [],
      empty_record: {}
    };
  },




  methods: {
    editTableRow(index) {
      const { property, id } = this.table_items[index];
      if (!this.enableEditForm) {
        property.showEditButton = false;
        property.showAddButton = false;
        property.showUpdateButton = true;
        property.isEdit = !property.isEdit;
       }
      else {
        this.$emit("showForm", index);
      }
    },

    updateTableRow(index) {
      const item = this.table_items[index];
      item.property.isEdit = !item.property.isEdit;
      item.property.showEditButton = true;
      item.property.showAddButton = false;
      item.property.showUpdateButton = false;
      this.$emit("updateRow", item.data);
    },

    addTableRow() {
      if (!this.enableEditForm) {
        const newRow = JSON.parse(JSON.stringify(this.empty_record))
        newRow.property = {
          showAddButton: true,
          showEditButton: false,
          showDeleteButton: true,
          showUpdateButton: false,
          isEdit: true
        };
        this.table_items.push(newRow);
      }
      else {
          let id = null;
          this.$emit("showForm", id);
      }

    },

    saveTableRow(index) {
      const item = this.table_items[index];
      item.property.isEdit = false;
      item.property.showEditButton = true;
      item.property.showAddButton = false;
      item.property.showUpdateButton = false;
      this.$emit("saveRow", item.data);
    },

    deleteTableRow(index) {
      const item = this.table_items[index].data;
      this.$emit("deleteRow", item);
      this.table_items.splice(index, 1);
    },
  },


  created() {
    this.items.forEach(item => {
      this.table_items.push({
        data: {...item},
        property: {
          isEdit: false,
          showAddButton: false,
          showUpdateButton: false,
          showEditButton: true,
          showDeleteButton: true
        }
      });
    });

  },

  mounted() {



    this.empty_record = {
      data: Object.fromEntries(this.fields.map(field => [field.key, field.default])),
      property: {
        isEdit: true,
        showAddButton: false,
        showUpdateButton: true,
        showEditButton: false,
        showDeleteButton: true
      }
    }
  },
}
</script>

