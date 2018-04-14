import qs from 'qs'

export default {
  name: 'user',
  data() {
    return {
      loading: true,
      msgBox: false,
      reqData: { name: '', nameCn: '', page: 0, size: 13 },
      roleList: [],
      roleSelectList: [],
      addParams: { name: '', nameCn: '', cardNum: '', policeNum: '', roleSet: [] },
      showType: 'add',
      showTitle: '新增用户',
      shiftData: '',
      detailType: false,
      singleId: null,

      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur'}
        ],
        nameCn: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur'}
        ],
        cardNum: [
          {required: true, message: '请输入身份证号', trigger: 'blur'},
          {pattern: /^[1-9]\d{7}((0[1-9])|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, message: '请输入正确的身份证号', trigger: 'blur'}
        ],
        policeNum: [
          {required: true, message: '请输入警号', trigger: 'blur'},
          {pattern: /^[0-9]{0,20}$/, message: '请输入正确的警号', trigger: 'blur'}
        ],
      }
    }
  },
  created: function () {
    this.getApi(this.reqData);
  },
  methods: {
    // 用户列表查询
    getApi: function (obj) {
      this.$ajax({
        method: 'get',
        url: `/user?${qs.stringify(obj)}`,
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
    // 查询所有角色
    getRoleList: function() {
      this.$ajax({
        method: 'get',
        url: '/role/findAllRole',
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.loading = false;
          this.roleSelectList = res.content;
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
            self_url = '/user';
          } else if (this.showType === 'modify') {
            self_method = 'put';
            self_url = `/user/${id}`;
          }

          this.roleList.forEach(item => {
            let obj = {};
            obj.id = item;
            this.addParams.roleSet.push(obj)
          });

          this.$ajax({
            method: self_method,
            url: self_url,
            data: this.addParams
          }).then(res => {
            res = res.data;
            if (res.status === 'SUCCESS') {
              if (res.content.status === true) {
                this.$message({showClose: true, message: res.content.tips, type: 'success'});
                // this.msgBox = false;
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
    detailsHandle: function(id, isDetail) {
      if (isDetail) {
        this.showTitle = '角色详情';
      } else {
        this.showTitle = '修改角色';
      }
      this.isModify = true;
      this.detailType = isDetail;
      this.$ajax({
        method: 'get',
        url: `/user/${id}`,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.msgBox = true;
          this.addParams.name = res.content.name;
          this.addParams.nameCn = res.content.nameCn;
          this.addParams.cardNum = res.content.cardNum;
          this.addParams.policeNum = res.content.policeNum;
          // 已选中监区
          this.roleSelectList = res.content.roles;
          res.content.roles.forEach(item => {
            if (item.status === '0') {
              this.roleList.push(item.id);
            }
          });
        } else {
          this.$message({showClose: true, message: res.msg, type: 'warning'})
        }
      }).catch(err => {
        this.$message({showClose: true, message: '获取数据失败！', type: 'warning'})
      });
    },
    modifyHandle: function(id) {
      this.singleId = id;
      this.showType = 'modify';
      this.detailsHandle(id, false);
    },
    deleteHandle: function(id) {
      let idArr = [];
      idArr.push(id);
        this.$confirm('您确定要删除该条数据吗?', '删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$ajax({
                method: 'delete',
                url: '/user',
                data: idArr
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
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });
    },
    showAlert: function() {
      this.showTitle = '新增用户';
      this.showType = 'add';
      this.msgBox = true;
      this.getRoleList();
      this.addParams.name = '';
      this.addParams.nameCn = '';
      this.addParams.cardNum = '';
      this.addParams.policeNum = '';
    },
    closeAlert: function(formName) {
      this.detailType = false;
      this.msgBox = false;
      this.addParams.roleSet = [];
      this.roleList = [];
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
