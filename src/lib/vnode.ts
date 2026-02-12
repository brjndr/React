export type Child = VNode | string | number | boolean | null | undefined

export type VNode = {
  type: string | symbol | ((props: Record<string, unknown>) => VNode)
  props: Record<string, unknown>
}
