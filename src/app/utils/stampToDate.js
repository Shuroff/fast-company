export default function stampToDate(timestamp) {
  const diff = Math.floor((Date.now() - timestamp) / 1000)
  let tempDate = new Date(timestamp)
  let date = ''
  if (diff < 60) {
    date = '1 минуту назад'
  } else if (diff < 60 * 5) {
    date = '5 минуту назад'
  } else if (diff < 60 * 10) {
    date = '10 минут назад'
  } else if (diff < 60 * 30) {
    date = '30 минут назад'
  } else if (diff < 60 * 60 * 24) {
    let options = {
      hour: 'numeric',
      minute: 'numeric',
    }
    date = tempDate.toLocaleString('en-US', options)
  } else if (tempDate.getFullYear() === new Date().getFullYear()) {
    let options = {
      month: 'long',
      day: 'numeric',
    }
    date = tempDate.toLocaleString('en-US', options)
  } else {
    let options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    date = tempDate.toLocaleString('en-US', options)
  }
  return date
}
