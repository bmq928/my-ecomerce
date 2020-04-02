import { useEffect, RefObject } from 'react'

export default function useEnterSubmit(
  fn: Function,
  nodeRef: RefObject<HTMLElement> | null
) {
  useEffect(() => {
    if(!nodeRef || !nodeRef.current) return
    
    const node = nodeRef.current
    const listener = (e: any) => {
      if (e.keyCode === 13) fn()
    }
    node.addEventListener('keypress', listener)
    return () => node.removeEventListener('keypress', listener)
  }, [fn, nodeRef])
}
