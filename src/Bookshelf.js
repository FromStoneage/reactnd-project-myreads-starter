import React from 'react'
import Books from './Books'

const Bookshelf = (props) => {
  const { shelfName, books } = props

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Books book={book}
                      onBookUpdated={props.onBookUpdated} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default Bookshelf