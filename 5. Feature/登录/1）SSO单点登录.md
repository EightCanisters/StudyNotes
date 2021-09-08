## 1. 前言

最近做项目的时候，涉及到一个单点登录，即是项目的登录页面，用的是公司共用的一个登录页面，在该页面统一处理逻辑。最终实现用户只需登录一次，就可以以登录状态访问公司旗下的所有网站。
> 单点登录( Single Sign On ，简称 SSO），是目前比较流行的企业业务整合的解决方案之一，用于多个应用系统间，用户只需要登录一次就可以访问所有相互信任的应用系统。

## 2. 单点登录一般流程

![](https://cdn.nlark.com/yuque/0/2021/png/5380242/1625825233817-e81997d6-08d9-4a2a-95fc-d7b1a90e85dd.png#height=531&id=csdQi&originHeight=712&originWidth=986&originalType=binary&ratio=1&size=0&status=done&style=shadow&width=735)

1. 进入该项目某个页面`[http://xxxx.project.com/profile](http://xxxx.project.com/profile)`需要登录，未登录就跳转至SSO登录平台，此时的登录网址 url为`[http://xxxxx.com/login?app_id=project_name_id&redirect_url=http://xxxx.project.com/profile](http://xxxxx.com/login?app_id=project_name_id&redirect_url=http://xxxx.project.com/profile)`，其中`app_id`是后台那边约定定义好的，`redirect_url`是成功授权后指定的回调地址。
2. 输入账号密码且正确后，就会重定向回刚开始进入的页面，并在地址栏带一个参数 `?code=XXXXX`，即是`[http://xxxx.project.com/profile?code=XXXXXX](http://xxxx.project.com/profile?code=XXXXXX)`，code的值是使用一次后即无效，且10分钟内过期
3. 立马获取这个code值再去请求一个api `/access_token/authenticate`，携带参数`{ verify_code: code }`，并且该api已经自带`app_id`和`app_secret`两个固定值参数，通过它去请求授权的api，请求成功后得到返回值`{ access_token: "xxxxxxx", refresh_token: "xxxxxxxx", expires_in: xxxxxxxx }`，存下`access_token`和`refresh_token`到cookie中（localStorage也可以），此时用户就算登录成功了。
4. `access_token`为标准JWT格式，是授权令牌，可以理解就是验证用户身份的，是应用在调用api访问和修改用户数据必须传入的参数（放在请求头headers里），2小时后过期。也就是说，做完前三步后，你可以调用需要用户登录才能使用的api；但是假如你什么都不操作，静静过去两个小时后，再去请求这些api，就会报`access_token`过期，调用失败。
5. 那么总不能2小时后就让用户退出登录吧，解决方法就是两小时后拿着过期的`access_token`和`refresh_token`（`refresh_token`过期时间一般长一些，比如一个月或更长）去请求`/refresh` api，返回结果为`{ access_token: "xxxxx", expires_in: xxxxx }`，换取新的`access_token`，新的`access_token`过期时间也是2小时，并重新存到cookie，循环往复继续保持登录调用用户api了。`refresh_token`在限定过期时间内（比如一周或一个月等），下次就可以继续换取新的`access_token`，但过了限定时间，就算真正意义过期了，也就要重新输入账号密码来登录了。

公司网站登录过期时间都只有两小时（token过期时间），但又想让一个月内经常活跃的用户不再次登录，于是才有这样需求，避免了用户再次输入账号密码登录。
为什么要专门用一个 `refresh_token` 去更新 `access_token` 呢？首先`access_token`会关联一定的用户权限，如果用户授权更改了，这个`access_token`也是需要被刷新以关联新的权限的，如果没有 `refresh_token`，也可以刷新 `access_token`，但每次刷新都要用户输入登录用户名与密码，多麻烦。有了 `refresh_ token`，可以减少这个麻烦，客户端直接用 `refresh_token` 去更新 `access_token`，无需用户进行额外的操作。

## 3. 参考

[https://juejin.cn/post/6854573219119104014](https://juejin.cn/post/6854573219119104014)
