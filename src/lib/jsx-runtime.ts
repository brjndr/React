import { Fragment } from './react'
import type { VNode } from './vnode'

function normalizeChildren(children: unknown): unknown[] {
  if (children === undefined || children === null) return []
  return Array.isArray(children) ? children : [children]
}

export function jsx(type: VNode['type'], props: Record<string, unknown>): VNode {
  return {
    type,
    props: {
      ...props,
      children: normalizeChildren(props.children),
    },
  }
}

export const jsxs = jsx
export { Fragment }
