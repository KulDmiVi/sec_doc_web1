<template>
  <ul>
    <li v-if="item &&  isFolder">{{item.value}}</li>
    <tree_item
      v-for="child in item_childs"
      v-bind:item_childs="child.childs"
      :item = "child" />
    <li v-if="item &&  !isFolder">
      <input
          type="checkbox"
          id="jac"
          value = "mike"
          v-model = "selected_list"
          @change="check1(item.id)"
      />
      {{item.id}} {{item.order}} {{item.value}}</li>
  </ul>
</template>

<script>
export default {
  name: "tree_item",
  props: {
    item_childs: Object,
    item: Object,
    checked_values:Array
  },
  data() {
    return {
      isOpen: true,
      selected_list: [],
    };
  },


  methods: {

    check1(item_id) {
      console.log(item_id);
      this.$emit("changeCheck1");
      console.log("vsdfgfsdfggfgf");
    },

    makeFolder() {
      if (!this.isFolder) {
        this.$emit("make-folder", this.item);
        this.isOpen = true;
      }
    }
  },
  created() {
    this.selected_list = this.checked_values
  },


computed: {
  isFolder() {
    return  this.item.childs.length;
  }
},

}
</script>

<style>
   body {
    font-family: Menlo, Consolas, monospace;
    color: #444;
  }
  .item {
    cursor: pointer;
  }
  .bold {
    font-weight: bold;
  }
  ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: none;
  }
</style>
