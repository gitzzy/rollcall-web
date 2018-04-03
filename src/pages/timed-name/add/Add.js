import {AngMenu, AngRoom} from 'components'

export default {
  name: 'add-timed-name',
  components: {
    AngMenu,
    AngRoom
  },
  data() {
    return {
      addParams: {
        jobType: 0,
        shift: {id: ''},
        time: '',
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
      checkRoom: [],

      options: [],
      selectedOptions: []
    }
  },
  created: function() {
    this.getData();
    this.getShift();
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
    getShift: function () {
      this.$ajax({
        method: 'get',
        url: '/shift/dic',
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          let sData = res.content;
          let options = [];

          for (let i = 0; i < sData.length; i++) {
            let shift = {
              value: sData[i].id,
              label: sData[i].shiftName,
              children: []
            };
            for (let j = 0; j < sData[i].times.length; j++) {
              let time = {
                value: sData[i].times[j].time,
                label: sData[i].times[j].time
              };
              shift.children.push(time);
            }
            options.push(shift);
          }
          this.options = options;
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
    checkAll: function(ck) {
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
    // 点名任务
    addName: function() {
      let rooms;
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

      this.$ajax({
        method: 'post',
        url: '/job',
        data: this.addParams
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
    }
  }
}
