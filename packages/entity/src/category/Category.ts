export type Category = {
  id: number
  code: string
  name: string
  parentCategory: Category | null
}
