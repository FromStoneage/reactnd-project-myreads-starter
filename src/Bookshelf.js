import React, { Component } from 'react'
import Books from './Books'

class Bookshelf extends Component {
  render() {
    const { shelfName, books } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book, index) => (
              <li key={index}>
                <Books book={book}
                       onBookUpdated={this.props.onBookUpdated} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf