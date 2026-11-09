import assert from 'node:assert/strict';
import test from 'node:test';
import { validateCourse, parseCourses, seedCourses, summary } from '../.test-build/course.js';
test('课程输入校验与修剪', () => { assert.deepEqual(validateCourse({title:'  A ',category:'基础',minutes:30}),{title:'A',category:'基础',minutes:30}); for(const input of [{title:'',category:'基础',minutes:30},{title:'A',category:'other',minutes:30},{title:'A',category:'组件',minutes:0},{title:'A',category:'组件',minutes:1.5}]) assert.throws(()=>validateCourse(input)); });
test('课时加权进度和空状态',()=>{ const courses=seedCourses(); assert.equal(summary(courses).progress,14); assert.equal(summary([]).progress,0); assert.equal(summary(courses.map(c=>({...c,completed:true}))).progress,100); });
test('本地数据按版本和字段校验',()=>{const courses=seedCourses(); assert.deepEqual(parseCourses(JSON.stringify({version:1,courses})),courses); for(const raw of ['bad','null',JSON.stringify({version:2,courses}),JSON.stringify({version:1,courses:[courses[0],courses[0]]}),JSON.stringify({version:1,courses:[{...courses[0],minutes:'30'}]})]) assert.throws(()=>parseCourses(raw));});
test('每次生成新的示例，避免共享可变状态',()=>{const first=seedCourses();first[0].title='changed';assert.notEqual(seedCourses()[0].title,'changed');});
