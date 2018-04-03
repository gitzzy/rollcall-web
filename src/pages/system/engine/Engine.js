/**
 * Created by zzy on 2018/3/23.
 */
import qs from 'qs'

export default {
  name: 'engine',
  data() {
    return {
      loading: true,
      msgBox: false,
      reqData: { engineName: '', page: 0, size: 13 },
      addParams: {
        engineName: '',
        engineIp: '',
        enginePort: '',
        engineStatus: ''
      },
      showType: 'add',
      showTitle: '新增引擎',
      shiftData: '',
      singleId: null,

      typeList: [],

      areaList: [],
      roomList: [],

      rules: {
        engineName: [
          {required: true, message: '请输入引擎名称', trigger: 'blur'},
          {min: 1, max: 50, message: '长度在1到50个字符', trigger: 'blur'}
        ],
        engineIp: [
          {required: true, message: '请输入引擎IP', trigger: 'blur'},
          {pattern: /^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-5][0-5])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/, message: '请输入正确的IP地址', trigger: 'blur'}
        ],
        enginePort: [
          {required: true, message: '请输入引擎端口', trigger: 'blur'},
          {pattern: /^[0-9]{1,6}$/, message: '请输入正确的端口', trigger: 'blur'}
        ],
        engineStatus: [
          {required: true, message: '请选择实时状态', trigger: 'blur'}
        ]
      }
    }
  },
  created: function () {
    this.getApi(this.reqData);
  },
  methods: {
    // 设备列表查询
    getApi: function (obj) {
      this.$ajax({
        method: 'get',
        url: `/engine?${qs.stringify(obj)}`,
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
    addHandle: function(formName, id) {
      let self_method;
      let self_url;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.showType === 'add') {
            self_method = 'post';
            self_url = '/engine';
          } else if (this.showType === 'modify') {
            self_method = 'put';
            self_url = `/engine/${id}`;
            console.log(this.addParams);
          }

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
      this.showTitle = '修改引擎';
      // 查该条信息详情
      this.$ajax({
        method: 'get',
        url: `/engine/${id}`,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.msgBox = true;
          this.addParams.engineName = res.content.engineName;
          this.addParams.engineIp = res.content.engineIp;
          this.addParams.enginePort = res.content.enginePort;
          this.addParams.engineStatus = res.content.engineStatus;
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
        url: `/engine/${id}`,
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
      this.showTitle = '新增引擎';
      this.showType = 'add';
      this.msgBox = true;
      this.addParams.engineName = '';
      this.addParams.engineIp = '';
      this.addParams.enginePort = '';
      this.addParams.engineStatus = '';
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
      this.$store.set('activePage', '/sys-manage/user');
    }
  }
}

