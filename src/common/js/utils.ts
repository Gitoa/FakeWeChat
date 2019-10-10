export function getCookie(key: string): string|undefined {
  let value = undefined;
  let cookieSplit = document.cookie.split(';');
  let index = cookieSplit.findIndex(item => {
    return (item.split('=')[0].trim() === key);
  })
  index > -1 && (value = cookieSplit[index].split('=')[1].trim());
  return value;
}

export function getMsgTime(ms: number): string {
  let old = new Date(ms);
  let now = new Date();
  
  let oldDate = old.getFullYear() + '/' + (old.getMonth() + 1) + '/' + old.getDate();
  let nowDate = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();
  if (oldDate === nowDate) {
    let hour = old.getHours(), minute = old.getMinutes();
    return (`${hour > 10 ? hour : '0' + hour}:${minute > 10 ? minute : '0' + minute}`)
  } else {
    return oldDate;
  }
}