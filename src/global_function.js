import Vue from 'vue'
// 有回调的axios
Vue.prototype.c_ajax = function (params, url, callback, is_show, is_show_load, is_show_nomsg) {
    const that = this
    //公共参数
    params.token = that.getLocalObj('user').token
    params.app_ver_sn = this.app_ver_sn;
    params.app = this.app;
    params.shop_id = that.getLocalObj('shop_id')
    params.sale_account_id = that.getLocalObj('sale_account_id')
    params.from_user_id = that.getLocalObj('from_user_id')
    that.$store.commit('setShowWrongMsg', is_show || false)

	
    if(is_show_load!==false){is_show_load=true}
    that.$store.commit('setShowLoading', is_show_load)
  
    if(is_show_nomsg!==false){is_show_nomsg=true} 
    that.$store.commit('setShowNoMsg', is_show_nomsg)
  
  
    that.$ajax.post(that.urlPrefix + url, that.$qs.stringify(params))
        .then(function (value) {
            console.log(url, value.data);
            callback(value)
        })
}
//全局参数
Vue.prototype.global_user = function () {

    return this.getLocalObj("user");
}
//获取本地存储
Vue.prototype.getLocalObj = function (name) {
	if (window.localStorage[name] && typeof window.localStorage[name] !== 'undefined' && window.localStorage[name] !== 'undefined') {
		try {

            return JSON.parse(window.localStorage[name])

        } catch(e) {

            return window.localStorage[name]

        }
		
	} else {
		return ""
	}
}
// 获取验证码
Vue.prototype.getCode = function(phone) {
  console.log('getCode', phone)
  if (phone == null || phone === '') {
    this.showDialog('手机号不能为空')
    return
  }
  const reg = /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/
  if (!(reg.test(phone)) || phone.length !== 11) {
   // this.showDialog('请输入正确的手机号!')
   // return
  }
  const that = this
  that.c_ajax({ phone: phone }, 'Code/get_code', function(value) {
    if (value.data.status === 10001) {
      that.getTime()
    }
	if (value.data.status != 10001) {
      that.showDialog(value.data.msg)
    }
  }, true)
}

// 获取验证码倒计时显示
Vue.prototype.getTime = function() {
  const TIME_COUNT = 60
  if (!this.lists.timer) {
    this.lists.count = TIME_COUNT
    this.show.showcount = true
    this.lists.timer = setInterval(() => {
      if (this.lists.count > 0 && this.lists.count <= TIME_COUNT) {
        this.lists.count--
      } else {
        this.show.showcount = false
        clearInterval(this.lists.timer)
        this.lists.timer = null
      }
    }, 1000)
  }
}


// 微信授权 返回带有token的链接
Vue.prototype.go_wx_login = function (u) {

    let n = "parent_id"
    let parent_id = (window.localStorage[n] && typeof window.localStorage[n] !== 'undefined' && window.localStorage[n] !== 'undefined') ? JSON.parse(window.localStorage[n]) : ''

    let arr = u.split("#");
    let return_url = arr[0] + "#/wx_login";

    console.log('微信授权时要返回的url ' + u + ";" + return_url)


    window.location.href = this.urlPrefix + 'WeixinLogin/authorize&parent_id=' + parent_id + '&url=' + encodeURIComponent(u) + '&return_url=' + encodeURIComponent(return_url) + ''
}

// 设置本地存储
Vue.prototype.setLocalObj = function (name, obj) {
    if (typeof obj === 'object') {
        window.localStorage[name] = JSON.stringify(obj)
    } else {
        window.localStorage[name] = obj
    }
}


// 提取链接里的name
Vue.prototype.getQueryString = function (name) {
    const after = window.location.hash.split('?')[1]
    if (after) {
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        const r = after.match(reg)
        if (r !== null) {
            return decodeURIComponent(r[2])
        } else {
            return null
        }
    } else {
        return null
    }
}
// 是否微信 
Vue.prototype.is_weixin = function () {
    const ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
    } else {
        return false
    }
}

//手机盘点
Vue.prototype.isMobile = function () {
    //判断是否为安卓
    if (/android/i.test(navigator.userAgent)) {
        return 'android';
    }
    //判断是否为苹果
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        return 'iPhone';
    }
    // 判断是否是微信
    if (/MicroMessenger/i.test(navigator.userAgent)) {
        //document.write("This is MicroMessenger'browser.");//这是微信平台下浏览器
        return 'weixin';
    }
    return false
}

//语言切换
Vue.prototype.lang_change_defalut = function(obj) {
	console.log("lang_change",obj)
	this.$i18n.locale = obj
	this.lang= obj
	this.setLocalObj("lang",obj)
	console.log("lang_change",this.getLocalObj("lang"))
	
}	
Vue.prototype.lang_change = function(obj) {
	this.lang_change_defalut(obj);
	
	//window.location.reload()
}	


// 全局调整连接
// 首页
Vue.prototype.go_href = function(url, query = {}, txt = '') {
  console.log('go_href', url + query)
  if (txt) {
    this.showDailog(txt)
  }

  // 时间
  if (query.go_href_time) {
    if (url ==-1) {
      setTimeout(() => {
        this.$router.go(-1)
      }, query.go_href_time)
    } else {
      this.$router.push({ name: url, query: query })
    }
  } else {
    if (url ==-1) {
      this.$router.go(-1)
    } else {
      this.$router.push({ name: url, query: query })
    }
  }
}
//全局获取参数
Vue.prototype.GET = function (obj) {
    console.log("GET", obj)
    return this.getQueryString(obj);
}
// 倒退
Vue.prototype.go_back = function () {
    this.$router.go(-1)
}
// 重置
Vue.prototype.empty = function () {
    return ''
}





//实现弹窗的方法
// import DialogComponent from './components/dialogBox.vue'
// const DialogObj = {}

// DialogObj.install = function (Vue) {
//     const DialogConstructor = Vue.extend(DialogComponent)
//     const instance = new DialogConstructor()
//     instance.$mount(document.createElement('div'))
//     document.body.appendChild(instance.$el)
//     Vue.prototype.showDialog = (msg, duration = 1500) => {
//         instance.message = msg
//         instance.visible = true
//         setTimeout(() => {
//             instance.visible = false
//         }, duration)
//     }
// }
// export default DialogObj





