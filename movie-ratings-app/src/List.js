import Item from "./Item";


const List = ({list, onRemoveItem}) => (
  
  list.map(item => (
    <Item 
      key={item.id}
      item={item}
      onRemoveItem={onRemoveItem}
    />
  ))
)

export default List;