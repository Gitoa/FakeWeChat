export function getCookie(key: string): string|undefined {
  let value = undefined;
  let cookieSplit = document.cookie.split(';');
  let index = cookieSplit.findIndex(item => {
    return (item.split('=')[0].trim() === key);
  })
  index > -1 && (value = cookieSplit[index].split('=')[1].trim());
  return value;
}