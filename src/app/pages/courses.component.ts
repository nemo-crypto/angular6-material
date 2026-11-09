import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseStore } from '../core/course-store';
import { categories, type Category } from '../core/course';
import { ConfirmComponent } from '../shared/confirm.component';

@Component({ standalone: true, imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule], template: `
 <div class="page-heading"><div><span class="eyebrow">LEARNING COLLECTION</span><h1>把学习计划，变成行动。</h1><p>添加课程，标记进度。所有数据只保存在当前浏览器。</p></div><button mat-stroked-button (click)="reset()">恢复示例</button></div>
 <section class="card course-form"><div class="section-heading"><h2>添加一节课程</h2><span>响应式表单示例</span></div><form [formGroup]="form" (ngSubmit)="add()"><mat-form-field appearance="outline"><mat-label>课程名称</mat-label><input matInput formControlName="title" maxlength="60"><mat-error>请输入 1–60 个字符</mat-error></mat-form-field><mat-form-field appearance="outline"><mat-label>分类</mat-label><mat-select formControlName="category">@for (category of categories; track category) { <mat-option [value]="category">{{ category }}</mat-option> }</mat-select></mat-form-field><mat-form-field appearance="outline"><mat-label>时长（分钟）</mat-label><input matInput type="number" formControlName="minutes" min="1" max="600" step="1"><mat-error>请输入 1–600 的整数</mat-error></mat-form-field><button mat-flat-button type="submit">＋ 添加课程</button></form>@if (error()) { <p role="alert" class="error">{{ error() }}</p> }</section>
 <section class="card"><div class="section-heading"><h2>我的课程</h2><span>{{ filtered().length }} / {{ store.courses().length }} 节</span></div><div class="filters"><mat-form-field appearance="outline"><mat-label>搜索课程</mat-label><input matInput [value]="search()" #searchInput (input)="search.set(searchInput.value)"></mat-form-field><mat-form-field appearance="outline"><mat-label>完成状态</mat-label><mat-select [value]="status()" (selectionChange)="status.set($event.value)"><mat-option value="all">全部课程</mat-option><mat-option value="pending">待学习</mat-option><mat-option value="done">已完成</mat-option></mat-select></mat-form-field></div>
 @for (course of filtered(); track course.id) { <div class="lesson-row editable"><mat-checkbox [checked]="course.completed" (change)="store.toggle(course.id)" [aria-label]="'完成 ' + course.title" /><div><strong [class.completed-title]="course.completed">{{ course.title }}</strong><small>{{ course.category }} · {{ course.minutes }} 分钟</small></div><button mat-button class="delete" [attr.aria-label]="'删除 ' + course.title" (click)="remove(course.id)">删除</button></div> } @empty { <div class="empty"><h3>暂无符合条件的课程</h3><p>调整筛选条件，或添加你的第一节课程。</p></div> }
 </section>
` })
export class CoursesComponent {
 readonly store = inject(CourseStore); private readonly fb = inject(FormBuilder); private readonly dialog = inject(MatDialog); private readonly snackbar = inject(MatSnackBar);
 readonly categories = categories; readonly search = signal(''); readonly status = signal('all'); readonly error = signal('');
 readonly form = this.fb.nonNullable.group({ title: ['', [Validators.required, Validators.maxLength(60), Validators.pattern(/\S/)]], category: ['基础' as Category, Validators.required], minutes: [30, [Validators.required, Validators.min(1), Validators.max(600), Validators.pattern(/^\d+$/)]] });
 readonly filtered = computed(() => this.store.courses().filter((course) => course.title.toLowerCase().includes(this.search().trim().toLowerCase()) && (this.status() === 'all' || course.completed === (this.status() === 'done'))));
 add() { this.error.set(''); if (this.form.invalid) { this.form.markAllAsTouched(); return; } try { this.store.add(this.form.getRawValue()); this.form.reset({ title: '', category: '基础', minutes: 30 }); this.snackbar.open('课程已添加', '关闭', { duration: 2500 }); } catch (error) { this.error.set((error as Error).message); } }
 remove(id: string) { this.dialog.open(ConfirmComponent, { data: { title: '删除这节课程？', message: '删除后，该课程及学习进度将从本地列表移除。' } }).afterClosed().subscribe((confirmed: boolean) => { if (confirmed) this.store.remove(id); }); }
 reset() { this.dialog.open(ConfirmComponent, { data: { title: '恢复示例课程？', message: '当前课程与进度会被教学示例替换。' } }).afterClosed().subscribe((confirmed: boolean) => { if (confirmed) this.store.reset(); }); }
}
