import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
  state = { }
  render() {
    const { books } = this.props
    let bookshelves = []

    /* recreate the data structure object
      [{
        name:"currently reading",
        books: []
      },
      {
        name:"want to read",
        books: []
      },
      {
        name:"read",
        books: []
      }]
    */
    let categories = []
    // extract
    books.forEach((book, index) => (
      categories.push(book.shelf)
    ))
    // unique categories
    categories = [...new Set(categories)]
    let temp = []
    categories.forEach((category) => (
      books.forEach((book) => (
        book.shelf === category ? temp.push(book) : undefined
      )),
      bookshelves.push(
        {
          // convert camelCase to Regular Form
          name:category.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => { return str.toUpperCase() }),
          books:temp
        }
      ),
      temp = []
    ))

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookshelves.map((shelf, index) => (
              <Bookshelf key={index} shelfName={shelf.name} books={shelf.books} />
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