import Navbar from "@/components/Navbar";
import { Navigation } from "swiper";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  const settings = {
    spaceBetween: 10,
    slidesPerView: 3,
    navigation: true,
    modules: [Navigation],
    breakpoints: {
      576: {
        // width: 576,
        slidesPerView: 2,
      },
      768: {
        // width: 768,
        slidesPerView: 3,
      },
    },
  };
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList
          title="Trending Now"
          movieList={movies}
          settings={settings}
          classes="trending-now-swiper-container"
        />
        <MovieList
          title="My List"
          movieList={favorites}
          settings={settings}
          classes="trending-now-swiper-container"
        />
      </div>
    </>
  );
}
