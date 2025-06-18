// components/movie-show/TrialBanner.tsx
export function TrialBanner() {
  return (
    <section className="relative bg-black rounded-xl overflow-hidden mx-10 my-10">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-red-800 opacity-80" />
      <img
        src="/images/cta-bg.jpg"
        alt="CTA Background"
        className="w-full h-48 object-cover opacity-20"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-start px-10 z-10">
        <h2 className="text-3xl font-bold text-white">Start your free trial today!</h2>
        <p className="text-gray-300 mt-2">This is a clear and concise call to action...</p>
        <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          Start a Free Trial
        </button>
      </div>
    </section>
  );
}
