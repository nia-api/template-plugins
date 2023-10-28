<h1 align="center">示例插件</h1>

这是 `nia-api` 的示例路由插件

### 目录结构

```
template-plugins
├─ index.ts
├─ README.md
├─ Docs
└─ router
 └─ helloWorld.ts
└─ utils
 └─ getMsg.ts
 └─ config.ts
└─ template
 └─ _config.yaml
```

### 接口说明

由全局设置，路由的基础入口为 `/插件文件夹名/` ，故此时路径为 `/template-plugins/`

-   在 `index.ts` 中，我们使用了 `/router/helloWorld.ts` 的子路由，并且设置了入口为 `/helloWorld` ，故此时路径为 `/template-plugins/helloWorld`
-   在 `helloWorld.ts` 中，我们定义了一个 Get 接口，接口路径为 `/sayHelloWorld` ，故该接口的最终路径为 `/template-plugins/helloWorld/sayHelloWorld`

### 接口文档

详见 `Docs` 文件夹中的 `apis.md`

[接口文档](https://github.com/nia-api/template-plugins/tree/main/Docs)

### 文件代码

`index.ts`

```typescript
// 引入 Router 实例
import { Router } from 'express'

// 实例化 Router 对象
const router = Router()

// 使用路由 （ 定义子路由路径 ） /template-plugins/helloWorld
router.use('/helloWorld', async (req, res, next) =>
    (await import('./router/helloWorld')).default(req, res, next)
)

// 导出路由插件简介名称说明 （ 仅用于显示方便辨认 ）
export const Name = '示例模块'

// 导出默认路由
export default router
```

`helloWorld.ts`

```typescript
import { Router } from 'express'
import { getMsg } from './../utils/getMsg'

const router = Router()

// path /template-plugins/helloWorld/sayHelloWorld
router.get('/sayHelloWorld', (request, response) => {
    response.send(getMsg())
})

export default router
```

`getMsg.ts`

```typescript
import { config } from './../utils/config'

export const getMsg = () => {
    return config.str
}
```

`config.ts`

```typescript
import { useDataFile } from './../../../hooks/useDataFile'
import yaml from 'yaml'
import fs from 'fs'

import type { Config } from './../types/config'

const { getFile } = useDataFile('template-plugins')

const defaultConfig = fs.readFileSync(__dirname + './../template/_config.yaml', 'utf-8')

export const config = yaml.parse(getFile('./config.yaml', defaultConfig)) as Config
```

截至 2023.10.28 新数据文件钩子更新后，需使用 `useDataFile` 来与真实的物理文件进行互动，而不是直接调用 `config` 全局配置文件

### 路由使用说明

使用 `import`

```typescript
router.use('/helloWorld', async (req, res, next) =>
    (await import('./router/helloWorld')).default(req, res, next)
)
```

使用 `require` （尽可能使用 `import` 来代替 `require` ）

```typescript
// eslint-disable-next-line @typescript-eslint/no-var-requires
router.use('/helloWorld', require('./router/helloWorld').default)
```
