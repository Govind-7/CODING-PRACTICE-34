import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    isfailed: false,
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    category: '',
    search: '',
    rating: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, category, search, rating} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${category}&title_search=${search}&rating=${rating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
        isfailed: false,
      })
    } else {
      this.setState({isLoading: false, isfailed: true})
    }
  }

  returningFunction = () => (
    <div>
      <img
        alt="products failure"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
      />
      <h1>Oops Something Went Wrong</h1>
      <p>
        We are having some trouble to process your request. Please try again
      </p>
    </div>
  )

  sizeZeroFunc = () => (
    <div>
      <img
        alt="no products"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
      />
      <h1>No products found</h1>
      <p>We could not found any product.Try other filters</p>
    </div>
  )

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  clearFilterMain = () => {
    this.setState(
      {
        category: '',
        rating: '',
        search: '',
        activeOptionId: sortbyOptions[0].optionId,
      },
      this.getProducts,
    )
  }

  searchInputMain = lov => {
    console.log(lov)
    this.setState({search: lov}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList} = this.state
    // console.log(productsList.length)

    if (productsList.length === 0) {
      return this.sizeZeroFunc()
    }

    // TODO: Add No Products View
    return (
      <div>
        <div className="all-products-container">
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view
  categoryFuncMain = lov => {
    this.setState({category: lov}, this.getProducts)
  }

  ratingFuncMain = lov => {
    this.setState({rating: lov}, this.getProducts)
  }

  render() {
    const {isLoading, activeOptionId, isfailed, category, rating} = this.state

    return (
      <div>
        <ProductsHeader
          searchInputMain={this.searchInputMain}
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <div className="all-products-section">
          {/* TODO: Update the below element */}

          <FiltersGroup
            clearFilterMain={this.clearFilterMain}
            category={category}
            rating={rating}
            ratingFuncMain={this.ratingFuncMain}
            categoryFuncMain={this.categoryFuncMain}
            data={ratingsList}
            categoryOptions={categoryOptions}
          />
          {isfailed ? this.returningFunction() : ''}

          {isLoading ? this.renderLoader() : this.renderProductsList()}
        </div>
      </div>
    )
  }
}

export default AllProductsSection
