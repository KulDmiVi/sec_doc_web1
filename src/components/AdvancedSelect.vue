<template>
  <div class="custom-select col-md-10" :tabindex="tabindex" @blur="open = false">
    <div class="selected form-control" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items form-control" :class="{ selectHide: !open }">
      <div><input type="text" id="name" name="name" ></div>
      <div
          v-for="(option, i) of options"
          :key="i"
          @click="selected = option;  open = false; $emit('input', option);"
      >
        {{ option }}
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
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
          ? this.default
          : this.options.length > 0
              ? this.options[0]
              : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
};
</script>

<style scoped>

/*.custom-select {*/
/* position: relative;*/
/*!*  width: 100%;*!*/
/*!*  text-align: left;*!*/
/*!*  outline: none;*!*/
/*!*  height: 47px;*!*/
/*!*  line-height: 47px;*!*/
/*}*/

/*.custom-select .selected {*/
/*  height: 47px;*/

/*  !*background-color: #0a0a0a;*!*/
/*  border-radius: 6px;*/
/*  border: 1px solid #666666;*/
/*  !*color: #fff;*!*/
/*  padding-left: 1em;*/
/*  cursor: pointer;*/
/*  user-select: none;*/
/*}*/

/*.custom-select .selected.open {*/
/*  border: 1px solid #ad8225;*/
/*  border-radius: 6px 6px 0px 0px;*/
/*}*/

/*.custom-select .selected:after {*/
/*  position: absolute;*/
/*  content: "";*/
/*  top: 22px;*/
/*  right: 1em;*/
/*  width: 0;*/
/*  height: 0;*/
/*  border: 5px solid transparent;*/
/*  border-color: #fff transparent transparent transparent;*/
/*}*/

.custom-select .items {

  position: absolute;
  background-color: white;

}

/*.custom-select .items div {*/
/*  color: #fff;*/
/*  padding-left: 1em;*/
/*  cursor: pointer;*/
/*  user-select: none;*/
/*}*/

.custom-select .items div:hover {
  background-color: #ad8225;
}

.selectHide {
 display: none;
}
</style>