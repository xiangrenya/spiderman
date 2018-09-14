const storage = {};

storage.has = key => storage.get(key) !== undefined;
storage.transact = (key, defaultVal, transactionFn) => {
  if (transactionFn === null) {
    transactionFn = defaultVal;
    defaultVal = null;
  }
  const val = storage.get(key, defaultVal || {});
  transactionFn(val);
  storage.set(key, val);
};
storage.serialize = value => JSON.stringify(value);
storage.deserialize = (value) => {
  if (typeof value !== 'string') {
    return undefined;
  }
  try {
    return JSON.parse(value);
  } catch (e) {
    return value || undefined;
  }
};
storage.set = (key, val) => {
  if (val === undefined) {
    return storage.remove(key);
  }
  localStorage.setItem(key, storage.serialize(val));
  return val;
};
storage.get = (key, defaultVal) => {
  const val = storage.deserialize(localStorage.getItem(key));
  return val || defaultVal;
};
storage.remove = key => localStorage.removeItem(key);
storage.clear = () => localStorage.clear();
storage.getAll = () => {
  const ret = {};
  storage.forEach((key, val) => {
    ret[key] = val;
  });
  return ret;
};
storage.forEach = (callback) => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    callback(key, storage.get(key));
  }
};

export default storage;
