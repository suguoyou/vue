export function arrToTree({
  list = [],
  code = 'code',
  pcode = 'pcode',
  children = 'children',
}: {
  list: any[]
  code?: string
  pcode?: string
  children?: string
}) {
  let treeData: any[] = []
  list.forEach((item) => {
    if (!item[pcode]) {
      treeData.push(item)
    }
    let objList = list.filter((data) => data[pcode] === item[code])
    if (objList.length) {
      item[children] = objList
    }
  })
  return treeData
}

export function getActions(list: string[]) {
  return list.reduce((acc, cur) => {
    if (cur.search(',') > -1) {
      const arr = cur.split(',')
      acc = acc.concat(arr)
    } else {
      acc.push(cur)
    }
    return acc
  }, [])
}

export function getPath(url) {
  if (url) {
    const arr = url.split('/')
    return "/" + arr[arr.length - 1]
  }
  return '/'
}

export function getName(url) {
  if (url) {
    const arr = url.split('/')
    return arr[arr.length - 1]
  }
  return ''
}
export function format(date, fmt = 'yyyy-MM-dd HH:mm:ss') {
  date = date === undefined ? new Date() : date
  date = typeof date === 'number' ? new Date(date) : date
  fmt = fmt || 'yyyy-MM-dd HH:mm:ss'
  var obj = {
    y: date.getFullYear(), // 年份，注意必须用getFullYear
    M: date.getMonth() + 1, // 月份，注意是从0-11
    d: date.getDate(), // 日期
    q: Math.floor((date.getMonth() + 3) / 3), // 季度
    w: date.getDay(), // 星期，注意是0-6
    H: date.getHours(), // 24小时制
    h: date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
    m: date.getMinutes(), // 分钟
    s: date.getSeconds(), // 秒
    S: date.getMilliseconds() // 毫秒
  }
  var week = ['天', '一', '二', '三', '四', '五', '六']
  for (var i in obj) {
    fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
      var val = obj[i] + ''
      if (i === 'w') return (m.length > 2 ? '星期' : '周') + week[val]
      for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val
      return m.length === 1 ? val : val.substring(val.length - m.length)
    })
  }
  return fmt
}
export function getEmployee(code) {
  const info = {
    count: 1,
    time: ''
  }
  const historyList: any = JSON.parse(localStorage.getItem('employeeHistory')) || []
  const flagIndex = historyList.findIndex(item => item.code == code)
  if (flagIndex > -1) {
    info.count = historyList[flagIndex].count + 1
    info.time = historyList[flagIndex].time
    historyList[flagIndex].count = info.count
    historyList[flagIndex].time = format(new Date())
  } else {
    info.count = 1
    info.time = format(new Date())
    historyList.push({
      code,
      ...info
    })
  }
  localStorage.setItem('employeeHistory', JSON.stringify(historyList))
  return info
}