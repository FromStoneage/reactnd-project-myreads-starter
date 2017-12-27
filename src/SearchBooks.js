import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Books from './Books'
import * as BooksAPI from './BooksAPI'
import debounce from 'lodash/debounce'

class SearchBooks extends Component {
  state = {
    results: []
  }

  change = (event) => {
    let searchTerm = event.target.value;
    if(searchTerm && searchTerm.length){
      this._search(searchTerm)
    }else{
      this.setState({ results : [] })
    }
  }

  _search = debounce(async (value) => {
    const results = await BooksAPI.search(value)
    // merge current book shelf books in the search results
    if (results && Array.isArray(results)){
      results.forEach((item) => {
        this.props.books.forEach(currentBook => {
          if(item.id === currentBook.id){
            item.shelf = currentBook.shelf
          }else{
            item.shelf = 'none'
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
            {this.state.results.map((book) => (
                <li key={book.id}>
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