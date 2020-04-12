//字符串是否包含  kmp算法
export function contains(str,substr,isIgnoreCase =true){
    //字符串  字串 是否忽略大小写
    if(isIgnoreCase){
        str = str.toLowerCase().split("");
        substr =substr.toLowerCase().split("");
    }
    return kmp(str,substr)//获取到第一次匹配的index | false
}
function kmp(str,substr){  //kmp算法
    let x1 =0,x2=0;
    let next = getNextArray(substr);
    while(x1<str.length && x2 <substr.length){
        if(str[x1] == substr[x2]){
            x1++;x2++;  //匹配
        }else if(next[x2] == -1){
            x1++;  //匹配不上且来到 next【0】
        }else{
            x2 = next[x2];  //匹配不上但是还可以跳
        }
    }
    return x2 ==substr.length ? x1-x2 : -1;

}
function getNextArray(substr){  //获取跳跃数组  提供给kmp
    /*
    　这种信息就是对于每模式串 t 的每个元素 t j，都存在一个实数 k ，
    使得模式串 t 开头的 k 个字符（t 0 t 1…t k-1）依次与 t j 前面的 k（t j-k t j-k+1…t j-1，
    这里第一个字符 t j-k 最多从 t 1 开始，所以 k < j）个字符相同。如果这样的 k 有多个，
    则取最大的一个。模式串 t 中每个位置 j 的字符都有这种信息，
    采用 next 数组表示，即 next[ j ]=MAX{ k }。
    */
    if(substr.length ==1) return [-1];
    let next =  new Array(substr.length);
    next[0] =-1;next[1] = 0;
    let i =2;let cn=0 ; //cn为第1到第k个数，与i前面k-1个数相同
    while(i <next.length){
        if(substr[i-1]==substr[cn]){
            next[i++] =++cn;
        } else if(cn>0){
            cn = next[cn]
        }else{
            next[i++] = 0;
        }
    }
    return next;
}