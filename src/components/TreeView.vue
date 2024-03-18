<template>
<ul>
  <li>
    <input v-if="!isFolder" type="checkbox" @change = "check_item(node_item.id)"/>
    {{node_item.value}}
  </li>
  <TreeItem
      v-for="node_item in nodes" id="node_item.id"
      v-bind:node_item="node_item"
      v-bind:nodes="node_item.childs"
      v-bind:checked_nodes = "checked_nodes"
  />

</ul>
</template>

<script>
export default {
  name: "TreeItem",
  props: {
    nodes: Object,
    node_item: Object,
    checked_nodes: Array,
  },

  methods: {
    check_item(){
      if(this.checked_nodes.includes(this.node_item.id)){
        this.checked_nodes.splice(this.checked_nodes.indexOf(this.node_item.id), 1);
      }
      else{
        this.checked_nodes.push(this.node_item.id);
      }
      this.$emit('TEST1')
    },
  },

  computed: {
    isFolder() {
      return this.node_item.childs.length;
    },
  },
}
</script>