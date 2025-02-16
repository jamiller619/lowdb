import { Adapter } from '~/core/Low'

export default class Memory<T> implements Adapter<T> {
  #data: T | null = null

  read(): Promise<T | null> {
    return Promise.resolve(this.#data)
  }

  write(obj: T): Promise<void> {
    this.#data = obj
    return Promise.resolve()
  }
}
