/**
 * Created by zzy's on 2018-03-20.
 */
import Message from './message'

export default {
  name: 'police-modify',
  data() {
    return {
      loading: true,
      shiftData: [],
      policeStatus: null,
      showAlert: false,
      alertData: null,
      resObj: null,
      alertPic: null
    }
  },
  components: {
    Message
  },
  created: function () {
    this.resObj = this.$store.get('pcObj');
    this.getStatus();
    this.getData();
  },
  methods: {
    getStatus: function() {
      this.$ajax({
        method: 'get',
        url: 'loop/status',
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.policeStatus = res.content;
          this.$store.set('police', this.policeStatus);
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
    getData: function() {
      let date = this.$route.params.date.replace(/-/g, '');
      this.$ajax({
        method: 'get',
        url: `/loop/${this.$route.params.shiftId}/${date}/person`,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.loading = false;
          this.shiftData = res.content;
          // 将民警确认列表塞到列表数据中
          this.shiftData.forEach(item => {
            item.statusObj = this.policeStatus;
            item.lastStatus = this.policeStatus[item.lastStatus];
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
    showDetails: function(obj) {
      this.alertData = null;
      this.alertPic = null;
      this.$ajax({
        method: 'get',
        url: `/loop/personInfo/${obj.loopId}/${obj.personId}/${obj.userId}/${obj.id}`,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.showAlert = !this.showAlert;
          this.alertPic = res.content;
          this.alertData = obj;
          this.$store.set('policeLastStatus', obj.lastStatus);
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
    policeConfirmAll: function() {
      let allData = [];

      this.shiftData.forEach(item => {
        let oneObj = {
          loopId: item.loopId,
          id: item.id,
          lastStatus: item.lastStatus,
          userId: item.userId,
          recordId: ''
        };
        //循环对比警察列表的值，如果相等，则取出对应的key
        for (let val in this.policeStatus) {
          if (this.policeStatus[val] === oneObj.lastStatus) {oneObj.lastStatus = val;}
        }
        allData.push(oneObj);
      });

      this.$ajax({
        method: 'put',
        url: '/loop/save',
        data: allData
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
    formatDate: function() {
      if (this.form.time !== '' && this.form.time !== null) {
        let year = this.form.time.getFullYear();
        let month = this.form.time.getMonth() + 1;
        let day = this.form.time.getDate();

        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        this.reqData.rcDate = `${year}${month}${day}`
      } else {
        this.reqData.rcDate = ''
      }
    },
    reHome: function() {
      this.$router.push({name: 'index'})
    },
    closeAlert: function() {
      this.showAlert = !this.showAlert
    },
    cancel: function() {
      this.$router.go(-1)
    }
  }
}
