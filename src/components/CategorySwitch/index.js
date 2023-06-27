const CategorySwitch = props => {
  const {dat, ratingFuncMain, rating} = props
  //   console.log(dat)
  const {imageUrl, ratingId} = dat
  const ratingFunc = () => {
    ratingFuncMain(ratingId)
  }
  const special = rating === ratingId ? 'special' : ''

  return (
    <div className="rating-align">
      <button type="button" onClick={ratingFunc} className="category-but">
        <img alt={`rating ${ratingId}`} className="rating-img" src={imageUrl} />
      </button>
      <p className={`${special}`}>& up</p>
    </div>
  )
}
export default CategorySwitch
