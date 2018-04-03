export default {
  name: 'system',
  data() {
    return {
      activePage: '/sys-manage/user'
    }
  },
  mounted: function() {
    let active = this.$store.get('activePage');
    this.activePage = typeof(active) !== 'undefined' ? active : '/sys-manage/user';
  },
  methods: {
    selectMenuItem: function (index) {
      this.$store.set('activePage', index)
    }
  }
}