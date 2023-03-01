import Button from 'react-bootstrap/Button';

const Item = ({item, onRemoveItem}) => 

  (
    
      <div key={item['name']} className="container align-items-center flex-column d-flex justify-content-center flex-wrap">
        <div className="align-items-center flex-column d-flex justify-content-center flex-wrap">
          <img src={item['poster']} width="220" height="326"/>
          <Button variant="danger" type='button' onClick={() => onRemoveItem(item)}>Remove</Button>{' '}
        </div>
        <ul className="p-0 w-25 d-flex justify-content-center flex-column align-items-center">
          <ol className="p-0">{item['actors']}</ol>
          <ol className="p-0">{item['releaseDate']}</ol>
          <ol className="p-0">{item['rating']}</ol>
        </ul>
        
      </div>
  )


export default Item;