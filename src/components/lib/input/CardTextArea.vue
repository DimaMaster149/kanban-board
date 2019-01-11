<template>
  <textarea ref="textarea"
    v-bind="attrs"
    class="text-area"
    :value="value"
    @input="$emit('input', $event.target.value);"
    :class="{ error }"
    :rows="rows"
    :cols="cols"
    :readonly="disabled"
    >
  </textarea>
</template>

<script>
export default {
  name: 'text-area',
  methods: {
    focus() {
      console.log('focusArea')
      this.$refs.textarea.focus();
    }
  },
    computed: {
     attrs(){
      return{
        ...this.$attrs
      }
    },
    rows(){
      return Math.max(1, this.value.split("\n").length)
    },
    cols(){
      let cols = 20;
      const rows = this.value.split("\n").map(row => {
        if(row.length>cols) cols=row.length + 3
      })
      return cols;
    }
  },
  props: {
    value: {
      required: false,
      type: String,
      default:''
    },
    error: {
      type: Boolean,
      default: false
    },
    disabled:{
      required:false,
      type:Boolean,
      default:false
    },
    focused:{
      required:false,
      type:Boolean,
      default:false
    }
  },
};
</script>

<style scoped>
  .text-area{
    width:100%;
    background:white;
    border:none;
    height:auto;
    resize: none;
    border-radius: 8px;
    margin-left:2px;
    cursor:pointer;
    user-select: none;
  }
  .text-area:focus, .text-area:active{
    border:none;
    outline-color: none;
  }
</style>
