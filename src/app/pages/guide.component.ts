import { Component } from '@angular/core';
@Component({ standalone: true, template: `
 <div class="page-heading"><div><span class="eyebrow">FROM COMPONENTS TO ARCHITECTURE</span><h1>循序渐进，搭起你的框架。</h1><p>每个功能，都对应一个可以动手验证的工程概念。</p></div></div>
 <section class="guide-grid">@for (lesson of lessons; track lesson.title; let index = $index) { <article class="card guide-card"><span class="lesson-number">0{{ index + 1 }}</span><h2>{{ lesson.title }}</h2><p>{{ lesson.description }}</p><code>{{ lesson.file }}</code></article> }</section>
 <div class="notice">本教学版已从 Angular 6 升级到 Angular 21。旧业务接口、登录和管理后台实现不在当前主线中。</div>
` })
export class GuideComponent {
 readonly lessons = [
  { title: '独立组件与路由', description: '从 bootstrapApplication 开始，理解独立组件和按页面懒加载。', file: 'src/main.ts' },
  { title: '数据契约与纯函数', description: '类型负责约束输入，领域函数负责验证、统计与边界处理。', file: 'core/course.ts' },
  { title: 'Signals 与计算状态', description: '使用 signal 保存状态，用 computed 派生统计，避免重复维护数字。', file: 'core/course-store.ts' },
  { title: '类型化响应式表单', description: '将校验放在表单与领域边界，呈现清晰的错误反馈。', file: 'pages/courses.component.ts' },
  { title: 'Material 与可访问交互', description: '使用组件库完成对话框、确认与反馈，不依赖远程图标字体。', file: 'shared/confirm.component.ts' },
  { title: '从单元到浏览器测试', description: '纯函数测试验证规则，浏览器测试验证实际操作与响应式页面。', file: 'tests/' },
 ];
}
