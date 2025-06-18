// components/movie-show/MovieCarousel.tsx
import Image from "next/image";

export function MovieCarousel({ title }: { title: string }) {
    return (
        <section className="w-full flex flex-col items-center  px-10 py-6">
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <div className="flex space-x-4 overflow-x-auto ">
                {[
                    { title: "DURANGA", img: "/images/duranga.jpg", duration: "7h 40min", rating: "12K" },
                    { title: "MONEY HEIST", img: "/images/moneyheist.jpg", duration: "12h 23min", rating: "28K" },
                    { title: "MAI", img: "/images/mai.jpg", duration: "?", rating: "2K" },
                    { title: "STRANGER THINGS", img: "/images/strangerthings.jpg", duration: "8h 20min", rating: "32K" }
                ].map((movie, index) => (
                    <div key={index} className="flex flex-col min-w-[280px] min-h-[360px] bg-gray-900 p-2 rounded-lg shadow-md">
                        <Image src={movie.img} alt={movie.title} width={180} height={250} className="rounded" />
                        <div className="mt-auto">
                            <h3 className="text-sm font-bold mt-2">{movie.title}</h3>
                            <div className="flex justify-between text-xs mt-1 text-gray-400">
                                <span>🕒 {movie.duration}</span>
                                <span>⭐ {movie.rating}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
