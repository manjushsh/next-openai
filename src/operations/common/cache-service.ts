const CacheService = {
  get: (key: string) => localStorage.getItem(key),
  set: (key: string, value: string) => localStorage.setItem(key, value),
  getAllKeys: () => Object.entries(localStorage),
};

export default CacheService;
