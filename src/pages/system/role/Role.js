/**
 * Created by zzy on 2018/3/23.
 */
import qs from 'qs'
export default {
  name: 'role',
  data() {
    return {
      loading: true,
      msgBox: false,
      reqData: { roleNameCn: '', page: 0, size: 13 },
      roleList: [],
      roleSelectList: [],
      addParams: { roleName: '', roleNameCn: '', roleMemo: '', invalidTime: '', rightSet: [], departments: [] },
      showType: 'add',
      showTitle: '新增角色',
      shiftData: '',
      detailType: false,
      detailData: null,
      singleId: null,
      // 监区
      allAreasList: [],
      checkAreas: [],
      // 功能权限列表
      authList: [],

      // 如果是修改显示失效时间，新增不显示
      isModify: false,

      rules: {
        roleName: [
          {required: true, message: '请输入角色编码', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur'}
        ],
        roleNameCn: [
          {required: true, message: '请输入角色名称', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur'}
        ],
        invalidTime: [
          {required: true, message: '请选择失效时间', trigger: 'blur'}
        ],
        roleMemo: [
          {max: 200, message: '备注最多200个字符', trigger: 'blur'}
        ],
      },
    }
  },
  created: function () {
    this.getApi(this.reqData);
    // 查询所有角色
    this.getList('/role/findAllRole', 'roleList');
    // 查询数据范围（监区范围）
    this.getList('/role/findDepart', 'allAreasList');
    // 查询功能权限
    this.getList('/role/findRight', 'authList');
  },
  methods: {
    // 角色列表查询
    getApi: function (obj) {
      this.$ajax({
        method: 'get',
        url: `/role?${qs.stringify(obj)}`,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.loading = false;
          this.shiftData = res.content;
          this.shiftData.content.reverse();
        } else {
          this.$message({showClose: true, message: res.msg, type: 'warning'})
        }
      }).catch(err => {
        this.$message({showClose: true, message: '获取数据失败！', type: 'warning'})
      })
    },
    // 查询方法
    getList: function (url, receive) {
      this.$ajax({
        method: 'get',
        url: url,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this[receive] = res.content;
          if(receive === 'authList') {
            this.cleaUpAuthListFc(this[receive]);
          }
        } else {
          this.$message({showClose: true, message: res.msg, type: 'warning'})
        }
      }).catch(err => {
        this.$message({showClose: true, message: '获取数据失败！', type: 'warning'})
      })
    },
    // 获取到的权限列表数据格式化成树形结构能用的格式
    cleaUpAuthListFc: function(data) {
      let authList = [];
      data.forEach(item1 => {
        let pObj = {children: []};
        pObj.id = item1.id;
        pObj.label = item1.rightNameCn;

        item1.rights.forEach(item2 => {
          let cObj = {};
          cObj.id = item2.id;
          cObj.label = item2.rightNameCn;
          pObj.children.push(cObj);
        });
        authList.push(pObj);
      });
      this.authList = authList;
    },

    addHandle: function(formName, id) {
      let self_method;
      let self_url;
      this.addParams.departments = [];
      this.addParams.rightSet = [];
      // 选中的树形结构叶子结点
      let checkNodes = this.$refs.tree.getCheckedNodes();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.showType === 'add') {
            self_method = 'post';
            self_url = '/role';
          } else if (this.showType === 'modify') {
            self_method = 'put';
            self_url = `/role/${id}`;
            this.addParams.invalidTime = getDateParam(this.addParams.invalidTime);
          }

          this.checkAreas.forEach(item => {
            let obj = {};
            obj.departmentId = item;
            this.addParams.departments.push(obj)
          });

          checkNodes.forEach(item => {
            let obj = {};
            obj.id = item.id;
            this.addParams.rightSet.push(obj)
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
        url: `/role/${id}`,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.msgBox = true;
          this.addParams.roleName = res.content.roleName;
          this.addParams.roleNameCn = res.content.roleNameCn;
          this.addParams.roleMemo = res.content.roleMemo;
          this.addParams.invalidTime = res.content.invalidTime;
          // 已选中监区
          res.content.jyDeparts.forEach(item => {
            if (item.status === '0') {
              this.checkAreas.push(String(item.id));
            }
          });
          // 以选中树的节点
          let checkedNode = [];
          res.content.rights.forEach(item1 => {
            if (item1.rights.length !== 0) {
              item1.rights.forEach(item2 => {
                if (item2.status === '0') {
                  checkedNode.push(item2.id)
                }
              })
            } else {
              if (item1.status === '0') {
                checkedNode.push(item1.id)
              }
            }
          });
          this.$refs.tree.setCheckedKeys(checkedNode);
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
      this.$ajax({
        method: 'delete',
        url: '/role',
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
    },
    showAlert: function() {
      this.showTitle = '新增角色';
      this.showType = 'add';
      this.isModify = false;
      this.msgBox = true;

      this.addParams.roleName = '';
      this.addParams.roleNameCn = '';
      this.addParams.roleMemo = '';
      this.addParams.invalidTime = '';
    },
    closeAlert: function(formName) {
      this.detailType = false;
      this.msgBox = false;
      this.addParams.rightSet = [];
      this.checkAreas = [];
      this.$refs.tree.setCheckedKeys([]);
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

// 返回无格式日期
function getDateParam(time) {
  if (time.length > 20) {
    let y = time.getFullYear();
    let m = time.getMonth()+1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();

    m = m < 10 ? `0${m}` : m;
    d = d < 10 ? `0${d}` : d;
    h = h < 10 ? `0${h}` : h;
    mm = mm < 10 ? `0${mm}` : mm;
    s = s < 10 ? `0${s}` : s;

    return `${y}${m}${d}${h}${mm}${s}`
  } else {
    let s1 = time.split(' ');
    let s2 = s1[0].split('-');
    let s3 = s1[1].split(':');

    return `${s2[0]}${s2[1]}${s2[2]}${s3[0]}${s3[1]}${s3[2]}`
  }
}
