import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
  state = {

  }
  render() {
    const { books } = this.props

    let bookshelves = {
      name: '',
      books: []
    }

    /* recreate the data structure object
      {
        name:"currently reading"
        books: [

        ]
      },
      {
        name:"want to read"
        books: [

        ]
      },
      {
        name:"read"
        books: [

        ]
      }
    */

    books.forEach((book, index) => (
      // bookshelves.name = book.shelf
      bookshelves.books.concat(book)
    ));

    console.log('bookshelves', bookshelves)

    // convert camelCase to Regular Form
    const bookshelvesName = Object.keys(bookshelves).map((item) => (
      item.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => { return str.toUpperCase() })
    ))

    console.log(bookshelvesName)

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookshelvesName.map((shelfName, index) => (
              <Bookshelf key={index} shelfName={shelfName} books={books} />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to='/'>Add a book</Link>
          {/* <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a> */}
        </div>
      </div>
    )
  }
}

export default ListBooks
