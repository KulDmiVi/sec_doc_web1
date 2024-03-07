<template>
<ul>
  <li> {{item_value}}</li>
  <TreeItem v-for="node_item in nodes" id="node_item.id" v-bind:item_value="node_item.value" v-bind:nodes="node_item.childs"/>

</ul>
</template>

<script>
export default {
  name: "TreeItem",
  props: {
    nodes: Object,
    item_value: ''
  },

}
</script>