import dayjs from 'dayjs'
import config from '@/utils/config'

// 过滤关键字
export function filterKeyWord (val, keyWord = '变异') {
  if (!val) return
  if (val.indexOf(keyWord) !== -1 && keyWord !== '') {
    let Reg = new RegExp(`${keyWord}`, 'gi')
    return val.replace(
      Reg,
      '<font color="#f00">' + keyWord + '</font>'
    )
  } else {
    return val
  }
}

// 时间戳格式化
export function dateToString (timestamp, format = 'date') {
  if (timestamp === null) {
    return ''
  }
  let _format = ''
  switch (format) {
    case 'datetime':
      _format = config.DATE.FULL_DATE_TIME
      break
    case 'time':
      _format = config.DATE.HMS
      break
    case 'date':
      _format = config.DATE.SIMPLE_DATE
    case 'HH':
      _format = config.DATE.HH
    case 'MM':
      _format = config.DATE.MM
    case 'SS':
      _format = config.DATE.SS
      break
    default:
      _format = format
      break
  }
  return dayjs(timestamp).format(_format)
}


/**
 * 万 = 砖
 * @param value 数字值
 */
export function gameGoldTransform (value) {
  let Zhuan = 10000  // 10000 = 1砖
  if (value > Zhuan) {
    let overValueArr = (value / Zhuan).toString().split('.')  // 超过1砖的钱
    if (overValueArr.length == 1 && value > Zhuan) {
      overValueArr[1] = '0000'
    }
    return overValueArr[0] + '砖' + fillZero(overValueArr[1])
  } else if (value == Zhuan) {
    return (value / Zhuan) + '砖'
  } else {
    return value + '金'
  }
}

export function fillZero (val) {
  if (4 - val.length) {
    return val.padEnd(4, '0') + '金'
  } else if (val == '0000') {
    return ''
  } else {
    return Number(val) + '金'
  }
}