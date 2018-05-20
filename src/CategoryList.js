import React from 'react';

function CategoryItem(props) {
  return <option>{props.value}</option>
}

function CategoryList(props) {
  const {error, isLoaded, list} = props.categories;
  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    const listItems = list.sort().map((item, index) =>
      <CategoryItem key={index} value={item}/>
    );
    return (
      <span className="Panel">
        <h2>Category</h2>
        <select size={listItems.length} onChange={(e) => props.selectCategoryHandler(e)}>
          {listItems}
        </select>
      </span>
    );
  }
}
export default CategoryList;
