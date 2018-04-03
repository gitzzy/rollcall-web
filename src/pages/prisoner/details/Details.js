/**
 * Created by zzy on 2018/3/27.
 */
import qs from 'qs'
import Message from './message'

export default {
  name: 'prisoner-details',
  data() {
    return {
      reqData: {prisonAreaId: '', prisonRoomId: ''},
      roomTitle: '',
      detailData: {
        allCnt:{name:'', content: ''},
        leavePrison:{name:'', content: ''},
        arraignmentCnt:{name:'', content: ''},
        escortCnt:{name:'', content: ''},
        inCustodyCnt:{name:'', content: ''},
        outsideHealth:{name:'', content: ''},
        confinementCnt:{name:'', content: ''},
        lawyerMeeting:{name:'', content: ''},
        familyMeeting:{name:'', content: ''},
        education:{name:'', content: ''}
      },
      carousel: [],
      alertData: '',
      showAlert: false
    }
  },
  components: {
    Message
  },
  created: function() {
    this.getApi(this.reqData);
  },
  methods: {
    // 在押人员监室列表
    getApi: function (obj) {
      this.roomTitle = this.$route.params.roomName;
      this.reqData.prisonAreaId = this.$route.params.areaId;
      this.reqData.prisonRoomId = this.$route.params.roomId;
      this.$ajax({
        method: 'get',
        url: `/postinfo/list?${qs.stringify(obj)}`,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          let rc = res.content;
          let rcList = rc.contentListNum;
          console.log(rc);
          let allPerson = [];
          this.detailData.allCnt.name = `总人数 ${rc.allCnt}人`;
          rc.contentListNum.forEach(item => {
            allPerson.push(item.name);
          });
          this.detailData.allCnt.content = allPerson.join('、');
          this.detailData.leavePrison.name = `临时出所 ${rc.leavePrison}人`;
          this.detailData.leavePrison.content = rc.leavePrisonName;
          this.detailData.arraignmentCnt.name = `提讯人数 ${rc.arraignmentCnt}人`;
          this.detailData.arraignmentCnt.content = rc.arraignmentCntName;
          this.detailData.escortCnt.name = `提押人数 ${rc.escortCnt}人`;
          this.detailData.escortCnt.content = rc.escortCntName;
          this.detailData.inCustodyCnt.name = `在押人数 ${rc.inCustodyCnt}人`;
          this.detailData.inCustodyCnt.content = rc.inCustodyCntName;
          this.detailData.outsideHealth.name = `所外就医 ${rc.outsideHeal}人`;
          this.detailData.outsideHealth.content = rc.outsideHealName;
          this.detailData.confinementCnt.name = `禁闭人数 ${rc.confinementCnt}人`;
          this.detailData.confinementCnt.content = rc.confinementCntName;
          this.detailData.lawyerMeeting.name = `律师会见 ${rc.lawyerMeeting}人`;
          this.detailData.lawyerMeeting.content = rc.lawyerMeetingName;
          this.detailData.familyMeeting.name = `家属会见 ${rc.familyMeeting}人`;
          this.detailData.familyMeeting.content = rc.familyMeetingName;
          this.detailData.education.name = `谈话教育 ${rc.education}人`;
          this.detailData.education.content = rc.educationName;

          let rc1 = rcList.slice(0, 8);
          let rc2 = rcList.slice(8, 16);
          let rc3 = rcList.slice(16, 24);
          if (rc1.length > 0) {
            this.carousel.push(rc1);
          }
          if (rc2.length > 0) {
            this.carousel.push(rc2);
          }
          if (rc3.length > 0) {
            this.carousel.push(rc3);
          }
        } else {
          this.$message({showClose: true, message: res.msg, type: 'warning'})
        }
      }).catch(err => {
        this.$message({showClose: true, message: '获取数据失败！', type: 'warning'})
      })
    },
    showDetails: function(myId, id) {
      this.alertData = '';
      this.$ajax({
        method: 'get',
        url: `/postinfo/${myId}/${id}/${this.$route.params.areaId}/${this.$route.params.roomId}`,
        data: {}
      }).then(res => {
        res = res.data;
        if (res.status === 'SUCCESS') {
          this.showAlert = !this.showAlert;
          this.alertData = res.content;
          console.log(this.alertData);
        } else {
          this.$message({showClose: true, message: res.msg, type: 'warning'})
        }
      }).catch(err => {
        this.$message({showClose: true, message: err.response.data.message, type: 'warning'})
      })
    },
    closeAlert: function() {
      this.showAlert = !this.showAlert
    },
    reHome: function() {
      this.$router.go(-1)
    },
  }
}
