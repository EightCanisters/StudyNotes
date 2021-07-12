## 前言
最近做项目的时候，涉及到一个单点登录，即是项目的登录页面，用的是公司共用的一个登录页面，在该页面统一处理逻辑。最终实现用户只需登录一次，就可以以登录状态访问公司旗下的所有网站。
> 单点登录( Single Sign On ，简称 SSO），是目前比较流行的企业业务整合的解决方案之一，用于多个应用系统间，用户只需要登录一次就可以访问所有相互信任的应用系统。
## 单点登录一般流程
## ![](https://cdn.nlark.com/yuque/0/2021/png/5380242/1625825233817-e81997d6-08d9-4a2a-95fc-d7b1a90e85dd.png#align=left&display=inline&height=531&margin=%5Bobject%20Object%5D&originHeight=712&originWidth=986&size=0&status=done&style=shadow&width=735)

1. 进入该项目某个页面`[http://xxxx.project.com/profile](http://xxxx.project.com/profile)`需要登录，未登录就跳转至SSO登录平台，此时的登录网址 url为`[http://xxxxx.com/login?app_id=project_name_id&redirect_url=http://xxxx.project.com/profile](http://xxxxx.com/login?app_id=project_name_id&redirect_url=http://xxxx.project.com/profile)`，其中`app_id`是后台那边约定定义好的，`redirect_url`是成功授权后指定的回调地址。

1. 输入账号密码且正确后，就会重定向回刚开始进入的页面，并在地址栏带一个参数 `?code=XXXXX`，即是`[http://xxxx.project.com/profile?code=XXXXXX](http://xxxx.project.com/profile?code=XXXXXX)`，code的值是使用一次后即无效，且10分钟内过期

1. 立马获取这个code值再去请求一个api `/access_token/authenticate`，携带参数`{ verify_code: code }`，并且该api已经自带`app_id`和`app_secret`两个固定值参数，通过它去请求授权的api，请求成功后得到返回值`{ access_token: "xxxxxxx", refresh_token: "xxxxxxxx", expires_in: xxxxxxxx }`，存下`access_token`和`refresh_token`到cookie中（localStorage也可以），此时用户就算登录成功了。

1. `access_token`为标准JWT格式，是授权令牌，可以理解就是验证用户身份的，是应用在调用api访问和修改用户数据必须传入的参数（放在请求头headers里），2小时后过期。也就是说，做完前三步后，你可以调用需要用户登录才能使用的api；但是假如你什么都不操作，静静过去两个小时后，再去请求这些api，就会报`access_token`过期，调用失败。

1. 那么总不能2小时后就让用户退出登录吧，解决方法就是两小时后拿着过期的`access_token`和`refresh_token`（`refresh_token`过期时间一般长一些，比如一个月或更长）去请求`/refresh` api，返回结果为`{ access_token: "xxxxx", expires_in: xxxxx }`，换取新的`access_token`，新的`access_token`过期时间也是2小时，并重新存到cookie，循环往复继续保持登录调用用户api了。`refresh_token`在限定过期时间内（比如一周或一个月等），下次就可以继续换取新的`access_token`，但过了限定时间，就算真正意义过期了，也就要重新输入账号密码来登录了。


公司网站登录过期时间都只有两小时（token过期时间），但又想让一个月内经常活跃的用户不再次登录，于是才有这样需求，避免了用户再次输入账号密码登录。
为什么要专门用一个 `refresh_token` 去更新 `access_token` 呢？首先`access_token`会关联一定的用户权限，如果用户授权更改了，这个`access_token`也是需要被刷新以关联新的权限的，如果没有 `refresh_token`，也可以刷新 `access_token`，但每次刷新都要用户输入登录用户名与密码，多麻烦。有了 `refresh_ token`，可以减少这个麻烦，客户端直接用 `refresh_token` 去更新 `access_token`，无需用户进行额外的操作。


## 某个项目中的流程
### 1. 地址栏输入网站首页地址，如`https://www.aaa.com`
#### 1.1 验证`localStorage`是否存在`token`和`user`信息

- 创建vue实例之前：
   - 存在：验证通过，存储`token`到`vuex`里，进入网站内部；
   - 不存在：验证失败，跳转到网站首页（首页右上角有登录注册按钮）；//清洗或注入用户信息
![image.png](https://cdn.nlark.com/yuque/0/2021/png/5380242/1625819101187-8562b9b4-02fd-4828-9480-90acb6ed2973.png#align=left&display=inline&height=668&margin=%5Bobject%20Object%5D&name=image.png&originHeight=668&originWidth=644&size=51329&status=done&style=none&width=644)
- 在导航守卫`router.beforeEach`中做第二次拦截：
   - 不存在（比如多页面网站，在某一个标签页退出登录时，删除了`localStorage`里存储的`token`）：删除`vuex`中存储的`token`信息；
   - 存在：继续；
![image.png](https://cdn.nlark.com/yuque/0/2021/png/5380242/1625819289577-fd39b2ac-3481-4969-8e15-34a61471a933.png#align=left&display=inline&height=436&margin=%5Bobject%20Object%5D&name=image.png&originHeight=436&originWidth=815&size=31511&status=done&style=none&width=815)
- 在axios中做第三次拦截：
   - `axios.create().interceptors.request`：
      - 取出token，放进请求头headers中
![image.png](https://cdn.nlark.com/yuque/0/2021/png/5380242/1625819560575-a7064bdd-24dd-46b7-9004-5ab139c65625.png#align=left&display=inline&height=702&margin=%5Bobject%20Object%5D&name=image.png&originHeight=702&originWidth=756&size=54801&status=done&style=none&width=756)
   - `axios.create().interceptors.response`：
      - 请求成功：返回请求的数据；
      - 请求失败：根据状态码的不同做对应的操作。比如：token过期导致的数据获取失败，需删除`localStorage`和`vueX`中的`token`信息，跳转回登录页面。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/5380242/1625820244932-fbe885d5-a35f-4cd6-a4ca-d7f1e9924d26.png#align=left&display=inline&height=731&margin=%5Bobject%20Object%5D&name=image.png&originHeight=731&originWidth=1557&size=130658&status=done&style=none&width=1557)
#### 1.2 验证失败，即不存在token信息
登录按钮，此时跳转到第2步。


### 2 点击登录按钮，进入sso页面
#### 2.1 点击登录的瞬间

- 页面跳转到[https://sso.aaa.net/oauth2/auth?client_id=hro-client&response_type=code&scope=auto](https://sso.bu97.net/oauth2/auth?client_id=hro-client&response_type=code&scope=auto) openid offline&redirect_uri=http://localhost:8080&state=yKkdc6dxyHGjcaNnrHhe8ZM38djsZRpK，这里将这个链接记为oauth2。
可以看到，携带了参数`client_id`, `response_type`, `scope`, `redirect_uri`。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/5380242/1625822317559-772e691b-4345-4678-a81a-1aff3c72056f.png#align=left&display=inline&height=144&margin=%5Bobject%20Object%5D&name=image.png&originHeight=144&originWidth=339&size=8022&status=done&style=none&width=339)
- 重定向到sso的登录页；
#### 2.2 输入用户名密码，登录

- 输入用户名密码，点击登录；
- 登录成功，返回的数据包含`redirect_to`字段：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/5380242/1625822792102-642bab00-e128-41cf-aa97-0b821cce425c.png#align=left&display=inline&height=601&margin=%5Bobject%20Object%5D&name=image.png&originHeight=601&originWidth=1119&size=71986&status=done&style=none&width=1119)
- 获取到`redirect_to`字段内容后，跳转到此字段链接。然后会自动重定向到最开始的网站`[https://www.aaa.com](https://www.aaa.com)/?code=xxxxxxxxx`



### 3. 携带code参数回到网站首页
#### 3.1 创建vue实例之前，初始化auth0实例

- auto0.js：
```javascript
import Vue from 'vue'
import {
  get
} from '@/services/serve'
import Root from '../config/serve-config'

const loginApi = '/user/oauth2_login'

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname)

let instance

export const getAuth0Instance = () => instance

export const useAuth0 = ({
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  onError = () => {},
  loadingChanged = () => {}
}) => {
  if (instance) return instance

  instance = new Vue({
    data() {
      return {
        loading: false,
        isAuthenticated: false,
        user: {},
        opts: {
          host: Root.oAuthUrl,
          clientID: Root.clientId,
          redirectUri: this.getRedirectUrl()
        }
      }
    },
    watch: {
      loading(is) {
        loadingChanged(is)
      }
    },
    methods: {
      login() {
        const {
          redirectUri,
          clientID,
          host
        } = this.opts
        // window.location.href = `${ host }/oauth2/auth?client_id=${clientID}&response_type=code&scope=auto openid offline&redirect_uri=${redirectUri}&state=${generateNonce()}`;
        alert(`${ host }/oauth2/auth?client_id=${clientID}&response_type=code&scope=auto openid offline&redirect_uri=${redirectUri}&state=${generateNonce()}`)
      },
      register() {
        const {
          redirectUri,
          clientID,
          host
        } = this.opts
        window.location.href = `${ host }/oauth2/auth?client_id=${clientID}&response_type=code&scope=auto openid offline&redirect_uri=${redirectUri}&state=${generateNonce()}&register=true`;
      },
      getRedirectUrl() {
        const origin = document.location.origin
        const fontBase = Root.baseUrl || ''
        const redirectUrl = `${origin}${fontBase.slice(0, fontBase.length - 1)}`
        return redirectUrl
      },
      getToken(search) {
        const params = search.split('&')
        let lg = params.length
        let code
        while (lg--) {
          const p = params[lg]
          const val = p.split('=')
          if (val[0] === 'code') {
            code = val[1]
            break
          }
        }
        if (code) {
          return get(loginApi, {
            code,
            redirect_uri: this.opts.redirectUri
          })
        } else {
          return Promise.reject(new Error('code is missing'))
        }
      },
      logout() {
        return get('/user/oauth2_logout')
      },
      openClient({
        clientId,
        scope,
        redirectUri
      }) {
        const uri = `${ this.opts.host }/oauth2/auth?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=${redirectUri}&state=${generateNonce()}`;
        window.open(uri, '_blank');
      }
    },
    async created() {
      const search = document.location.search
      if (search.includes('code=')) {
        this.loading = true
        const code = search.slice(1)
        if (code) {
          this.getToken(code).then((res) => {
            this.loading = false
            this.isAuthenticated = true
            onRedirectCallback(res)
          }).catch(err => {
            this.loading = false
            onError(err)
          })
        }
      }
    }
  })

  return instance
}

function generateNonce(len) {
  len = len || 32
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

export const Auth0Plugin = {
  install(Vue, options) {
    Vue.prototype.$auth0 = useAuth0(options)
  }
}
```

- 初始化auth0
![image.png](https://cdn.nlark.com/yuque/0/2021/png/5380242/1625824580484-04ba943f-4811-4dea-8baa-1318cd6787bb.png#align=left&display=inline&height=233&margin=%5Bobject%20Object%5D&name=image.png&originHeight=233&originWidth=734&size=21628&status=done&style=none&width=734)
#### 3.2 在auth0的created里头，拿到code参数后用它去获取token；
#### 3.3 token获取成功，存储到localStorage和vueX中，进入网站内部。


## 参考
[https://juejin.cn/post/6854573219119104014](https://juejin.cn/post/6854573219119104014)
