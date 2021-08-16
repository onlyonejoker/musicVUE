const timestamp = function (timestamp) {
  let date = new Date(timestamp)
  let Y = date.getFullYear()
  let M = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
  let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
  let H = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
  let F = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  let S = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
  let MS = date.getMilliseconds() < 100 ? "0" + date.getMilliseconds() : date.getMilliseconds()
  MS = MS < 10 ? "00" + date.getMilliseconds() : date.getMilliseconds()
  let Day = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"]
  date.getDay()
  return Y + "年" + M + "月" + D + "日  " + H + ":" + F + ":" + S + ":" + MS + "  " + Day[date.getDay()]
}
export default timestamp