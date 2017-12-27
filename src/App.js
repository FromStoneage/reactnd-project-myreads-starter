import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook = (book, newShelf) => {
    const { books } = this.state
    let updatedBooks = []
    BooksAPI.update(book, newShelf).then((result) => {
      if(result) {
        // filter down the book that were updated
        updatedBooks = books.filter((item) =>{
          for(let key in result) {
            if(result[key].includes(item.id) && item.shelf !== key){
              item.shelf = key
              return item
            }
          }
        })

        // handles when a book is set to none book shelf
        if(newShelf === 'none'){
          updatedBooks = books.filter(b => b.id === book.id)
          updatedBooks.forEach(b => b.shelf = newShelf)
        }

        // merge updated book with states and update the state
        updatedBooks = Object.assign({}, books, updatedBooks)
        this.setState({ updatedBooks })
        updatedBooks = []
      }
    })

    // handles when a new book added to the shelf
    if( books.map(x => x.id).includes(book.id) === false ){
      book.shelf = newShelf
      this.setState( { books: books.concat(book) })
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks books={this.state.books}
                     onBookUpdated={this.updateBook} />
        )}/>
        <Route path='/search' render={({ history }) => (
          <SearchBooks books={this.state.books}
                       onBookUpdated={this.updateBook} />
        )}/>
      </div>
    )
  }
}

export default BooksApp