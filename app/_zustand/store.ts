import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ProductInCart = {
  id: string;
  title: string;
  price: number;
  image: string;
  amount: number;
};

export type State = {
  products: ProductInCart[];
  allQuantity: number;
  total: number;
};

export type Actions = {
  addToCart: (newProduct: ProductInCart) => void;
  removeFromCart: (id: string) => void;
  updateCartAmount: (id: string, quantity: number) => void;
  calculateTotals: () => void;
  clearCart: () => void;
};

export const useProductStore = create<State & Actions>()(
  persist(
    (set) => ({
      products: [],
      allQuantity: 0,
      total: 0,

      addToCart: (newProduct) => {
        set((state) => {
          const existing = state.products.find((p) => p.id === newProduct.id);
          if (!existing) {
            // New item — append it
            return { products: [...state.products, newProduct] };
          }
          // Existing item — return a new array with the updated amount
          return {
            products: state.products.map((p) =>
              p.id === newProduct.id
                ? { ...p, amount: p.amount + newProduct.amount }
                : p
            ),
          };
        });
      },

      removeFromCart: (id) => {
        // Return a new array — do NOT mutate state.products directly
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      updateCartAmount: (id, amount) => {
        // Return a new array with the updated amount — do NOT mutate
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, amount } : p
          ),
        }));
      },

      calculateTotals: () => {
        set((state) => {
          const allQuantity = state.products.reduce(
            (sum, item) => sum + item.amount,
            0
          );
          const total = state.products.reduce(
            (sum, item) => sum + item.amount * item.price,
            0
          );
          return { allQuantity, total };
        });
      },

      clearCart: () => {
        set({ products: [], allQuantity: 0, total: 0 });
      },
    }),
    {
      name: "products-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
