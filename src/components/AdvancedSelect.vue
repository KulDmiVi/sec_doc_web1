<template>
  <div class="custom-select"  v-click-outside= "hideWidget">
    <div class="selected form-control" :class="{open: open }" @click="open = !open">
      <input type="text" class="form-control"  v-model="selected" ref="myInput" @input="onInput"  style="border:none;" />
    </div>
    <div class="items form-control" :class="{selectHide: !open}">
      <div v-if="options.length !== 0" class="select-item" v-for="(option, i) of options" :key="i" @click="onSelect(option)">
        {{option}}
      </div>
    </div>
  </div>
</template>


<script>

export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: null,
    },
  },

  data() {
    return {
      selected: this.value ? this.value : (this.options.length > 0 ? this.options[0] : ''),
      open: false,
    };
  },

  methods: {

    hideWidget(){
      if(this.open === true){
        this.open=false
      }
    },

    onSelect(option) {
      this.setOption(option);
      this.$refs.myInput.focus();
    },

    setOption(option) {
      this.selected = option;
      this.open = false;
    },

   // onInput(event) {
      //const value = event.target.value;
      //const option = this.options.find(option => option.toLowerCase().startsWith(value.toLowerCase()));
      //if (option) {
      //  this.setOption(option);
     // }
    //},
  },


  watch: {
    selected(newValue, oldValue) {
      if (newValue!== oldValue) {
        this.$emit('update:modelValue', this.selected);
      }
    },
  },
};
</script>

<style scoped>
.custom-select .items {
  position: absolute;
  z-index: 9998;
  background-color: white;
  border: 2px solid black;
}
.select-item {
  position: relative;
  z-index: 9999; /* или любое достаточно высокое значение */
  background-color: white;

}
.custom-select .items .select-item:hover {
  background-color: cornflowerblue;
}

.selectHide {
  display: none;
}
</style>