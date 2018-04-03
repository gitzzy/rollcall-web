export default {
  name: 'nav-pills',
  props: {
    navData: Array
  },
  data() {
    return {
      toJSON: ''
    }
  },
  computed: {
    navClass: function() {
      if (this.navData.length > 1) {
        return 'more-nav'
      } else {
        return 'one-nav'
      }
    }
  }
}
