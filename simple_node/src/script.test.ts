import { getHelloWorld } from './script';

test('getHelloWorld', () => {
  expect(getHelloWorld()).toBe('Hello World!');
});
