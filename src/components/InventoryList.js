export default function InventoryList({ inventory }) {
    return (
      <ul>
        {inventory.map(item => (
          <li key={item.id}>
            Product Code: {item.productCode} - Warehouse Code: {item.warehouseCode} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    );
  }
  