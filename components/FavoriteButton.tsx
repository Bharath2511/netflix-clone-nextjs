import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import useFavorites from "@/hooks/useFavorites";
import useCurrentUser from "@/hooks/useCurrentUser";
import { mutate } from "swr";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.post("/api/favourite", {
        movieId,
        method: "DELETE",
      });
    } else {
      response = await axios.post("/api/favourite", {
        movieId,
        method: "POST",
      });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={(e) => {
        toggleFavorites(e);
      }}
      className="
    cursor-pointer 
    group/item
    w-6
    h-6
    lg:w-10
    lg:h-10
    border-white
    border-2
    rounded-full
    flex
    justify-center
    items-center
    transition
    hover:border-neutral-300
    "
    >
      <Icon className="text-white size={25}" />
    </div>
  );
};

export default FavoriteButton;
