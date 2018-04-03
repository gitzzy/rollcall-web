export default {
  name: 'alert',
  props: {
    isShow: Boolean,
    content: Object,
    picData: Object,
    policeData: Object
  },
  data() {
    return {
      toJSON: '',
      picCount: 0,
      picList: [],
      flag: 0,
      picId: ''
    }
  },
  computed: {
    ulWidth: function () {
      this.picList = this.picData.picList;
      this.picCount = this.picList.length;
      return this.picCount * 202 + 'px';
    },
    scrollWidth: function () {
      return -(this.flag * 202) + 'px';
    }
  },
  methods: {
    close: function() {
      this.content.lastStatus = this.$store.get('policeLastStatus');
      this.$emit('close');
    },
    handleSelect: function(id) {
      this.picId = id
    },
    handleScroll: function (direct) {
      // 如果图片列表宽度小于等于容器宽度，那么不执行任何操作
      if (parseInt(this.ulWidth) <= 606) {
        this.$message({
          showClose: true,
          message: '没有更多图片了！'
        });
        return;
      }
      // 如果direct是1，则是向右滚动，否则是向左滚动
      if (direct === 1) {
        // 向右滚动flag+1
        this.flag = this.flag + 1;
        if (this.flag > this.picCount - 3) {
          this.flag = this.picCount - 3;

          this.$message({
            showClose: true,
            message: '已经是最后一张图片！'
          })
        }

      } else {
        // 向左滚动flag-1
        this.flag = this.flag - 1;
        if (this.flag < 0) {
          this.flag = 0;
          this.$message({
            showClose: true,
            message: '已经是第一张图片！'
          })
        }
      }

    },
    submitPolice: function () {
      let con = this.content;
      //循环对比警察列表的值，如果相等，则取出对应的key
      for (let val in this.policeData) {
        if (this.policeData[val] === con.lastStatus) {con.lastStatus = val;}
      }

      let singleData = [{
          loopId: con.loopId,
          id: con.id,
          lastStatus: con.lastStatus,
          userId: con.userId,
          recordId: this.picId
        }];

      this.$ajax({
        method: 'put',
        url: '/loop/save',
        data: singleData
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          if (res.content.status === true) {
            this.$message({
              showClose: true,
              message: res.content.tips,
              duration: 1000,
              type: 'success',
              onClose: () => {
                this.$emit('close');
                // 调用父级组件的查询方法
                this.$parent.getStatus();
              }
            })
          } else {
            this.$message({
              showClose: true,
              message: res.content.tips,
              type: 'warning'
            })
          }
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'warning'
          })
        }
      }).catch(err => {
        this.$message({
          showClose: true,
          message: '获取数据失败！',
          type: 'warning'
        })
      })
    }
  }
}
