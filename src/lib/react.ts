import type { VNode } from './vnode'

const Fragment = Symbol('Fragment')

function createElement(type: string | symbol | ((props: Record<string, unknown>) => VNode), props: Record<string, unknown> | null, ...children: unknown[]): VNode {
  return {
    type,
    props: {
      ...(props ?? {}),
      children,
    },
  }
}

const StrictMode = Fragment

export { createElement, Fragment, StrictMode }
export default { createElement, Fragment, StrictMode }
