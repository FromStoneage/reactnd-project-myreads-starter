import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
  // not the most efficient way to recreate the data structure
  getBookShelves = () => {
    const { books } = this.props
    let bookshelves = []

    /* recreate the data structure object
      [{ name:'', books: [] }]
    */
    let categories = []
    // extract
    books.forEach((book, index) => {
      if(book.shelf !== 'none')
        categories.push(book.shelf)
    })

    // unique categories
    categories = [...new Set(categories)].sort()
    let temp = []
    categories.forEach((category) => {
      books.forEach((book) => (
        book.shelf === category ? temp.push(book) : undefined
      ))
      bookshelves.push(
        {
          // convert camelCase to Regular Form
          name:category.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => {
            return str.toUpperCase() }),
          books:temp
        }
      )
      temp = [] // reset
    })
    return bookshelves
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.getBookShelves().map((shelf, index) => (
              <Bookshelf key={index}
                         shelfName={shelf.name}
                         books={shelf.books}
                         onBookUpdated={this.props.onBookUpdated} />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks