import { ElNotification } from "element-plus";
// 初始化定时器变量
let timer,
  flag,
  starTimeout = null;
export const MxNotification = (options) => {
  ElNotification({
    ...options,
  });
};

export const isEmpty = (value) => {
  switch (typeof value) {
    case "undefined":
      return true;
    case "string":
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
        return true;
      break;
    case "boolean":
      if (!value) return true;
      break;
    case "number":
      if (value === 0 || isNaN(value)) return true;
      break;
    case "object":
      if (value === null || value.length === 0) return true;
      for (const i in value) {
        return false;
      }
      return true;
  }
  return false;
};

export const isNumber = (value) => {
  return /^(?:[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/.test(
    value
  );
};

/**
 * 格式化数字为带逗号和小数的形式
 * @param {number | null | undefined} num 要格式化的数字
 * @param {boolean} [showDecimals=false] 是否显示两位小数，默认返回整数形式的 "0"
 * @returns {string} 格式化后的字符串
 */
export const formatNumber = (num, showDecimals = false) => {
  if (num === null || num === undefined || isNaN(num)) {
    return showDecimals ? "0.00" : "0";
  }
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(num);
};

/**
 * 函数防抖：在一定时间内，只执行一次
 * @param {Function} func 要执行的函数
 * @param {Number} wait 延迟时间
 * @param {boolean} immediate 是否立即执行
 */
export const Xdebounce = (func, wait = 500, immediate = false) => {
  if (starTimeout !== null) clearTimeout(starTimeout);
  if (immediate) {
    const callNow = !starTimeout;
    starTimeout = setTimeout(() => {
      starTimeout = null;
    }, wait);
    if (callNow) typeof func === "function" && func();
  } else {
    starTimeout = setTimeout(() => {
      typeof func === "function" && func();
    }, wait);
  }
};

/**
 * 节流原理：在一定时间内，只能触发一次
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */

export const Xthrottle = (func, wait = 500, immediate = true) => {
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === "function" && func();
      timer = setTimeout(() => {
        flag = false;
      }, wait);
    }
  } else if (!flag) {
    flag = true;
    // 如果是非立即执行，则在wait毫秒内的结束处执行
    timer = setTimeout(() => {
      flag = false;
      typeof func === "function" && func();
    }, wait);
  }
};
