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
            <SelectOptions/>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors.map((author, index) => (
          <div key={index} className="book-authors">{author}</div>
        ))}
      </div>
    )
  }
}

export default Books