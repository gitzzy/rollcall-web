/**
 * Created by zzy on 2018/2/1.
 */
class Store {
  constructor() {
    this.store = window.localStorage
  }

  get (key) {
    if (!key) {
      throw new Error('没有找到key。')
    }
    if (typeof key === 'object') {
      throw new Error('key不能是一个对象。')
    }
    let value = this.store.getItem(key)
    if (value !== null) {
      try {
        value = JSON.parse(value)
      } catch (e) {
      }
    }

    return value
  }

  set (key, value) {
    try {
      value = JSON.stringify(value)
    } catch (e) {
    }

    this.store.setItem(key, value)
  }

  remove (key) {
    this.store.removeItem(key)
  }
}

export default new Store()
