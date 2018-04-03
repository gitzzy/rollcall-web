import {AngMenu, AngRoom} from 'components'

export default {
  name: 'duty-query',
  components: {
    AngMenu,
    AngRoom
  },
  data() {
    return {
      form: {
        time: ''
      },
      isEnable: true,
      timeArr: [],
      showTime: [],

      addParams: {
        isEnable: '1',
        memo: '',
        rooms: []
      },
      areaId: '',
      roomsId: [],

      allData: [],
      roomsData: [],
      statusArr: [],
      areasName: '',
      isAllRoom: false,
      checkRoom: []
    }
  },
  created: function () {
    this.getData();
  },
  methods: {
    handleChange: function(value) {
      this.addParams.shift.id = value[0];

      let reg = new RegExp(':', 'ig');
      this.addParams.time = value[1].replace(reg, '');
    },
    getData: function() {
      this.$ajax({
        method: 'get',
        url: '/job/findArea',
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.allData = res.content;
          // console.log(this.allData);
          // 默认第一个监区下面的监室
          this.roomsData = res.content[0].rooms;
          this.areasName = res.content[0].name;
          this.areaId = res.content[0].id;

          res.content.forEach(item => {
            let statusObj = {
              id: item.id,
              status: false,
              roomCount: 0
            };
            this.statusArr.push(statusObj);
          });

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
    },
    showRooms: function (id) {
      this.allData.forEach(item => {
        if (item.id === id) {
          this.roomsData = item.rooms;
          this.areasName = item.name;
        }
      });

      // 记住全选按钮状态
      this.statusArr.forEach(item => {
        if (item.id === id) {
          this.isAllRoom = item.status;
        }
      });
      this.areaId = id;
      this.$store.set('menuId', id);
    },
    // 全选
    checkAll: function() {
      this.isAllRoom = !this.isAllRoom;
      if (this.isAllRoom) {
        this.roomsData.forEach(item => {
          item.status = 0;
        });
      } else {
        this.roomsData.forEach(item => {
          item.status = 1;
        });
      }

      // 记住全选按钮状态
      this.statusArr.forEach(item => {
        let id = this.$store.get('menuId');
        if (item.id === id) {
          item.status = this.isAllRoom;
        }
      });

    },
    // 点击监室
    getRoomCount: function() {
      this.setAllCheck();

      // 记住全选按钮状态
      this.statusArr.forEach(item => {
        let id = this.$store.get('menuId');
        if (item.id === id) {
          item.status = this.isAllRoom;
        }
      });
    },
    setAllCheck: function() {
      let checkCount = 0;
      this.roomsData.forEach(item => {
        if (item.status === 0) {
          checkCount++;
        }
      });

      // 如果选中监室个数与监室数据长度相等，那么就是全选状态
      if(checkCount === this.roomsData.length) {
        this.isAllRoom = true;
      } else {
        this.isAllRoom = false;
      }
    },
    // 值小岗新增
    addName: function() {
      let rooms;
      let paramObj ={
        dutys: []
      };
      let roomsArr = [];
      this.allData.forEach(item => {
        rooms = item.rooms;
        rooms.forEach(item => {
          if (item.status === 0) {
            let roomObj = {
              areaId: '',
              roomId: ''
            };
            roomObj.areaId = item.parentid;
            roomObj.roomId = item.id;
            roomsArr.push(roomObj);
          }
        })
      });

      // 将数组排序
      roomsArr.sort((a, b) => {
        return a.areaId - b.areaId
      });
      this.addParams.rooms = roomsArr;

      // 将时间再转成无格式传给后台，麻烦~
      this.timeArr.forEach(item => {
        let params = {
          isEnable: this.addParams.isEnable,
          memo: this.addParams.memo,
          rooms: this.addParams.rooms,
          time: ''
        };
        let h = item.getHours();
        let m = item.getMinutes();
        let s = item.getSeconds();

        h = h < 10 ? `0${h}` : h;
        m = m < 10 ? `0${m}` : m;
        s = s < 10 ? `0${s}` : s;

        params.time = `${h}${m}${s}`;
        paramObj.dutys.push(params);
      });

      this.$ajax({
        method: 'post',
        url: '/duty',
        data: paramObj
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          if (res.content.status === true) {
            this.$message({
              showClose: true,
              message: res.content.tips,
              type: 'success',
              onClose: () => {
                this.$router.go(-1)
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

    },
    resetStatus: function() {
      this.roomsData.forEach(item => {
        item.status = 1
      });

      this.statusArr.forEach(item => {
        let id = this.$store.get('menuId');
        if (item.id === id) {
          item.status = false;
          this.isAllRoom = false;
        }
      });
    },
    // 返回上一页
    backPage: function () {
      this.$router.go(-1)
    },
    // 添加备注
    openMemoMessage: function () {
      this.$prompt(null, '添加备注', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea',
        showClose: false,
        inputPattern: /^.{0,200}$/,
        inputErrorMessage: '备注内容不能超过200个字符！'
      }).then(({ value }) => {
        this.addParams.memo = value;
        this.$message({
          type: 'success',
          message: '添加备注成功！'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消备注！'
        });
      });
    },
    handleAddTime: function() {
      if (this.form.time !== '' && this.form.time !== null) {
        let temp = this.timeArr.compare(this.form.time);
        if(temp === -1) {
          this.$message({
            type: 'info',
            message: '值小岗轮次间隔为一小时以上！'
          });
        }
        this.timeArr.sort();
        let time = this.timeArr;

        time.forEach(item => {
          let h = item.getHours();
          let m = item.getMinutes();
          let s = item.getSeconds();

          h = h < 10 ? `0${h}` : h;
          m = m < 10 ? `0${m}` : m;
          s = s < 10 ? `0${s}` : s;

          let t = `${h}:${m}:${s}`;
          if (!this.showTime.inArray(t)) {
            this.showTime.push(t);
          }
        });
        this.showTime.sort();
      }
    },
    handleDelTime: function(index) {
      this.timeArr.splice(index, 1);
      this.showTime.splice(index, 1);
    }
  }
}

/*
 * 比较数组中数据
 * */
Array.prototype.compare = function (val) {
  let len = this.length;
  let oneHour = 3600 * 1000;
  let self = this;
  let newArr = [];

  self = self.sort(function (a, b) {
    return b - a;
  });

  if (len !== 0) {
    for(let i = 0; i < len; i++) {
      newArr.push(Math.abs(val - self[i]));
    }
    newArr = newArr.sort(function (a, b) {
      return a - b;
    });

    for (let j = 0; j < newArr.length; j++) {
      if (newArr[j] >= oneHour) {
        return self.push(val);
      } else {
        return -1;
      }
    }
  } else {
    return self.push(val);
  }
};
