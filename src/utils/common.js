const decimalAdjust = function (type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === "undefined" || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split("e");
  value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
  // Shift back
  value = value.toString().split("e");
  return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
};

export function round10(value, exp) {
  return decimalAdjust("round", value, exp);
}

export function floor10(value, exp) {
  return decimalAdjust("floor", value, exp);
}

export function ceil10(value, exp) {
  return decimalAdjust("ceil", value, exp);
}

export const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

export const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].map(formatNumber).join("/");
};

export function timeout(t) {
  // TODO timeout支持字符串，比如 1s，1m等
  return new Promise((resolve) => {
    setTimeout(() => resolve(), t);
  });
}

export function extractArray(arr, key) {
  let narr = [];
  arr.forEach((a) => {
    narr.push(a[key]);
  });
  return narr;
}

export function mosaicText(text, start, end, replace) {
  replace = replace || "*";
  let size = text.length;
  if (start < size) {
    if (end > size) {
      end = size;
    }
    let t1 = text.substr(0, start);
    let t2 = text.substr(start, end - start);
    let t3 = end == size ? "" : text.substr(end, size - end);
    return t1 + replace.repeat(t2.length) + t3;
  }
  return text;
}
