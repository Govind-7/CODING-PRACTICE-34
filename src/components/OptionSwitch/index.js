import './index.css'

const OptionSwitch = props => {
  const {item1, categoryFuncMain, category} = props
  const {name, categoryId} = item1
  const special = category === categoryId ? 'special' : ''

  const categoryFunc = () => {
    categoryFuncMain(categoryId)
  }

  return (
    <li>
      <p
        onClick={categoryFunc}
        className={`category-but ${special}`}
        type="button"
      >
        {name}
      </p>
    </li>
  )
}

export default OptionSwitch
