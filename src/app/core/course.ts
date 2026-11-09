export const categories = ['基础', '组件', '工程'] as const;
export type Category = typeof categories[number];
export interface Course { readonly id: string; readonly title: string; readonly category: Category; readonly minutes: number; readonly completed: boolean }
export type CourseInput = Pick<Course, 'title' | 'category' | 'minutes'>;
export function validateCourse(input: CourseInput): CourseInput {
 if (typeof input.title !== 'string' || !input.title.trim() || input.title.trim().length > 60) throw new Error('课程名称应为 1–60 个字符');
 if (!categories.includes(input.category)) throw new Error('课程分类无效');
 if (!Number.isSafeInteger(input.minutes) || input.minutes < 1 || input.minutes > 600) throw new Error('学习时长应为 1–600 分钟的整数');
 return { title: input.title.trim(), category: input.category, minutes: input.minutes };
}
export function seedCourses(): Course[] {
 return [
  { id: 'components', title: '认识独立组件与模板', category: '基础', minutes: 25, completed: true },
  { id: 'signals', title: '用 Signals 管理页面状态', category: '基础', minutes: 35, completed: false },
  { id: 'forms', title: '构建类型化响应式表单', category: '组件', minutes: 40, completed: false },
  { id: 'material', title: 'Material 对话框与反馈', category: '组件', minutes: 30, completed: false },
  { id: 'testing', title: '路由分包与测试策略', category: '工程', minutes: 45, completed: false },
 ];
}
export function parseCourses(raw: string): Course[] {
 const state: unknown = JSON.parse(raw);
 if (typeof state !== 'object' || state === null || !('version' in state) || state.version !== 1 || !('courses' in state) || !Array.isArray(state.courses) || state.courses.length > 100) throw new Error('本地数据格式无效');
 const seen = new Set<string>();
 return state.courses.map((entry: unknown) => {
  if (typeof entry !== 'object' || entry === null || !('id' in entry) || typeof entry.id !== 'string' || !entry.id || entry.id.length > 100 || seen.has(entry.id) || !('completed' in entry) || typeof entry.completed !== 'boolean') throw new Error('课程记录无效');
  const value = entry as Course; const input = validateCourse(value); seen.add(value.id);
  return { ...input, id: value.id, completed: value.completed };
 });
}
export function summary(courses: readonly Course[]) {
 const completed = courses.filter((course) => course.completed); const totalMinutes = courses.reduce((sum, course) => sum + course.minutes, 0); const doneMinutes = completed.reduce((sum, course) => sum + course.minutes, 0);
 return { total: courses.length, completed: completed.length, totalMinutes, doneMinutes, progress: totalMinutes ? Math.round(doneMinutes / totalMinutes * 100) : 0 };
}
