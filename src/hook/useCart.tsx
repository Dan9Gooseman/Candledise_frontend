
const useCart = () => {
  const createNewCart = async (id: string) => {
    await fetch("http://localhost:3000/carts", {
      body: JSON.stringify({ id }),
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const getCartOfUser = async (userID: string) => {
    const response = await fetch(`http://localhost:3000/carts/user/${userID}`, {
      method: "get",
    });
    const data = await response.json();
    const cartID = data._id;
    localStorage.setItem("cartid", cartID)
  };
  return { createNewCart, getCartOfUser };
};
export default useCart;
