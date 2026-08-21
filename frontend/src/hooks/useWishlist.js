import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getWishlistRequest,
  addToWishlistRequest,
  removeFromWishlistRequest,
} from "../api/wishlist.api.js";
import { getErrorMessage } from "../api/axiosClient.js";
import { useAuth } from "./useAuth.js";

export function useWishlist() {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const wishlistQuery = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlistRequest,
    enabled: isAuthenticated,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["wishlist"] });

  const addMutation = useMutation({
    mutationFn: addToWishlistRequest,
    onSuccess: () => {
      invalidate();
      toast.success("Added to wishlist");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWishlistRequest,
    onSuccess: () => {
      invalidate();
      toast.success("Removed from wishlist");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const items = wishlistQuery.data || [];
  const productIds = new Set(items.map((i) => i.productId));

  const isWishlisted = (productId) => productIds.has(productId);
  const toggle = (productId) => {
    if (isWishlisted(productId)) {
      removeMutation.mutate(productId);
    } else {
      addMutation.mutate(productId);
    }
  };

  return {
    items,
    isLoading: wishlistQuery.isLoading,
    isWishlisted,
    toggle,
    isMutating: addMutation.isPending || removeMutation.isPending,
  };
}