/**
 * Created by zzy's on 2018-03-22.
 */
import {AngMenu, AngRoom} from 'components'

export default {
  name: 'duty-modify',
  components: {
    AngMenu,
    AngRoom
  },
  data() {
    return {
      form: {
        time: ''
      },
      timeArr: [],
      showTime: [],

      modifyParams: {
        isEnable: '1',
        memo: '',
        time: '',
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
    getData: function() {
      // 查询监区详情
      this.$ajax({
        method: 'get',
        url: `/duty/${this.$route.params.id}`,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.allData = res.content.areas;
          this.modifyParams.memo = res.content.memo;

          let reg = new RegExp(':', 'ig');
          this.modifyParams.time = res.content.time.replace(reg, '');

          // 默认第一个监区下面的监室
          this.roomsData = res.content.areas[0].rooms;
          this.areasName = res.content.areas[0].name;
          this.areaId = res.content.areas[0].id;

          res.content.areas[0].rooms.forEach(item => {
            let checkCount = 0;
            item.forEach(item2 => {
              if (item2.status === 0) {
                checkCount++;
              }
            });

            // 如果选中监室个数与监室数据长度相等，那么就是全选状态
            if (checkCount === res.content.areas[0].rooms.length) {
              this.isAllRoom = true;
            } else {
              this.isAllRoom = false;
            }
          });

          let cDate = new Date();
          let sTime = res.content.time.split(':');
          this.form.time = new Date(
            cDate.getFullYear(),
            cDate.getMonth(),
            cDate.getDate(),
            sTime[0],
            sTime[1],
            sTime[2]);
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

          let checkCount = 0;
          this.roomsData.forEach(item2 => {
            if (item2.status === 0) {
              checkCount++;
            }
          });
          // 如果选中监室个数与监室数据长度相等，那么就是全选状态
          if (checkCount === this.roomsData.length) {
            this.isAllRoom = true;
          } else {
            this.isAllRoom = false;
          }
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
    // 值小岗修改
    modifyName: function() {
      let rooms;
      let roomsArr = [];
      this.allData.forEach(item1 => {

        rooms = item1.rooms;
        rooms.forEach(item2 => {
          let roomObj = {
            areaId: '',
            roomId: ''
          };
          roomObj.areaId = item1.id;
          if (item2.status === 0) {
            roomObj.roomId = item2.id;
            roomsArr.push(roomObj);
          }
        })
      });

      // 将数组排序
      roomsArr.sort((a, b) => {
        return a.areaId - b.areaId
      });
      this.modifyParams.rooms = roomsArr;

      this.$ajax({
        method: 'put',
        url: `/duty/${this.$route.params.id}`,
        data: this.modifyParams
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
    // 修改备注
    openMemoMessage: function () {
      this.$prompt(null, '修改备注', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: this.modifyParams.memo,
        inputType: 'textarea',
        showClose: false,
        inputPattern: /^.{0,200}$/,
        inputErrorMessage: '备注内容不能超过200个字符！'
      }).then(({ value }) => {
        this.modifyParams.memo = value;
        this.$message({
          type: 'success',
          message: '修改备注成功！'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改！'
        });
      });
    }
  }
}

