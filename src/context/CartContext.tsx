// import React, { createContext, useContext, useState, ReactNode } from "react";

// interface CartContextType {
//   cartID: string | null;
//   setCartID: React.Dispatch<React.SetStateAction<string | null>>;
// }
// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [cartID, setCartID] = useState<string | null>(null);

//   return (
//     <CartContext.Provider value={{ cartID, setCartID }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCartContext = (): CartContextType => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCartContext must be used within a CartProvider");
//   }
//   return context;
// };
