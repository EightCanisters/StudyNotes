## 1. HRO登录流程图

![](http://rc9frlwp7.hn-bkt.clouddn.com/hro-%E7%99%BB%E5%BD%95%E6%B5%81%E7%A8%8B.png#id=E24kg&margin=%5Bobject%20Object%5D&originHeight=706&originWidth=1150&originalType=binary&ratio=1&status=done&style=shadow)

## 2. HRO完整登录流程

### 2.1. 地址栏输入网站首页地址，如`http://localhost:8080`

#### 验证`localStorage`是否存在`token`和`user`信息

- 创建vue实例之前：
  - 存在：验证通过，存储`token`到`vuex`里，进入网站内部；
  - 不存在：验证失败，跳转到网站首页（首页右上角有登录注册按钮）；//清洗或注入用户信息
![image.png](https://cdn.nlark.com/yuque/0/2021/png/5380242/1625819101187-8562b9b4-02fd-4828-9480-90acb6ed2973.png#height=668&id=w7nAY&margin=%5Bobject%20Object%5D&name=image.png&originHeight=668&originWidth=644&originalType=binary&ratio=1&size=51329&status=done&style=none&width=644)
- 在导航守卫`router.beforeEach`中做第二次拦截：
  - 不存在（比如多页面网站，在某一个标签页退出登录时，删除了`localStorage`里存储的`token`）：删除`vuex`中存储的`token`信息；
  - 存在：继续；
![image.png](https://cdn.nlark.com/yuque/0/2021/png/5380242/1625819289577-fd39b2ac-3481-4969-8e15-34a61471a933.png#height=436&id=XeQdf&margin=%5Bobject%20Object%5D&name=image.png&originHeight=436&originWidth=815&originalType=binary&ratio=1&size=31511&status=done&style=none&width=815)
- 在axios中做第三次拦截：
  - `axios.create().interceptors.request`：
    - 取出token，放进请求头headers中
![image.png](https://cdn.nlark.com/yuque/0/2021/png/5380242/1625819560575-a7064bdd-24dd-46b7-9004-5ab139c65625.png#height=702&id=HtU5V&margin=%5Bobject%20Object%5D&name=image.png&originHeight=702&originWidth=756&originalType=binary&ratio=1&size=54801&status=done&style=none&width=756)
  - `axios.create().interceptors.response`：
    - 请求成功：返回请求的数据；
    - 请求失败：根据状态码的不同做对应的操作。比如：token过期导致的数据获取失败，需删除`localStorage`和`vueX`中的`token`信息，跳转回登录页面。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/5380242/1625820244932-fbe885d5-a35f-4cd6-a4ca-d7f1e9924d26.png#height=731&id=hUhOD&margin=%5Bobject%20Object%5D&name=image.png&originHeight=731&originWidth=1557&originalType=binary&ratio=1&size=130658&status=done&style=none&width=1557)

#### 验证失败，即不存在token信息

登录按钮，此时跳转到第2步。

### 2.2. 点击登录按钮，进入sso页面

#### 网站前端(<http://localhost:8080)向sso发起oauth2>授权请求

- 点击登录的瞬间，前端向sso**发起oauth2授权请求**：
页面跳转到[https://${sso-host}/oauth2/auth?client_id=hro-client&response_type=code&scope=auto](https://sso.bu97.net/oauth2/auth?client_id=hro-client&response_type=code&scope=auto) openid offline&redirect_uri=<http://localhost:8080&state=yKkdc6dxyHGjcaNnrHhe8ZM38djsZRpK，这里将这个链接记为oauth2>。
可以看到，携带了参数`client_id`, `response_type`, `scope`, `redirect_uri`：
  - "client_id": id; //客户端身份标识；
  - "response_type": "code",  //code 表示要求返回授权码，token 表示直接返回令牌
  - "scope": "offline auto openid",     // auto是sso登录时跳过用户确认环节.是必须的.多个scope使用空格隔开，可在此添加一些业务代码，做页面定向
  - "redirect_uri": "https://your-client-endpoint/callback"  // 重定向地址
![image.png](https://cdn.nlark.com/yuque/0/2021/png/5380242/1625822317559-772e691b-4345-4678-a81a-1aff3c72056f.png#height=144&id=ru344&margin=%5Bobject%20Object%5D&name=image.png&originHeight=144&originWidth=339&originalType=binary&ratio=1&size=8022&status=done&style=none&width=339)

#### 授权成功，重定向到登录

- 成功会重定向到sso的登录页：<https://${sso-host}/login?login_challenge=7bb518c4eec2454dbb289f5fdb4c0ee2>
- 输入用户名密码，点击登录；
- 登录成功，返回的数据包含`redirect_to`字段：<https://${sso-host}/oauth2/auth?client_id=xxx&login_verifier=xxx&redirect_uri>=网站链接，该字段包含以下参数：
  - client_id
  - login_verifier
  - redirect_uri：是跳转sso之前的网站链接，它又包含以下参数：
    - response_type
    - scope
    - state

![image.png](https://cdn.nlark.com/yuque/0/2021/png/5380242/1625822792102-642bab00-e128-41cf-aa97-0b821cce425c.png#height=601&id=C38pW&margin=%5Bobject%20Object%5D&name=image.png&originHeight=601&originWidth=1119&originalType=binary&ratio=1&size=71986&status=done&style=none&width=1119)

#### 登录完成，会根据redirect_uri发起回调，并在uri附上授权码code

- 获取到`redirect_to`字段内容后，跳转到此字段链接，获取code。
- 然后会自动重定向到最开始的网站`http://localhost:8080/?code=xxxxxxxxx`

​

### 2.3. 携带code参数回到<http://localhost:8080>

#### 回到<http://localhost:8080：创建vue实例之前，初始化auth0>实例

- auto0.js：created里头根据是否有code字段决定是否去获取token

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
    asy nc created() {
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

- 初始化auth0：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/5380242/1625824580484-04ba943f-4811-4dea-8baa-1318cd6787bb.png#height=233&id=IAc9w&margin=%5Bobject%20Object%5D&name=image.png&originHeight=233&originWidth=734&originalType=binary&ratio=1&size=21628&status=done&style=none&width=734)

#### 前端把授权码(上文的code)传给hro的后端登录接口，获取令牌token获取token

- 在auth0的created里头，拿到code参数后用它去获取token：

```json
GET /user/oauth2_login?redirect_uri=<redirect_uri>&&code=<code>
```

- 后端利用授权码code访问sso的token endpoint. 获取令牌：

```json
  POST /${sso-host}/oauth2/token
  --headers {
      "Authorization": "Basic ${base64encode(clientId:clientSecret)}" ,
      "Content-Type": "application/x-www-form-urlencoded"
  }
  --body {
      "grant_type": "authorization_code",
      "code": ${code},
      "redirect_uri: http://172.24.101.127/main"
  }

// 响应：
{
  "access_token": "zQ9H.ypckeS0.EwyPM",
  "expires_in": 172799,     # 单位秒
  "scope": "offline auto openid",
  "token_type": "bearer"
}
```

- 后端根据上一步的access_token调用sso的用户信息接口.并匹配sso和hro绑定的账户信息。给hro前端返回用户的token

```json
  {
      "business_code": 0,
      "message": "success",
      "data": {
          "token": "aaaaa.bbbbb.cccc",
          "scope": "aaa"      # 为了在登录后跳转到对应页面，后端带上此字段一起返回。前端可以根据scope做对应的业务逻辑。
      }
  }
```

- token获取成功，存储到localStorage和vueX中，进入网站内部。在以后的api请求中，需在头部Authorization字段上添加该token：

![](http://rc9frlwp7.hn-bkt.clouddn.com/sso-api-with-token.png#id=obAMw&margin=%5Bobject%20Object%5D&originHeight=342&originWidth=708&originalType=binary&ratio=1&status=done&style=shadow)
