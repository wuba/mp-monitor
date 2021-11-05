interface urlObj {
  [key: string]: any;
  method: string;
  url: string;
}

let oldUrlObj: urlObj = {
  method: '',
  url: '',
};

export function repeatCheck(method: string, url: string) {
  const newUrlObj = {
    method,
    url,
  };
  const isRepeat = objEqual(oldUrlObj, newUrlObj);
  if (!isRepeat) {
    oldUrlObj = { ...newUrlObj };
  }
  return isRepeat;
}

function objEqual(x: urlObj, y: urlObj): boolean {
  for (let prop in x) {
    if (y.hasOwnProperty(prop)) {
      if (!(x[prop] === y[prop])) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}
