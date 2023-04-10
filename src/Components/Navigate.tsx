import React, { useRef } from 'react'
import { $ } from '../Helpers/Query'

export default function Navigate ({ name, active, hack }: { name: string, active: boolean, hack: ({ event, originalString, origin }: { event?: React.MouseEvent<HTMLSpanElement, MouseEvent> | undefined, originalString: string, origin?: HTMLSpanElement | undefined }) => void }): React.ReactElement {
  const ref = useRef<HTMLSpanElement>(null)

  return (
    <a
      id={`btn-${name}`}
      style={{ width: `calc(${name.length}ch + 4ch)` }}
      className={`navigate ${active ? 'active' : ''}`}
      onClick={event => { $(`#${name}`)!.scrollIntoView({ behavior: 'smooth', block: 'end' }) }}
      onMouseEnter={(e) => { hack({ originalString: name, origin: ref.current! }) }}
    >
      <span ref={ref}>{name}</span>
      <div style={{ width: `${name.length}ch` }} className='hover'/>
    </a>
  )
}
