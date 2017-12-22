import React, { Component } from 'react'
import SelectOptions from './SelectOptions'

class Books extends Component {
  render() {
    const { book } = this.props
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <SelectOptions book={book}/>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
        {book.authors.join(', ')}
        </div>
      </div>
    )
  }
}

export default Books