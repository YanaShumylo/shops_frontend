import { useCart } from "../../hooks/useCart";
import OrderForm from "../../components/OrderForm/OrderForm";
import css from "./OrdersPage.module.css";

export default function OrdersPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <section className={css.ordersPage}>
      <h3 className={css.title}>Shopping Cart</h3>

      {cart.length === 0 ? (
        <p className={css.emptyCart}>Your cart is empty</p>
      ) : (
        <>
          <ul className={css.cartList}>
            {cart.map(({ product, quantity }) => (
              <li key={product._id} className={css.cartItem}>
                <div className={css.productInfo}>
                  <h3 className={css.productName}>{product.name}</h3>
                  <p className={css.productPrice}>${product.price.toFixed(2)}</p>
                </div>

                <div className={css.productActions}>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    className={css.quantityInput}
                    onChange={(e) =>
                      updateQuantity(product._id, Number(e.target.value))
                    }
                  />
                  <button
                    className={css.deleteButton}
                    onClick={() => removeFromCart(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={css.total}>
            <strong>Total:</strong> ${total.toFixed(2)}
          </div>

          <OrderForm cart={cart} />
        </>
      )}
    </section>
  );
}