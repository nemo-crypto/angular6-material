import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CourseStore } from '../core/course-store';

@Component({ standalone: true, imports: [RouterLink, MatButtonModule, MatProgressBarModule], template: `
 <div class="page-heading"><div><span class="eyebrow">YOUR LEARNING JOURNEY</span><h1>每一小步，都在构建能力。</h1><p>从组件、状态到工程实践，保持自己的学习节奏。</p></div><a mat-flat-button routerLink="/courses">管理课程 →</a></div>
 <section class="stats"><article><span>全部课程</span><strong>{{ store.stats().total }}<small> 节</small></strong><i>▤</i></article><article><span>已完成</span><strong>{{ store.stats().completed }}<small> 节</small></strong><i>✓</i></article><article><span>累计学习</span><strong>{{ store.stats().doneMinutes }}<small> 分钟</small></strong><i>◷</i></article></section>
 <section class="hero-card"><div><span class="eyebrow">CONTINUE EXPLORING</span><h2>今天，继续你的下一节课。</h2><p>理解一个概念，完成一次实践。学习进度按课程分钟数计算。</p><a mat-stroked-button routerLink="/courses">查看学习清单 ↗</a></div><div class="progress-ring"><strong>{{ store.stats().progress }}<small>%</small></strong><span>课时进度</span></div></section>
 <div class="overview-grid"><section class="card"><div class="section-heading"><h2>当前学习清单</h2><span>{{ store.stats().total }} 节课程</span></div>
 @for (course of store.courses(); track course.id) { <div class="lesson-row"><span class="lesson-mark" [class.done]="course.completed">{{ course.completed ? '✓' : '○' }}</span><div><strong>{{ course.title }}</strong><small>{{ course.category }} · {{ course.minutes }} 分钟</small></div><span class="status-chip">{{ course.completed ? '已完成' : '待学习' }}</span></div> } @empty { <p class="empty">还没有课程，前往课程管理添加第一节课。</p> }
 </section><aside class="card path-card"><span class="eyebrow">BUILD SOMETHING REAL</span><h2>不是只看页面，<br>更要理解架构。</h2><p>独立组件负责视图，Signals 负责状态，领域函数负责规则。</p><mat-progress-bar mode="determinate" [value]="store.stats().progress" aria-label="课时完成进度" /><a mat-button routerLink="/guide">查看搭建路线 →</a><div class="path-tags"><span>Standalone</span><span>Signals</span><span>Reactive Forms</span></div></aside></div>
` })
export class OverviewComponent { readonly store = inject(CourseStore); }
