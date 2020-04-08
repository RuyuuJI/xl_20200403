//进行日期转换
export function formatDate(now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate()-10;
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" + month + "-" + date + "|" + hour +":"+ minute+":" +second;
}

//防抖函数
export function debounce(func, wait, immediate) {
    let time;
    let debounced = function() {
        let context = this;
        if(time) clearTimeout(time);

        if(immediate) {
            let callNow = !time
            if(callNow) func.apply(context, arguments)
            time = setTimeout(
                ()=>{time = null} //见注解
            , wait)
        } else {
            time = setTimeout(
                ()=>{func.apply(context, arguments)}
            , wait) 
        }
    }
    return debounced
}