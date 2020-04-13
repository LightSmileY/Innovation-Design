// 计算UFC 参数-功能点计数项(对象数组)
export function calUFC(funcCount){
    console.log(funcCount)
    let result = {
        data: [],
        sum: 0
    }
    for (let i in funcCount){
        result.data[i] = Number(funcCount[i].num) * Number(funcCount[i].value)
        result.sum += result.data[i]
    }
    result.data.push(result.sum)
    return result.data
}

// 计算TCF 参数-技术复杂度影响因素(数组)
export function calTCF(complicatedFactor){
    let sum = 0
    for (let i in complicatedFactor){
        sum += Number(complicatedFactor[i])
    }
    return 0.65 + 0.01 * sum
}

// 计算功能点 参数-UFC、TCF
export function calFP(UFC, TCF){
    return Number(UFC) * Number(TCF)
}

// 计算代码行 参数-FP功能点，trans-转换参数
export function calLOC(FP, trans){
    return Number(FP) * Number(trans)
}

// 计算b值（参照公式-软件项目成本计算）
export function calB(factors){
    let sum = 0
    for (let i in factors){
        sum += Number(factors[i])
    }
    return 1.01 + 0.01 * sum;
}

// 计算项目成本-人月 参数-a项目类型的经验参数，B-影响模型指数参数
// LOC-代码行数，fi-成本驱动因子数组
export function calE(a, B, LOC, fi){
    let KLOC = Number(LOC) / 1000
    let sum = 0
    for (let i in fi){
        sum += Number(fi[i])
    }
    return a * Math.pow(KLOC,B) * sum
}

// 计算项目进度 参数-PM项目成本，SCED面临的进度压力，B值
export function calTDEV(PM, SCED, B){
    return 3.67 * Math.pow(Number(PM), (0.28+0.2*(Number(B)-0.91)))*Number(SCED)
}

export function tableToExcel(jsonData){
      //列标题
      let str = '<tr><td>用户id</td><td>用户名</td><td>创建时间</td><td>项目名称</td><td>项目功能点</td><td>项目复杂度因子</td><td>项目规模（代码行数）</td><td>项目规模（功能点）</td><td>项目成本</td><td>项目进度</td></tr>';
      //循环遍历，每行加入tr标签，每个单元格加td标签
      for(let i = 0 ; i < jsonData.length ; i++ ){
        str+='<tr>';
        for(let item in jsonData[i]){
            //增加\t为了不让表格显示科学计数法或者其他格式
            str+=`<td>${ jsonData[i][item] + '\t'}</td>`;     
        }
        str+='</tr>';
      }
      //Worksheet名
      let worksheet = 'Sheet1'
      let uri = 'data:application/vnd.ms-excel;base64,';
 
      //下载的表格模板数据
      let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
      xmlns:x="urn:schemas-microsoft-com:office:excel" 
      xmlns="http://www.w3.org/TR/REC-html40">
      <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
        <x:Name>${worksheet}</x:Name>
        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
        </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        </head><body><table>${str}</table></body></html>`;
      //下载模板
      window.location.href = uri + base64(template)
    }
    //输出base64编码
    function base64 (s) { return window.btoa(unescape(encodeURIComponent(s))) 
}