"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export function CheckoutReturnSync() {
  const { refreshCart, setCartOpen } = useCart();

  useEffect(() => {
    setCartOpen(false);
    void refreshCart();
  }, [refreshCart, setCartOpen]);

  return null;
}
