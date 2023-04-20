export const subscribe = (cb: (e: CustomEventInit<Array<{ target: HTMLElement, isIntersecting: boolean, wasIntercepted: boolean }>>) => void) => {
  window.addEventListener('observer', cb)
}

export const unsubscrite = (cb: (e: CustomEventInit<Array<{ target: HTMLElement, isIntersecting: boolean, wasIntercepted: boolean }>>) => void) => {
  window.removeEventListener('observer', cb)
}

export type ObserverEvent = CustomEventInit<Array<{ target: HTMLElement, isIntersecting: boolean, wasIntercepted: boolean }>>
