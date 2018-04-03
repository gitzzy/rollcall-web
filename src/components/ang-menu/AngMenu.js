export default {
  name: 'ang-menu',
  props: {
    menuData: Array,
    roomCount: Number,
  },
  data() {
    return {
      toJSON: '',
      allRoomStatus: false,
      statusArr: [],
      checkedIndex: 0,
      showHeight: 800,
      menuListHeight: 0,
      menuHeight: 99,
      menuStyle: {
        marginTop: '0px'
      }

    }
  },
  methods: {
    checkMenu: function(index, id) {
      this.statusArr = this.$store.get('statusArr');
      this.checkedIndex = index;
      this.$emit('listenClick', id);
    },
    moveBottom: function() {
      // 列表总高度
      this.menuListHeight = this.menuHeight * this.menuData.length;
      // 截取marginTop的数字部分并转换成整形
      let margin = parseInt(this.menuStyle.marginTop.slice(0, this.menuStyle.marginTop.length-2));
      // 已滚动的高度
      let scrollHeight = this.showHeight - margin;
      // 如果已经滚动的高度大于整个列表的高度，那么返回空，否则将滚动的数值给菜单项
      if (scrollHeight > this.menuListHeight) {
        return;
      } else {
        this.menuStyle.marginTop = margin - this.menuHeight + 'px';
      }

    },
    moveTop: function() {
      // 截取marginTop的数字部分并转换成整形
      let margin = parseInt(this.menuStyle.marginTop.slice(0, this.menuStyle.marginTop.length-2));
      // 如果已经滚动的高度大于整个列表的高度，那么返回空，否则将滚动的数值给菜单项
      if (margin === 0) {
        return;
      } else {
        this.menuStyle.marginTop = margin + this.menuHeight + 'px';
      }
    }
  }
}
