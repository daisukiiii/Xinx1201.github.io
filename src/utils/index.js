import qs from 'query-string'

// 将URL中的参数转换成对象
export function parseQuery () {
  return qs.parse(location.search)
}

// 生成随机数
export function randomInt (min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

// 循环中等待时间
export async function sleep (time) {
  return new Promise((resolve) => {
    setInterval(() => {
      resolve()
    }, time)
  })
}
