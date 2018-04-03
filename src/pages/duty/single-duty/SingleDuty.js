/**
 * Created by zzy's on 2018-03-21.
 */
import {AngMenu, AngRoom} from 'components'

export default {
  name: 'single-duty',
  components: {
    AngMenu,
    AngRoom
  },
  data() {
    return {
      form: {
        time: ''
      },
      areaId: '',

      allData: [],
      roomsData: [],
      statusArr: [],
      areasName: ''
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
          this.memo = res.content.memo;

          // 默认第一个监区下面的监室
          this.roomsData = res.content.areas[0].rooms;
          this.areasName = res.content.areas[0].name;
          this.areaId = res.content.areas[0].id;

          let cDate = new Date();
          let sTime = res.content.time.split(':');
          this.form.time = new Date(
              cDate.getFullYear(),
              cDate.getMonth()+1,
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
        }
      });

      this.areaId = id;
      this.$store.set('menuId', id);
    },

    // 返回上一页
    backPage: function () {
      this.$router.go(-1)
    },
    // 备注详情
    openMemoMessage: function () {
      this.$prompt(null, '备注', {
        confirmButtonText: '确定',
        message: this.memo,
        showInput: false,
        inputType: 'textarea',
        showCancelButton: false,
        showClose: false
      });
    }
  }
}
