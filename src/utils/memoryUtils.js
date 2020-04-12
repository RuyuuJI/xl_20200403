/*
数据---》    存储到内存
可以加速读取，比直接读取localstorage快点，
但是保存信息的时候需要额外保存到内存
*/

import storageUtils from "./storageUtils";

export default{
    user: storageUtils.getUser(),
    elderMemory : {}  //需要查看的商品对象
}