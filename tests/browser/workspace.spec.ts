import { test, expect } from '@playwright/test';

test('课程新增、完成、持久化、筛选和确认删除', async ({ page }, info) => {
 const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
 await page.goto('/'); await expect(page.getByRole('heading', { name: '每一小步，都在构建能力。' })).toBeVisible();
 await page.screenshot({ path: info.outputPath('overview.png'), fullPage: true });
 await page.getByRole('link', { name: /课程管理/ }).click();
 await page.getByLabel('课程名称', { exact: true }).fill('自定义课程 Demo');
 await page.getByLabel('时长（分钟）').fill('45');
 await page.getByRole('button', { name: /添加课程/ }).click();
 await expect(page.getByText('自定义课程 Demo', { exact: true })).toBeVisible();
 await page.getByRole('checkbox', { name: '完成 自定义课程 Demo' }).check();
 await page.reload(); await expect(page.getByRole('checkbox', { name: '完成 自定义课程 Demo' })).toBeChecked();
 await page.getByLabel('搜索课程').fill('自定义'); await expect(page.locator('.editable')).toHaveCount(1);
 await page.getByRole('button', { name: '删除 自定义课程 Demo' }).click(); await page.getByRole('button', { name: '取消', exact: true }).click();
 await expect(page.locator('.editable')).toHaveCount(1);
 await page.getByRole('button', { name: '删除 自定义课程 Demo' }).click(); await page.getByRole('button', { name: '确认', exact: true }).click();
 await expect(page.getByRole('heading', { name: '暂无符合条件的课程' })).toBeVisible();
 expect(errors).toEqual([]);
});
test('无效表单不新增，损坏存储可恢复，布局适配', async ({ page }) => {
 await page.addInitScript(() => { localStorage.setItem('learn-studio:v1', 'broken'); });
 await page.goto('/courses'); await expect(page.getByRole('status')).toContainText('数据损坏');
 await page.getByRole('button', { name: /添加课程/ }).click(); await expect(page.getByText('请输入 1–60 个字符')).toBeVisible();
 await expect(page.locator('.editable')).toHaveCount(5);
 for (const width of [360, 768, 1440]) { await page.setViewportSize({ width, height: 1080 }); expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true); }
 await page.getByRole('link', { name: /搭建路线/ }).click(); await expect(page.getByRole('heading', { name: '循序渐进，搭起你的框架。' })).toBeVisible();
});
