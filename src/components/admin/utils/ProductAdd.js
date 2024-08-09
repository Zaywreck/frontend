import styles from '@/styles/componentStyles/Add.module.css';

function ProductAdd({ newProduct, setNewProduct, handleAddProduct, loading }) {
    return (
        <div className={styles.formContainer}>
            <input
                type="text"
                placeholder="Product Code"
                value={newProduct.product_code}
                onChange={(e) => setNewProduct({ ...newProduct, product_code: e.target.value })}
                disabled={loading}
                className={styles.input}
            />
            <input
                type="text"
                placeholder="Product Name"
                value={newProduct.product_name}
                onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })}
                disabled={loading}
                className={styles.input}
            />
            <input
                type="text"
                placeholder="Unit Price"
                value={newProduct.unit_price}
                onChange={(e) => setNewProduct({ ...newProduct, unit_price: e.target.value })}
                disabled={loading}
                className={styles.input}
            />
            <button onClick={handleAddProduct} disabled={loading} className={styles.button}>Add Product</button>
            </div>
    );
}

export default ProductAdd;