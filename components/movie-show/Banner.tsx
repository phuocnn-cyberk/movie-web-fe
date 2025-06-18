export function Banner() {
  return (
    <section className="relative h-[600px] bg-cover bg-center mx-10" style={{ backgroundImage: "url('/images/avengers.png')" }}>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute bottom-10 left-10">
        <h1 className="text-4xl font-bold">Avengers : Endgame</h1>
        <p className="max-w-lg text-sm mt-2">
          With the help of remaining allies, the Avengers must assemble once more to reverse Thanos' actions...
        </p>
        <button className="mt-4 bg-red-600 px-4 py-2 rounded">▶ Play Now</button>
      </div>
    </section>
  );
}
