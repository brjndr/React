import { Fragment } from './react'
import type { Child, VNode } from './vnode'

function appendChild(parent: Node, child: Child): void {
  if (child === null || child === undefined || typeof child === 'boolean') return

  if (typeof child === 'string' || typeof child === 'number') {
    parent.appendChild(document.createTextNode(String(child)))
    return
  }

  parent.appendChild(renderNode(child))
}

function renderNode(node: VNode): Node {
  if (typeof node.type === 'function') {
    return renderNode(node.type(node.props))
  }

  if (node.type === Fragment) {
    const fragment = document.createDocumentFragment()
    const children = (node.props.children as Child[] | undefined) ?? []
    children.forEach((child) => appendChild(fragment, child))
    return fragment
  }

  const element = document.createElement(node.type as string)

  Object.entries(node.props).forEach(([key, value]) => {
    if (key === 'children') {
      const children = (value as Child[] | undefined) ?? []
      children.forEach((child) => appendChild(element, child))
      return
    }

    if (key === 'className' && typeof value === 'string') {
      element.setAttribute('class', value)
      return
    }

    if (key === 'style' && value && typeof value === 'object') {
      Object.assign((element as HTMLElement).style, value)
      return
    }

    if (key === 'placeholder' && typeof value === 'string') {
      element.setAttribute('placeholder', value)
      return
    }

    if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.slice(2).toLowerCase()
      element.addEventListener(eventName, value as EventListener)
      return
    }

    if (typeof value === 'string') {
      element.setAttribute(key, value)
    }
  })

  return element
}

export default {
  createRoot(container: HTMLElement) {
    return {
      render(node: VNode) {
        container.innerHTML = ''
        container.appendChild(renderNode(node))
      },
    }
  },
}
