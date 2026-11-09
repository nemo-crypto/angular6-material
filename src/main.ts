import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
 providers: [provideZonelessChangeDetection(), provideRouter([
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  { path: 'overview', loadComponent: () => import('./app/pages/overview.component').then((m) => m.OverviewComponent) },
  { path: 'courses', loadComponent: () => import('./app/pages/courses.component').then((m) => m.CoursesComponent) },
  { path: 'guide', loadComponent: () => import('./app/pages/guide.component').then((m) => m.GuideComponent) },
  { path: '**', redirectTo: 'overview' },
 ])],
}).catch((error: unknown) => { console.error('应用初始化失败', error); document.body.textContent = '页面加载失败，请刷新后重试。'; });
