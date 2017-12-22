import React, { Component } from 'react'
// import SelectOptions from './SelectOptions'

class Books extends Component {
  updateBook = (event) => {
    const { book, onBookUpdated } = this.props
    onBookUpdated(book, event.target.value)
  }

  render() {
    const { book } = this.props
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={this.updateBook}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
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