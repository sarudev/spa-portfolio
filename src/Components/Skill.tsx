import React from 'react'

export default function Skill ({ name, level }: { name: string, level: number }): React.ReactElement {
  return (
    <div className="skill">
      <div className="name-level">
        <span>{name}</span><span>{level}%</span>
      </div>
      <div className="level">
        <div className="fill" style={{ width: `${level}%` }}/>
      </div>
    </div>
  )
}
