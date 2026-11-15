import assert from 'node:assert/strict';
import test from 'node:test';
import { isOceanRelated, MAX_MESSAGE_LENGTH } from '../src/utils/oceanTopic.js';

test('ocean questions are accepted', () => {
  for (const question of [
    '為什麼深海沒有陽光？',
    '珊瑚白化是什麼原因造成的？',
    '海水升溫會造成什麼影響？',
    '馬里亞納海溝有多深？',
    '鯨魚怎麼呼吸？',
    'ocean acidification',
    'what is the deepest ocean',
  ]) {
    assert.equal(isOceanRelated(question), true, question);
  }
});

test('climate and earth-science context is accepted', () => {
  for (const question of [
    '全球暖化對地球有什麼影響？',
    '溫室效應是怎麼形成的？',
    '颱風怎麼形成？',
    '生物多樣性為什麼重要？',
  ]) {
    assert.equal(isOceanRelated(question), true, question);
  }
});

test('greetings and assistant meta questions are accepted', () => {
  for (const question of ['你好', '嗨！', 'hello', '你是誰？', '你可以做什麼？']) {
    assert.equal(isOceanRelated(question), true, question);
  }
});

test('clearly off-topic questions are rejected', () => {
  for (const question of [
    '幫我寫一個 JavaScript 函式',
    '推薦台北的餐廳',
    '股票怎麼買？',
    '今天天氣如何？',
    '我想學 Python',
    '幫我翻譯這段英文',
    '樂透下一期號碼',
    '地球有幾顆衛星？',
  ]) {
    assert.equal(isOceanRelated(question), false, question);
  }
});

test('empty or invalid input is rejected', () => {
  assert.equal(isOceanRelated(''), false);
  assert.equal(isOceanRelated('   '), false);
  assert.equal(isOceanRelated(null), false);
  assert.equal(isOceanRelated(123), false);
  assert.equal(MAX_MESSAGE_LENGTH, 300);
});
