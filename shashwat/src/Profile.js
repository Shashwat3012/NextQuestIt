import React from 'react'

export default function Profile(props) {
  return (
    <div>
      <h1>This is profile</h1>
      <h2>{props.name}</h2>
      <h2>{props.bio}</h2>
    </div>
  )
}
