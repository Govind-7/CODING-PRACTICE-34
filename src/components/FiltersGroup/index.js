import CategorySwitch from '../CategorySwitch'
import OptionSwitch from '../OptionSwitch'

import './index.css'

const FiltersGroup = props => {
  const {
    data,
    categoryOptions,
    ratingFuncMain,
    categoryFuncMain,
    category,
    rating,
    clearFilterMain,
  } = props
  const clearFilter = () => {
    clearFilterMain()
  }

  return (
    <div className="filters-group-container">
      <h1>Category</h1>
      <ul>
        {categoryOptions.map(item => (
          <OptionSwitch
            category={category}
            categoryFuncMain={categoryFuncMain}
            item1={item}
          />
        ))}
      </ul>
      <h1>Rating</h1>

      <div>
        {data.map(item => (
          <CategorySwitch
            rating={rating}
            ratingFuncMain={ratingFuncMain}
            dat={item}
          />
        ))}
      </div>
      <button onClick={clearFilter} type="button">
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
