import Vue from 'vue'


// 结果为空时，赋值为未知
let emptyVal = val => {
    // debugger
    let arr = ['', ' ', '  ', '   '];
    if (arr.includes(val)) {
        return '未知'
    } else {
        return val
    }
    // return !val ? '未知' : val;
};

// 取小数点1位
let toFixedVal = val => {
    return val.toFixed(1);
};

export const filters = {
    emptyVal,
    toFixedVal
};

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});
