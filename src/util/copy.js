export class Copy {
  constructor() {}
  copy(obj) {
    let copyObj = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj == "object") {
      for (const key in obj) {
        if (obj[key] && typeof obj[key] == "object") {
          copyObj[key] = this.copy(obj[key]);
        } else {
          copyObj[key] = obj[key];
        }
      }
    }
    return copyObj;
  }
}
