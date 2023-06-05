import React from "react";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsFillPlayFill } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import FavoriteButton from "./FavoriteButton";
import useInfoModal from "@/hooks/useInfoModal";

interface MovieCarouselProps {
  settings: Record<string, any>;
  movieList: Record<string, any>[];
  title: string;
  classes?: string;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({
  settings,
  movieList,
  title,
  classes,
}) => {
  const router = useRouter();
  const { openModal } = useInfoModal();
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
        {title}
      </p>
      <Swiper {...settings} className={`h-[15vw] ${classes}`}>
        {movieList.map((movie) => (
          <SwiperSlide
            key={movie.id}
            className="group bg-zinc-900 relative h-[15vw] overflow-visible"
          >
            <img
              src={movie.thumbnailUrl}
              alt="Movie"
              draggable={false}
              className="
                cursor-pointer
                object-cover
                transition
                duration
                shadow-xl
                rounded-md
                group-hover:opacity-90
                group-hover:scale-110
                sm:group-hover:opacity-0
                delay-300
                w-full
                h-[15vw]
            "
            />
            <div
              className="
                opacity-0
                absolute
                top-0
                transition
                duration-200
                invisible
                sm:visible
                delay-300
                w-full
                scale-0
                group-hover:scale-110
                group-hover:-translate-y-[6vw]
                group-hover:-translate-x-[1vw]
                group-hover:opacity-100
              "
            >
              <img
                src={movie.thumbnailUrl}
                alt="Movie"
                draggable={false}
                className="
                  cursor-pointer
                  object-cover
                  transition
                  duration
                  shadow-xl
                  rounded-t-md
                  w-full
                  h-[15vw]
                  "
              />
              <div
                className="
                bg-zinc-700
                p-2
                lg:p-4
                absolute
                w-full
                transition
                shadow-md
                rounded-b-md
              "
              >
                <div className="flex flex-row items-center gap-2">
                  <div
                    className="
                    cursor-pointer
                    w-6
                    h-6
                    lg:w-10
                    lg:h-10
                    bg-white
                    rounded-full
                    flex
                    justify-center
                    items-center
                    hover:bg-neutral-3
                  "
                    onClick={() => {}}
                  >
                    <BsFillPlayFill
                      size={30}
                      onClick={() => router.push(`/watch/${movie?.id}`)}
                    />
                  </div>
                  <FavoriteButton movieId={movie?.id} />
                  <div
                    onClick={() => openModal(movie?.id)}
                    className="
                  cursor-pointer 
                  ml-auto 
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
                  hover:border-neutral-300"
                  >
                    <BiChevronDown
                      size={30}
                      className="text-white group-hover/item:text-neutral-300"
                    />
                  </div>
                </div>
                <p className="text-green-400 font-semibold mt-4">
                  New <span className="text-white">2023</span>
                </p>
                <div className="flex flex-row mt-4 gap-2 items-center">
                  <p className="text-white text-[10px] lg:text-sm">
                    {movie.duration}
                  </p>
                </div>
                <div className="flex flex-row mt-4 gap-2 items-center">
                  <p className="text-white text-[10px] lg:text-sm">
                    {movie.genre}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieCarousel;
