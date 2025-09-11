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
      <div className="p-6 sm:p-10 text-center text-lg sm:text-xl font-semibold">
        Your cart is empty
      </div>
    );

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center md:text-left">
        Your Cart
      </h2>

      {/* Cart Items */}
      <div className="flex flex-col gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row justify-between md:items-center bg-neutral p-4 rounded-xl shadow-md"
          >
            {/* Image + Info */}
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-bold text-base sm:text-lg">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Quantity + Remove */}
            <div className="flex items-center gap-3 sm:gap-4 mt-4 md:mt-0">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
                className="w-16 sm:w-20 p-2 border border-gray-300 rounded-xl text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
                aria-label="Item quantity"
              />
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 text-sm sm:text-base font-semibold hover:underline hover:text-red-600 transition"
                aria-label="Remove item from cart"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total + Actions */}
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <h3 className="text-xl sm:text-2xl font-bold text-center md:text-left">
          Total: ${totalPrice.toFixed(2)}
        </h3>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={handleClearCart}
            className="bg-red-500 text-white px-4 sm:px-5 py-2 rounded-full hover:bg-red-600 transition-colors text-sm sm:text-base"
            aria-label="Clear the cart"
          >
            Clear Cart
          </button>
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white px-4 sm:px-5 py-2 rounded-full hover:bg-green-600 transition-colors text-sm sm:text-base"
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
