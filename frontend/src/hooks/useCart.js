import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getCartRequest,
  addToCartRequest,
  updateCartItemRequest,
  removeCartItemRequest,
  clearCartRequest,
} from "../api/cart.api.js";
import { getErrorMessage } from "../api/axiosClient.js";
import { useAuth } from "./useAuth.js";

export function useCart() {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: getCartRequest,
    enabled: isAuthenticated,
  });

  const invalidateCart = () => queryClient.invalidateQueries({ queryKey: ["cart"] });

  const addMutation = useMutation({
    mutationFn: addToCartRequest,
    onSuccess: () => {
      invalidateCart();
      toast.success("Added to cart");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const updateMutation = useMutation({
    mutationFn: updateCartItemRequest,
    onSuccess: invalidateCart,
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const removeMutation = useMutation({
    mutationFn: removeCartItemRequest,
    onSuccess: () => {
      invalidateCart();
      toast.success("Removed from cart");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const clearMutation = useMutation({
    mutationFn: clearCartRequest,
    onSuccess: invalidateCart,
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const items = cartQuery.data?.items || [];
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => {
    const unitPrice = i.product.discountPrice ?? i.product.price;
    return sum + Number(unitPrice) * i.quantity;
  }, 0);

  return {
    items,
    itemCount,
    subtotal,
    isLoading: cartQuery.isLoading,
    addToCart: addMutation.mutate,
    updateItem: updateMutation.mutate,
    removeItem: removeMutation.mutate,
    clearCart: clearMutation.mutate,
    isMutating:
      addMutation.isPending ||
      updateMutation.isPending ||
      removeMutation.isPending ||
      clearMutation.isPending,
  };
}