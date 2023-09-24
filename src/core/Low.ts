export interface Adapter<T> {
  read: () => Promise<T | null>
  write: (data: T) => Promise<void>
}

export default class Low<T = unknown> {
  adapter: Adapter<T>
  data: T

  constructor(adapter: Adapter<T>, defaultData: T) {
    if (adapter == null) {
      throw new Error(`lowdb: missing parameter "adapter"`)
    }

    if (defaultData == null) {
      throw new Error(`lowdb: missing parameter "defaultData"`)
    }

    this.adapter = adapter
    this.data = defaultData
  }

  async read(): Promise<void> {
    const data = await this.adapter.read()
    if (data) this.data = data
  }

  async write(): Promise<void> {
    if (this.data) await this.adapter.write(this.data)
  }
}
