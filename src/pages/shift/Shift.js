/**
 * Created by zzy on 2018/3/23.
 */
import qs from 'qs'

export default {
    name: 'shift',
    data() {
        return {
            loading: true,
            msgBox: false,
            shifts: [],
            form: {
                time: ''
            },
            timeArr: [],
            showTime: [],
            reqData: { id: '', page: 0, size: 13 },
            addParams: {
                shiftName: '',
                shiftMemo: '',
                times: [],
                isReport: ''
            },
            showType: 'add',
            showTitle: '新增引擎',
            shiftData: '',
            singleId: null,

            typeList: [],

            areaList: [],
            roomList: [],

            rules: {
                shiftName: [
                    {required: true, message: '请输入班次名称', trigger: 'blur'},
                    {min: 1, max: 50, message: '长度在1到50个字符', trigger: 'blur'}
                ],
                shiftMemo: [
                    {max: 200, message: '最大长度200个字符', trigger: 'blur'}
                ],
                isReport: [
                    {required: true, message: '请选择上报省厅', trigger: 'blur'}
                ]
            }
        }
    },
    created: function () {
        this.getShiftDic();
        this.getApi(this.reqData);
    },
    methods: {
        // 设备列表查询
        getApi: function (obj) {
            this.$ajax({
                method: 'get',
                url: `/shift?${qs.stringify(obj)}`,
                data: {}
            }).then(res => {
                res = res.data;
                if (res.status === 'SUCCESS') {
                    this.loading = false;
                    res.content.content.forEach(item => {
                        let time = [];
                        item.times.forEach(item2 => {
                            time.push(item2.time);
                        });
                        item.timeStr = time.join(', ')
                    });
                    this.shiftData = res.content;
                } else {
                    this.$message({showClose: true, message: res.msg, type: 'warning'})
                }
            }).catch(err => {
                this.$message({showClose: true, message: '获取数据失败！', type: 'warning'})
            })
        },
        getShiftDic: function() {
            this.$ajax({
                method: 'get',
                url: '/shift/dic',
                data: {}
            }).then(res => {
                res = res.data;
                if (res.status === 'SUCCESS') {
                    this.shifts = res.content;
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
            this.addParams.times = [];
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.showType === 'add') {
                        self_method = 'post';
                        self_url = '/shift';

                        if (this.showTime.length === 0) {
                            this.$message({showClose: true, message: '请添加时间！'});
                            return false;
                        }
                    } else if (this.showType === 'modify') {
                        self_method = 'put';
                        self_url = `/shift/${id}`;
                    }
                    this.showTime.forEach(item => {
                        let t = {time: item.replace(/\:/g, '')};
                        this.addParams.times.push(t);
                    });
                    console.log(this.addParams);
                    this.$ajax({
                        method: self_method,
                        url: self_url,
                        data: this.addParams
                    }).then(res => {
                        console.log(res);
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
            this.showTime = [];
            this.singleId = id;
            this.showType = 'modify';
            this.showTitle = '修改班次';
            // 查该条信息详情
            this.$ajax({
                method: 'get',
                url: `/shift/${id}`,
                data: {}
            }).then(res => {
                res = res.data;
                if (res.status === 'SUCCESS') {
                    this.msgBox = true;
                    this.addParams.shiftName = res.content.shiftName;
                    this.addParams.shiftMemo = res.content.shiftMemo;
                    this.addParams.isReport = res.content.isReport;
                    console.log(res.content.times);
                    res.content.times.forEach(item => {
                        this.showTime.push(item.time)
                    })
                } else {
                    this.$message({showClose: true, message: res.msg, type: 'warning'})
                }
            }).catch(err => {
                this.$message({showClose: true, message: '获取数据失败！', type: 'warning'})
            });
        },
        deleteHandle: function(id) {
            let delArr = [];
            delArr.push(id);
            this.$ajax({
                method: 'delete',
                url: '/shift',
                data: delArr
            }).then(res => {
                res = res.data;
                console.log(res);
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
            this.showTitle = '新增班次';
            this.showType = 'add';
            this.msgBox = true;
            this.addParams.shiftName = '';
            this.addParams.shiftMemo = '';
            this.addParams.isReport = '';
            this.addParams.times = [];
        },
        closeAlert: function(formName) {
            this.msgBox = false;
            this.showTime = [];
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
        },
        handleAddTime: function() {
            if (this.form.time !== '' && this.form.time !== null) {
                let temp = this.timeArr.compareHalfHour(this.form.time);
                if(temp === -1) {
                    this.$message({
                        type: 'info',
                        message: '班次时间间隔为半小时以上！'
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
Array.prototype.compareHalfHour = function (val) {
    let len = this.length;
    let halfHour = 3600 * 500;
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
            if (newArr[j] >= halfHour) {
                return self.push(val);
            } else {
                return -1;
            }
        }
    } else {
        return self.push(val);
    }
};
