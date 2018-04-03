import qs from 'qs'

export default {
  name: 'duty-query',
  data() {
    return {
      loading: true,
      form: {
        time: ''
      },
      reqData: {
        time: '',
        page: 0,
        size: 13,
      },
      dutyData: ''
    }
  },
  created: function () {
    this.getData(this.reqData)
  },
  methods: {
    getData: function(obj) {
      this.$ajax({
        method: 'get',
        url: `/duty?${qs.stringify(obj)}`,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.loading = false;
          this.dutyData = res.content;

          let contentArr = res.content.content;
          for (let i = 0; i < contentArr.length; i++) {
            let roomsArr = [];
            let rooms = contentArr[i].rooms;
            // 监区排序
            rooms.sort((a, b) => {
              return a.areaId - b.areaId
            });

            for (let j = 0; j < rooms.length; j++) {
              roomsArr.push(rooms[j].areaName);
            }
            let newRoomsArr = this.delRepeat(roomsArr);
            contentArr[i].ranges = newRoomsArr.join(',');
          }
          this.dutyData.content = contentArr;
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

    formatDate: function() {
      if (this.form.time !== '' && this.form.time !== null) {
        let h = this.form.time.getHours();
        let m = this.form.time.getMinutes();
        let s = this.form.time.getSeconds();

        h = h < 10 ? `0${h}` : h;
        m = m < 10 ? `0${m}` : m;
        s = s < 10 ? `0${s}` : s;

        this.reqData.time = `${h}${m}${s}`
      } else {
        this.reqData.time = '';
      }
    },
    handleCurrentChange: function(val) {
      this.reqData.page = val-1;
      this.getApi(this.reqData)
    },
    reHome: function() {
      this.$router.push({name: 'index'})
    },
    handleAdd: function() {
      this.$router.push({
        name: 'duty-add'
      })
    },
    handleImport: function() {
      // 导入方法，直接调用客户端方法
      window.location.href = '#import'
    },
    skipRoute: function(url, id) {
      this.$router.push({
        name: url,
        params: {
          id: id
        }
      })
    },
    handleDelete: function(id) {
      let idArr = [];
      idArr.push(id);
      this.$ajax({
        method: 'delete',
        url: '/duty',
        data: idArr
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          let sData = this.dutyData.content;
          sData.forEach(item => {
            if (item.id === id) {
              this.dutyData.content.remove(item)
            }
          });

          this.$message({
            showClose: true,
            message: res.msg,
            type: 'success'
          })
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
    delRepeat: function(arr) {
      let n = [arr[0]];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== n[n.length - 1]) {
          n.push(arr[i])
        }
      }
      return n;
    }
  }
}
