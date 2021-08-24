/**
 * @link https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2gy9m/
 * @description 问题描述
 *  给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。
 *  不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
 * @example
 * 输入：nums = [1,1,2]；
 * 输出：2, nums = [1,2]；
 * 解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。
 */

/**
 * @description 思路
 * 比较前后两个数字，相同：则删除当前数字
 */
var removeDuplicates = function (nums) {
  for (var i = 0; i < nums.length - 1; ) {
    if (nums[i] === nums[i + 1]) {
      nums.splice(i, 1);
    } else {
      i++;
    }
  }
  console.log(nums);
  return nums.length;
};

/**
 * @description 思路
 * 找到不相等的项，把它们放到数组最前边
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let newlastIdx = 0; //指向新数组的最后一个元素，新数组的每项都不等
  for (let i = 1; i < nums.length; i++) {
    // 如果指针newlastIdx与当前i不相等：指针自增，并将i指向的数字复制给指针
    if (nums[i] !== nums[newlastIdx]) {
      nums[++newlastIdx] = nums[i];
    }
  }
  // nums.splice(newlastIdx + 1);
  // console.log(nums);
  return newlastIdx + 1;
};
