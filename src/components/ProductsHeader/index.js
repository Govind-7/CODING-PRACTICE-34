import {Component} from 'react'

import {BsFilterRight} from 'react-icons/bs'

import './index.css'

class ProductsHeader extends Component {
  state = {
    inputValue: '',
  }

  onChangeFunction = event => {
    this.setState({inputValue: event.target.value})
    // console.log(event.key)
  }

  render() {
    const {inputValue} = this.state
    const {
      sortbyOptions,
      activeOptionId,

      searchInputMain,
    } = this.props

    const searchInput = event => {
      if (event.key === 'Enter') {
        if (inputValue !== '') {
          searchInputMain(inputValue)
        }
      }
    }

    const onChangeSortby = event => {
      const {changeSortby} = this.props

      changeSortby(event.target.value)
    }

    return (
      <div className="products-header">
        <input
          onChange={this.onChangeFunction}
          value={inputValue}
          onKeyUp={searchInput}
          type="search"
        />
        <h1 className="products-list-heading">All Products</h1>
        <div className="sort-by-container">
          <BsFilterRight className="sort-by-icon" />
          <p className="sort-by">Sort by</p>
          <select
            className="sort-by-select"
            value={activeOptionId}
            onChange={onChangeSortby}
          >
            {sortbyOptions.map(eachOption => (
              <option
                key={eachOption.optionId}
                value={eachOption.optionId}
                className="select-option"
              >
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }
}

export default ProductsHeader
