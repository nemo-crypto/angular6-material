# Angular Material 管理控制台

基于 Angular 6、Angular Material、RxJS 与 ECharts 的管理后台示例，包含登录、系统管理、节点及服务配置、区块与资产查询。工程名称为 `mdbui`，前端通过业务服务访问配套后端。

## 功能与代码入口

| 模块 | 入口 | 说明 |
|---|---|---|
| 应用装配 | [app.module.ts](src/app/app.module.ts) | 浏览器、表单、HTTP、布局、图标与加载组件 |
| 业务路由 | [lazyloader.routes.ts](src/app/auth/lazyloader.routes.ts) | 概览、用户、配置、区块及资产查询 |
| 业务服务 | `src/app/services/` | 登录、用户、配置与统一请求封装 |
| 通用组件 | `src/app/modules/` | 对话框、图标和业务组件 |
| 环境加载 | [environmentLoader.ts](src/environments/environmentLoader.ts) | 启动时读取静态环境配置，失败时使用默认配置 |

## 环境与启动

当前依赖为 Angular CLI 6、TypeScript 2.7 等历史工具链，未声明 Node engines；应使用已验证的隔离环境，依赖安装结果需自行记录。本次文档检查未安装或升级依赖。

在项目目录执行：

```bash
npm ci
npm start
```

开发服务器由 [angular.json](angular.json) 配置为 `0.0.0.0:4201`，浏览器访问 `http://localhost:4201`，不是脚手架默认的4200端口。

## 环境配置与业务依赖

启动时读取 `src/assets/environments/environment.json`，默认配置位于 `src/environments/`。先核对后端地址、登录协议及业务接口，再验证登录和数据页面。此目录不包含相应后端与数据库，页面可打开不代表服务可用。

## 构建与检查

```bash
npm run build
npm run build -- --prod
npm test
npm run lint
```

构建目录为 `dist/mdbui/`。测试配置使用 Karma/Jasmine，lint 使用 TSLint。`package.json` 中的 `e2e` 脚本需要核实实际 builder 和测试配置后使用，不能仅凭脚本名称判断已具备端到端覆盖。

## 开发与验收

新增页面应在业务路由中注册，服务交互集中在 services，组件样式沿用现有 Material 与主题结构。验收时分别检查环境加载、登录状态、路由切换、接口异常和生产构建。本轮只核对源码、配置和命令存在性，未执行应用运行或测试。
