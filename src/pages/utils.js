export function postDateCalculator(postDate, nowDate) {

  let timeDiff = nowDate - new Date(postDate);

  const minutesDiff = Math.floor(timeDiff / (1000 * 60))
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60))
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  const monthsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30)) // 월 단위 계산
  const yearsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365)) // 년 단위 계산

  if (minutesDiff < 1) {
        return '방금 전'
  } else if (minutesDiff < 60) {
        return minutesDiff + '분 전'
  } else if (hoursDiff < 24) {
        return hoursDiff + '시간 전'
  } else if (daysDiff < 30) {
        return daysDiff + '일 전'
  } else if (monthsDiff < 12) {
        return monthsDiff + '개월 전'
  } else {
        return yearsDiff + '년 전'
  }

}

export function boardDateCalculator(postDate, nowDate) {

    const date = new Date(postDate)

    let timeDiff = nowDate - date

    if (timeDiff < 1000 * 60 * 60 * 24) {
        return String(date.getHours()).padStart(2, "0") + ':' + String(date.getMinutes()).padStart(2, "0")
    }
    else {
        return date.getFullYear() + "-" +
            String(date.getMonth() + 1).padStart(2, "0") + "-" + 
            String(date.getDate()).padStart(2, "0")
    }
}
