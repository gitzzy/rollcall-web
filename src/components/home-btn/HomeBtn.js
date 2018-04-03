/**
 * Created by zzy's on 2018-02-07.
 */
export default {
  name: 'home-btn',
  props: {
    imgSrc: '',
    name: '',
    flag: '',
    isClick: Boolean
  },
  data() {
    return {
      toJSON: ''
    }
  },
  methods: {
    routerModule: function(url) {
      this.$emit('routerModule', url)
    }
  }
}
