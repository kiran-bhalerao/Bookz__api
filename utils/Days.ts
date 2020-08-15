export class Days {
  /** Return diff between two dates in days */
  static diff(d1: string | number, d2: string | number) {
    const date1: any = new Date(d1)
    const date2: any = new Date(d2)

    const diffTime = Math.abs(date2 - date1)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays
  }

  /** Return diff between current date and current or past date in days */
  static diffPast(date: string | number) {
    const date1: any = new Date(date)
    const date2: any = new Date(Date.now())

    const diffTime = Math.abs(date2 - date1)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    return diffDays
  }
}
