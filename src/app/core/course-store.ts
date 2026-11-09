import { Injectable, computed, signal } from '@angular/core';
import { parseCourses, seedCourses, summary, validateCourse, type Course, type CourseInput } from './course';

@Injectable({ providedIn: 'root' })
export class CourseStore {
 private readonly key = 'learn-studio:v1';
 private readonly state = signal<Course[]>([]);
 readonly courses = this.state.asReadonly();
 readonly stats = computed(() => summary(this.courses()));
 readonly notice = signal('');
 constructor() {
  try { const saved = localStorage.getItem(this.key); this.state.set(saved ? parseCourses(saved) : seedCourses()); }
  catch { this.state.set(seedCourses()); this.notice.set('本地存储不可用或数据损坏，已载入示例；后续操作会尝试重新保存。'); }
 }
 private save(courses: Course[]) {
  try { localStorage.setItem(this.key, JSON.stringify({ version: 1, courses })); this.notice.set(''); }
  catch { this.notice.set('无法保存到本地，当前修改仅在本次页面中有效。'); }
  this.state.set(courses);
 }
 add(input: CourseInput) {
  if (this.courses().length >= 100) throw new Error('教学版最多保存 100 节课程');
  this.save([...this.courses(), { ...validateCourse(input), id: crypto.randomUUID(), completed: false }]);
 }
 toggle(id: string) { this.save(this.courses().map((course) => course.id === id ? { ...course, completed: !course.completed } : course)); }
 remove(id: string) { this.save(this.courses().filter((course) => course.id !== id)); }
 reset() { this.save(seedCourses()); }
}
