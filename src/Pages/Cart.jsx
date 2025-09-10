import { useCart } from "../Provider/CartContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
  const { cart, removeFromCart, updateCartItem, clearCart } = useCart();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    removeFromCart(id);
    Swal.fire({
      icon: "success",
      title: "Removed",
      text: "Item removed from cart",
      toast: true,
      position: "top-end",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    updateCartItem(id, quantity);
  };

  const handleClearCart = () => {
    clearCart();
    Swal.fire({
      icon: "success",
      title: "Cart Cleared",
      toast: true,
      position: "top-end",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      Swal.fire("Your cart is empty!", "", "warning");
      return;
    }
    Swal.fire({
      title: "Proceed to Checkout?",
      text: "Are you sure you want to checkout with these items?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/checkout");
      }
    });
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0)
    return (
      <div className="p-10 text-center text-xl font-semibold">
        Your cart is empty
      </div>
    );

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-8">Your Cart</h2>

      <div className="flex flex-col gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-neutral p-4 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
                className="w-20 p-2 border border-gray-300 rounded-xl text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                aria-label="Item quantity"
              />
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 font-semibold hover:underline hover:text-red-600 transition"
                aria-label="Remove item from cart"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <h3 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>
        <div className="flex gap-4">
          <button
            onClick={handleClearCart}
            className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition-colors"
            aria-label="Clear the cart"
          >
            Clear Cart
          </button>
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 transition-colors"
            aria-label="Proceed to checkout"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
