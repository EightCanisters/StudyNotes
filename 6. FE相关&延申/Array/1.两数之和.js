/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和 https://leetcode.cn/problems/two-sum/description/
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  /** 我的解法：
   * 利用Map，对nums做两次循环，时间复杂度O(n)
    const numsMap = new Map();
    nums.forEach((num, index) => {
      numsMap.set(num, index);
    });

    let targetIdxs = [];
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      if (numsMap.has(target - num) && numsMap.get(target - num) !== i) {
        targetIdxs.push(i, numsMap.get(target - num));
        break;
      }
    }
    return targetIdxs;
   */

  /** 大佬解法：
   * 也是利用Map，但是只对nums做一次循环，时间复杂度O(n)
   */
  let targetIdxs = [];
  const numsMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (numsMap.has(target - num)) {
      targetIdxs.push(numsMap.get(target - num), i);
      break;
    }
    numsMap.set(num, i);
  }
  return targetIdxs;
};
// @lc code=end
