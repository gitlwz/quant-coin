# quant 项目包-纯净版 使用文档


------
## 一、目录结构
     |---config 
     |--- public
     |--- scripts
     |--- src
     |      |--- assets              #  图片等本地静态资源
     |      |--- common
     |          |--- config.js       #  title、logle等资源配置项
     |          |--- menu.js         #  菜单配置项
     |          |--- router.js       #  路由设置项
     |      |--- components          #  自定义的业务通用组件
     |      |--- layouts             #  通用布局
     |      |--- models              #  全局各个页面的modal
     |      |--- routes              #  各个业务页面详细信息
     |      |--- services            #  后台接口服务
     |      |--- theme               #  页面主题样式    
     |      |--- utils               #  工具库
     |      |--- index.js            #  项目入口
     |      |--- index.less          #  项目加载样式
     |      |--- router.js           #  路由配置
     |--- .babelrc
     |--- .gitignore
     |--- README.md
     |--- package.json           
     |--- yarn.lock

## 二、新增页面
#### 1、增加js、less文件
  在src/routes下新建页面的js、以及less文件，如果相关页面有多个，可以新建一个文件夹来放置相关文件。
  引入组件的时候只需要在js文件中 ：
```
import { Button } from 'quant-ui';
```
#### 2、将文件加入菜单和路由
增加菜单项目需要在src/common/menu.js中如下方式添加即可
```
{
    name: '用户权限管理',
    icon: 'icon',
    path: 'user',
    key: "menu:user",
    authority: "admin",
    children: [
        {
            name: '角色管理',
            path: 'roleManagement',
            key: "menu:userRight/roleManagement",
        },
        {
            name: '用户管理',
            path: 'usermanage',
            key: "menu:userRight/usermanage",
        },
    ],
},
```
增加路由需要在src/common/router.js中如下方式添加即可
```
'/home': {
    component: dynamicWrapper(app, ["home","global"], () => import('../routes/home/index.js')),
},
```
其中数组[]表示绑定的modal import表示页面的入口文件路径
#### 3、新增 model、service
布局及路由都配置好之后，回到之前新建的 js中，可以开始写业务代码了！如果需要用到数据流，还需要在 src/models src/services 中建立相应的 model 和 service  **具体参考项目包中的modal和services的写法**

## 三、请求的发送（和服务端进行交互）

请求流程：

- UI 组件交互操作；

- 调用 model 的 effect；

- 调用统一管理的 services；

- 使用封装的 request.js 发送请求；

- 获取服务端返回；

- 然后改变 state；

- 更新 model。

后台提供的api接口统一放在src/servsrcs/api.js中

    |--services/
    |    |--  api.js
调用的modal写法大致如下：
```

import { GET, POST } from '../utils/request';
import api from '../services/api.js';
export default {
    namespace: 'xxx',
    state: {
        dataSource: [],
    },
    effects: {
        *find({ payload }, { call, put }) {
            const { errorCode, data } = yield call(POST, api.xxx.yyy, [payload]);
            if (errorCode == 0) {
                yield put({
                    type: "save",
                    payload: {
                        dataSource: data
                    }
                })
        }
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state, ...payload
            };
        },
    },
    subscriptions: {

    },
};

```

**yield call(POST, api.xxx.yyy, [payload]);表示返送一个POST请求，请求的api（url）为 api.xxx.yyy 参数为payload**

#### 页面调用effects方式如下
##### 1、连接到modal
```
export default connect(({ xxx}) => {     //链接到xxx modal上
    const { dataSource } = xxx;          //拿到xxx 的dataSource
    return {
        dataSource,
    }
})(
    Form.create()()
)
```
##### 2、交互时调用
```
 dispatch({
            type: "xxx/find",     //调用xxx下的find
            payload: {            //参数为对象
                a: false       
            }
        })
```

### ui组件的使用
**使用请参考quant-ui http://192.168.100.184:8080/build/#/home**