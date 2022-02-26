export let count = 1;
export function increment() {
  count++;
  console.log('module内部：', count);
}
