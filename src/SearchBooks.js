import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Books from './Books'
import * as BooksAPI from './BooksAPI'
import debounce from 'lodash/debounce';

class SearchBooks extends Component {
  state = {
    results: []
  }

  change = (event) => {
    this._search(event.target.value)
  }

  _search = debounce(async (value) => {
    const results = await BooksAPI.search(value)
    // merge current book shelf books in the search results
    if (results && Array.isArray(results)){
      console.log('this.props.books', this.props.books)
      results.forEach((item) => {
        this.props.books.forEach(currentBook => {
          if(item.id === currentBook.id){
            item.shelf = currentBook.shelf
          }
        });
      })

      this.setState({results})
    }
  }, 500)

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.change}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results.map((book, index) => (
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

export default SearchBooks