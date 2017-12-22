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
    BooksAPI.update(book, newShelf);

    const { books } = this.state
    books.forEach((item) => {
      if(item.id === book.id)
        item.shelf = newShelf
    })

    this.setState({ books: books })
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
