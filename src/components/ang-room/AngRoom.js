export default {
  name: 'ang-rooms',
  props: {
    room: Object,
    isAllRoom: Boolean,
    flag: Boolean
  },
  data() {
    return {
      toJSON: '',
      roomStatus: 1,
      allRoom: false,
      roomData: null
    }
  },
  created: function() {
    this.roomData = this.room
  },
  methods: {
    // 单选
    checkRoom: function(status) {
      if (status === 1) {
        // 如果未选中
        this.roomData.status = 0;
        this.$emit('getRoomCount');
      } else {
        // 如果选中
        this.roomData.status = 1;
        this.$emit('getRoomCount');
      }

    }
  }
}
