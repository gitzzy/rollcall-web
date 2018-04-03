/**
 * Created by zzy on 2018/2/1.
 */
export default {
  name: 'login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onLogin: function() {
      if (this.user.username === '') {
        alert('用户名不能为空！');
        return
      }
      if (this.user.password === '') {
        alert('密码不能为空！');
        return
      }

      this.$ajax({
        method: 'post',
        url: '/login',
        data: {
          username: this.user.username,
          password: this.user.password
        }
      }).then(res => {
        // 将获取到的token存到本地
        this.$store.set('token', res.headers.authorization);
        // 登录成功，路由到首页
        this.$router.push({
          path: '/index'
        })
      }).catch(err => {
        this.$message({
          showClose: true,
          message: '获取登录信息失败！',
          type: 'warning'
        })
      })

    }
  }
}
