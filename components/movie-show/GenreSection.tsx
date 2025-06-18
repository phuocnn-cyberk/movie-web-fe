const genres = ["Action", "Adventure", "Comedy", "Drama", "Horror"];

export function GenreSection() {
  return (
    <section className="mt-8 mx-10">
      <h2 className="text-xl font-semibold mb-4">Our Genres</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {genres.map((genre) => (
          <div key={genre} className="bg-gray-800 p-3 rounded hover:bg-gray-700">
            <img src={`/images/${genre.toLowerCase()}.jpg`} className="h-32 w-full object-cover rounded" />
            <p className="mt-2 text-center">{genre}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
