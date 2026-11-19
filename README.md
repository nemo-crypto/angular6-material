# Learn Studio · Angular Material 教学版

**[在线体验 · 打开 Learn Studio](https://nemo-crypto.github.io/angular6-material/)**

将旧 Angular 6 管理后台重新整理为 **Angular 21 + Material + 独立组件 + Signals** 的可运行教学 Demo。目录名称保留为 angular6-material，但当前工具链不再是 Angular 6；这不是旧业务接口的兼容升级。

旧登录、配置管理和业务后端调用已移除，课程内容为独立编写的示例。无需数据库、账户或旧服务，数据只保存在当前浏览器。

<!-- BEGIN project-discovery -->
## 项目定位与实践入口

Angular 21 + Material tutorial with standalone components, Signals, reactive forms and LocalStorage. Angular 教学 Demo：课程管理、响应式布局与 Playwright 测试。

适合从以下入口阅读实现与接入条件：

- [页面与表单](src/app/pages/)
- [Signals 状态管理](src/app/core/course-store.ts)
- [教学路线](docs/learning-path.md)
<!-- END project-discovery -->

## 快速开始

Node.js 22.12+，推荐 Node 24。

```sh
npm ci
npm start
```

打开 http://127.0.0.1:4200 。

- **学习总览**：课程数量、完成数量、课时进度和学习清单。
- **课程管理**：类型化响应式表单、新增、完成、搜索、筛选和确认删除。
- **搭建路线**：六个工程主题与对应源码位置。

课程状态保存在 LocalStorage，刷新后恢复。存储损坏或不可写时显示明确提示；恢复示例前需要确认。所有交互使用真实 Material 组件，没有伪造后端请求。

## 结构

```text
src/main.ts                     独立应用启动、懒加载路由
src/app/app.component.ts         响应式壳与主导航
src/app/core/course.ts           类型契约、校验、统计纯函数
src/app/core/course-store.ts     Signals 状态与本地持久化
src/app/pages/                  总览、课程与教学路线
src/app/shared/                 Material 确认对话框
tests/                          领域单元测试、浏览器流程
```

## 命令

```sh
npm test                        # 领域逻辑和存储数据校验
npm run build                   # 严格模板检查与生产构建
npm run check                   # 单元测试 + 构建
npx playwright install chromium
npm run test:e2e                 # 自动启动独立端口的开发服务
```

生产产物在 `dist/learning/browser`。部署为静态 SPA 时，未知路径需回退到 index.html，确保刷新 `/courses` 等路由仍可访问。

## 核心教学点

1. 使用 bootstrapApplication 与独立组件，页面通过 loadComponent 懒加载。
2. Signals 保存源状态，computed 派生统计和筛选，不手工同步多个计数器。
3. Reactive Forms 提供控件校验，领域函数再次保护输入边界。
4. Material 提供表单、按钮、复选框、对话框和反馈，不依赖远程图标字体。
5. JSON 反序列化后按版本和结构校验，不把任意数据直接断言为课程数组。
6. 桌面侧栏与移动顶部导航共用路由；测试验证 360/768/1440px 布局。

## 边界

LocalStorage 是单浏览器演示存储，不适合敏感数据或多用户共享。最多 100 节课程，每节 1–600 分钟，名称 1–60 字符。当前没有用户账号、跨标签同步或后端 API；浏览器禁用存储时仅保持内存状态。

文档：[架构与技术取舍](docs/architecture.md) · [六节实践课](docs/learning-path.md)。旧源码不在当前目录中归档，但可能仍存在 Git 历史里；教学版发布未改写旧 Git 历史。
