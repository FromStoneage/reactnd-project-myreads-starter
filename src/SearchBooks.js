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
    const { books } = this.props
    let searchTerm = event.target.value;
    if(searchTerm && searchTerm.length){
      this._search(searchTerm, books)
    }else{
      this.setState({ results : [] })
    }
  }

  _search = debounce(async (searchTerm, books) => {
    const results = await BooksAPI.search(searchTerm)
    // merge current book shelf books in the search results
    if (results && Array.isArray(results)){
      let mergedArray = []
      let mergedResults = Object.assign({}, results, books)

      for(let key in mergedResults){
        mergedArray.push(mergedResults[key])
      }

      this.setState({results: mergedArray})
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