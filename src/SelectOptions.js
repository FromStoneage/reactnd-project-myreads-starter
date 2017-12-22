import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class SelectOptions extends Component {
  state = {
    value: ''
  }

  change = (event) => {
    this.props.book.shelf = event.target.value
    console.log('SelectOptions', event.target.value, 'this.props', this.props.book.shelf)
    console.log('parents props')
  }

  render() {
    const { book } = this.props

    return (
      <select onChange={this.change} value={this.state.value}>
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    )
  }
}

export default SelectOptions