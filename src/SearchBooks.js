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
    // console.log('SearchBook', event.target.value)
    this._search(event.target.value)

    // const results = BooksAPI.search(event.target.value)
    // console.log('results', results)
  }

  _search = debounce(async (value) => {
    const results = await BooksAPI.search(value)
    console.log('results', results)
    this.setState({results})
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