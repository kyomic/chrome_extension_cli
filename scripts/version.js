const version = process.version;
function compareVersions(version1, version2) {
  // 将版本号拆分成数字数组
  var arr1 = version1.split('.');
  var arr2 = version2.split('.');
  
  // 遍历数字数组进行逐段比较
  for (var i = 0; i < Math.max(arr1.length, arr2.length); i++) {
    var num1 = parseInt(arr1[i] || 0); // 如果数组长度不够，则将缺失部分补0
    var num2 = parseInt(arr2[i] || 0);
    
    if (num1 < num2) {
      return -1; // 版本1小于版本2
    } else if (num1 > num2) {
      return 1; // 版本1大于版本2
    }
  }
  return 0; // 版本1等于版本2
}

const requireVersion = '14.16.0'
if( compareVersions(version,requireVersion )<0){
  console.warn(`当前Node版本为：${version}，可能会出现兼容性问题`)
}
