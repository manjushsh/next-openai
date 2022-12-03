/* eslint-disable newline-before-return */
const CacheService = {
  getItem: (key: string) => {
    try {
      const value = localStorage.getItem(key);
      return value;
    } catch (error) {
      return error;
    }
  },

  setItem: (key: string, value: string) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      return error;
    }
  },

  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      return error;
    }
  },

  clearStorage: () => {
    try {
      localStorage.clear();
    } catch (error) {
      return error;
    }
  },
};

export default CacheService;
