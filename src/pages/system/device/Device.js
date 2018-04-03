/**
 * Created by zzy on 2018/3/23.
 */
import qs from 'qs'

export default {
  name: 'device',
  data() {
    return {
      loading: true,
      msgBox: false,
      reqData: { prisonAreaId: '', prisonRoomId: '', page: 0, size: 13 },
      addParams: {
        prisonAreaId: '',
        prisonRoomId: '',
        equipmentIp: '',
        equipmentPort: '',
        equipmentName: '',
        equipmentType: '',
        equipmentStatus: '1'
      },
      showType: 'add',
      showTitle: '新增设备',
      shiftData: '',
      singleId: null,

      typeList: [],

      areaList: [],
      roomList: [],

      rules: {
        equipmentName: [
          {required: true, message: '请输入设备名称', trigger: 'blur'},
          {min: 1, max: 50, message: '长度在1到50个字符', trigger: 'blur'}
        ],
        prisonAreaId: [
          {required: true, message: '请选择监区', trigger: 'blur'}
        ],
        prisonRoomId: [
          {required: true, message: '请选择监室', trigger: 'blur'}
        ],
        equipmentIp: [
          {required: true, message: '请输入设备IP', trigger: 'blur'},
          {pattern: /^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-5][0-5])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/, message: '请输入正确的IP地址', trigger: 'blur'}
        ],
        equipmentPort: [
          {required: true, message: '请输入设备端口', trigger: 'blur'},
          {pattern: /^[0-9]{1,6}$/, message: '请输入正确的端口', trigger: 'blur'}
        ],
        equipmentType: [
          {required: true, message: '请选择设备类型', trigger: 'blur'}
        ],
      }
    }
  },
  created: function () {
    this.getApi(this.reqData);
    this.getAreaList();
    this.getDeviceType();
  },
  methods: {
    // 设备列表查询
    getApi: function (obj) {
      this.$ajax({
        method: 'get',
        url: `/equipment/list?${qs.stringify(obj)}`,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.loading = false;
          this.shiftData = res.content;
        } else {
          this.$message({showClose: true, message: res.msg, type: 'warning'})
        }
      }).catch(err => {
        this.$message({showClose: true, message: '获取数据失败！', type: 'warning'})
      })
    },
    // 查询监区监室
    getAreaList: function() {
      this.$ajax({
        method: 'get',
        url: '/job/findArea',
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          let allData = res.content;
          allData.forEach(item => {
            let area = {};
            let rooms = [];
            area.value = item.id;
            area.label = item.name;
            item.rooms.forEach(item2 => {
              let room = {};
              room.value = item2.id;
              room.label = item2.name;
              rooms.push(room);
            });
            area.children = rooms;
            this.areaList.push(area);
          });
        } else {
          this.$message({showClose: true, message: res.msg, type: 'warning'})
        }
      }).catch(err => {
        this.$message({showClose: true, message: '获取数据失败！', type: 'warning'})
      })
    },
    getChildRoom: function (val) {
      this.areaList.forEach(item => {
        if (item.value === val) {
          this.roomList = item.children
        }
      })
    },
    // 获取设备类型
    getDeviceType: function () {
      this.$ajax({
        method: 'get',
        url: '/equipment/type',
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.typeList = res.content.content;
        } else {
          this.$message({showClose: true, message: res.msg, type: 'warning'})
        }
      }).catch(err => {
        this.$message({showClose: true, message: '获取数据失败！', type: 'warning'})
      })
    },
    addHandle: function(formName, id) {
      let self_method;
      let self_url;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.showType === 'add') {
            self_method = 'post';
            self_url = '/equipment';
          } else if (this.showType === 'modify') {
            self_method = 'put';
            self_url = `/equipment/${id}`;
          }
            console.log(this.addParams);
            this.$ajax({
            method: self_method,
            url: self_url,
            data: this.addParams
          }).then(res => {
            res = res.data;
            if (res.status === 'SUCCESS') {
              if (res.content.status === true) {
                this.$message({showClose: true, message: res.content.tips, type: 'success'});
                this.closeAlert('ruleForm');
                this.getApi(this.reqData);
              } else {
                this.$message({showClose: true, message: res.content.tips, type: 'warning'})
              }
            } else {
              this.$message({showClose: true, message: res.msg, type: 'warning'})
            }
          }).catch(err => {
            this.$message({showClose: true, message: '获取数据失败！', type: 'warning'})
          })
        } else {
          return false;
        }
      });
    },
    modifyHandle: function(id) {
      this.singleId = id;
      this.showType = 'modify';
      this.showTitle = '修改设备';
      // 查该条信息详情
      this.$ajax({
        method: 'get',
        url: `/equipment/${id}`,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.msgBox = true;
          this.addParams.equipmentName = res.content.equipmentName;
          this.addParams.equipmentType = res.content.equipmentType;
          this.addParams.equipmentIp = res.content.equipmentIp;
          this.addParams.equipmentPort = res.content.equipmentPort;
          this.addParams.prisonAreaId = res.content.area.id;
          this.addParams.prisonRoomId = res.content.room.id;
        } else {
          this.$message({showClose: true, message: res.msg, type: 'warning'})
        }
      }).catch(err => {
        this.$message({showClose: true, message: '获取数据失败！', type: 'warning'})
      });
    },
    deleteHandle: function(id) {
      this.$ajax({
        method: 'delete',
        url: `/equipment/${id}`,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.getApi(this.reqData);
          this.$message({showClose: true, message: res.msg, type: 'success'})
        } else {
          this.$message({showClose: true, message: res.msg, type: 'warning'})
        }
      }).catch(err => {
        this.$message({
          showClose: true,
          message: '获取数据失败！',
          type: 'warning'
        })
      })
    },
    showAlert: function() {
      this.showTitle = '新增设备';
      this.showType = 'add';
      this.msgBox = true;
      this.addParams.equipmentName = '';
      this.addParams.equipmentType = '';
      this.addParams.equipmentIp = '';
      this.addParams.equipmentPort = '';
      this.addParams.prisonAreaId = '';
      this.addParams.prisonRoomId = '';
    },
    closeAlert: function(formName) {
      this.msgBox = false;
      // 清空验证信息
      if (this.showType === 'add') {
        this.$refs[formName].resetFields();
      }
    },
    handleCurrentChange: function(val) {
      this.reqData.page = val-1;
      this.getApi(this.reqData)
    },
    reHome: function() {
      this.$router.push({name: 'index'});
      this.$store.set('activePage', '/sys-manage/user')
    }
  }
}
