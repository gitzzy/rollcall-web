import qs from 'qs'

export default {
    name: 'timed-name',
    data() {
        return {
            loading: true,
            form: {
                time: '',
                type: ''
            },
            reqData: {
                time: '',
                jobType: '0',
                page: 0,
                size: 13,
            },
            shiftData: '',
            ranges: ''
        }
    },
    created: function () {
        this.getApi(this.reqData);
    },
    methods: {
        // 点名结果列表-带分页
        getApi: function (obj) {
            /*let curTime = new Date('20180316').format("yyyy-MM-dd");
             console.log('curTime', curTime);*/
            this.$ajax({
                method: 'get',
                url: `/job?${qs.stringify(obj)}`,
                data: {}
            }).then(res => {
                res = res.data;
                if (res.status === 'SUCCESS') {
                    this.loading = false;
                    this.shiftData = res.content;

                    // 取范围数据，并去重之后赋给ranges
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
                    this.shiftData.content = contentArr;

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
        handleCurrentChange: function (val) {
            this.reqData.page = val - 1
            this.getApi(this.reqData)
        },
        reHome: function () {
            this.$router.push({name: 'index'})
        },
        detailsHandle: function (id) {
            this.$router.push({
                name: 'details-timed-name',
                params: {id: id}
            })
        },
        modifyHandle: function (id) {
            this.$router.push({
                name: 'modify-timed-name',
                params: {id: id}
            })
        },
        add: function () {
            this.$router.push({
                name: 'add-timed-name'
            })
        },
        deleteEvent: function (id) {
            let idArr = [];
            idArr.push(id);

            this.$confirm('您确定要删除该条数据吗?', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$ajax({
                    method: 'delete',
                    url: '/job',
                    data: idArr
                }).then(res => {
                    res = res.data;
                    if (res.status === 'SUCCESS') {
                        let sData = this.shiftData.content;
                        sData.forEach(item => {
                            if (item.id === id) {
                                this.shiftData.content.remove(item)
                            }
                        });

                        this.$message({
                          showClose: true,
                          message: '删除成功！',
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
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        // 工具方法
        formatDate: function () {
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
        delRepeat: function (arr) {
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
