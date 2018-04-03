export default {
  name: 'alert',
  props: {
    isShow: Boolean,
    content: ''
  },
  data() {
    return {
      toJSON: ''
    }
  },
  methods: {
    close: function() {
      this.$emit('close')
    }
  }
}
