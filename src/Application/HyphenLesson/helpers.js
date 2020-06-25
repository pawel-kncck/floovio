import { LESSON_NEW, LESSON_EDIT, LESSON_SOLVE, LESSON_CHECK, LESSON_DEV } from '../../routes';

export const mapPathToMode = (path) => {
    switch (path) {
      case LESSON_NEW: return 'new'
      case LESSON_EDIT: return 'edit'
      case LESSON_SOLVE: return 'solve'
      case LESSON_CHECK: return 'check'
      case LESSON_DEV: return 'dev'
      default: return 'error'
    };
}

export const doesPathExistInObject = (obj, path) => {
    for (let i = 0; i < path.length; i++) {
        if (!obj || !obj.hasOwnProperty(path[i])) {
          return false;
        }
        obj = obj[path[i]];
      }
      return true;
}

export const depthOfExistingPath = (obj, path) => {
    let i;
    for (i = 0; i < path.length; i++) {
        if (!obj || !obj.hasOwnProperty(path[i])) {
          return i;
        }
        obj = obj[path[i]];
      }
      return i;
}

export const getDeepValue = (obj, keys) => {
  const cloneObj = deepCopyFunction(obj);
  let cloneKeys = [...keys];

  if (!cloneObj || !cloneObj[cloneKeys[0]]) {
    return null
  } else if (typeof cloneObj[cloneKeys[0]] !== 'object') {
    return cloneObj[cloneKeys[0]]
  } else {
    let key = cloneKeys.shift()
    return getDeepValue(cloneObj[key], cloneKeys)
  }
}

// export const createDeepObject = (obj, path, value) => {
//     let newObject = {...obj};  // a moving reference to internal objects within obj
//     // var pList = path.split('.');
//     var len = path.length;
//     for (let i = 0; i < len-1; i++) {
//         let elem = path[i];
//         if( !newObject[elem] ) newObject[elem] = {}
//         newObject = newObject[elem];
//     }
//     newObject[path[len-1]] = value;
// }

export const createNestedObject = (obj, keys, v) => {
  if (keys.length === 1) {
      obj[keys[0]] = v;
  } else {
      var key = keys.shift();
      obj[key] = createNestedObject(typeof obj[key] === 'undefined' ? {} : obj[key], keys, v);
  }
  return obj;
}

export const deepCopyFunction = (inObject) => {
  let outObject, value, key

  if (typeof inObject !== "object" || inObject === null) {
    return inObject // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {}

  for (key in inObject) {
    value = inObject[key]

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyFunction(value)
  }

  return outObject
};

export const convertEpoch = (epoch) => {
  let date = new Date(epoch);
  let isoDateTime = date.toISOString()
  return isoDateTime
}

export const convertEpochToDateString = (epoch) => {
  let date = new Date(epoch);
  let isoDate = date.toISOString().substr(0,10)
  return isoDate
}

export const convertDateStringToEpoch = (datestring) => {
  let date = new Date(datestring);
  let epoch = date.getTime()
  return epoch
}