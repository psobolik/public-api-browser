import React from 'react'

function CategoryItem (prop) {
  return <option>{prop.value}</option>
}

function CategoryList (props) {
  const { error, isLoaded, list } = props.categories
  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else if (list && list.categories) {
    const listItems = list.categories.sort().map((item, index) =>
      <CategoryItem key={index} value={item} />
    )
    return (
      <span className='Panel'>
        <h2>Category</h2>
        <select className={'Categories'}
                size={listItems.length}
                value={props.selectedCategory}
                onChange={(e) => props.selectCategoryHandler(e)}>
          {listItems}
        </select>
      </span>
    )
  }
  return null
}
export default CategoryList
