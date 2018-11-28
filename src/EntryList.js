import React from 'react'
import './App.css'

function EntryRow (prop) {
  return <tr>
    <td><a href={prop.entry.Link} target='_new'>{prop.entry.API}</a></td>
    <td>{prop.entry.Description}</td>
    <td>{prop.entry.Auth}</td>
    <td>{prop.entry.HTTPS ? 'yes' : ''}</td>
    <td>{prop.entry.Cors}</td>
  </tr>
}

function EntryList (props) {
  const { error, isLoaded, list, category } = props.entries
  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <p>Loading entries...</p>
  } else {
    const rows = list.map((item, index) =>
      <EntryRow key={index} entry={item} />
    )
    return (
      <span className='Panel'>
        <h2>{category}</h2>
        <table className='EntryTable'>
          <col width='150px' />
          <col width='200px' />
          <col width='80px' />
          <col width='80px' />
          <col width='80px' />
          <thead><tr><th>API</th><th>Description</th><th>Auth</th><th>HTTPS</th><th>CORS</th></tr></thead>
          <tbody>
            {rows}
          </tbody></table>
      </span>
    )
  }
}
export default EntryList
