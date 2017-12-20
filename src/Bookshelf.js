import React, { Component } from 'react'
import Books from './Books'

class Bookshelf extends Component {
  render() {
    const { shelfName, books } = this.props
    console.log('books', books);
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <li>
              <Books/>
            </li>
            <li>
              <Books/>
            </li>
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf