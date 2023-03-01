import Item from "./Item";


const List = ({list, onRemoveItem}) => {
  return (Object.keys(list).map((key) => (
    <Item 
      key={list[key]['name']}
      item={list[key]}
      onRemoveItem={onRemoveItem}
    />
    // console.log(list[key]['id'])
  )))
  }

export default List;