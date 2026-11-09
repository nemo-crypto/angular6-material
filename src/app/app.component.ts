import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CourseStore } from './core/course-store';

@Component({ selector: 'app-root', standalone: true, imports: [RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule], template: `
 <a class="skip-link" href="#main">跳至主要内容</a>
 <aside class="sidebar"><a routerLink="/overview" class="brand"><span class="brand-icon">L.</span><span>Learn Studio<small>ANGULAR MATERIAL LAB</small></span></a>
 <div class="nav-caption">学习工作区</div><nav aria-label="主导航"><a routerLink="/overview" routerLinkActive="active" ariaCurrentWhenActive="page"><span>◈</span>学习总览</a><a routerLink="/courses" routerLinkActive="active" ariaCurrentWhenActive="page"><span>▤</span>课程管理</a><a routerLink="/guide" routerLinkActive="active" ariaCurrentWhenActive="page"><span>↗</span>搭建路线</a></nav>
 <div class="sidebar-note"><span>● 独立运行 · 本地数据</span><p>从清晰的组件边界开始，逐步建立完整工程。</p></div></aside>
 <div class="shell"><header class="topbar"><span>个人学习空间 <b>/</b> 教学 Demo</span><span class="version">Angular 21 + Material</span></header><main id="main">
 @if (store.notice()) { <div role="status" class="notice">{{ store.notice() }}</div> }
 <router-outlet /></main><footer>Learn Studio / 从组件到工程 <span>示例数据 · 无业务后端依赖</span></footer></div>
` })
export class AppComponent { readonly store = inject(CourseStore); }
