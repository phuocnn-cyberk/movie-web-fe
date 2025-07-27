import Image from "next/image";

export function TrialBanner() {
  return (
    <section className="relative bg-black rounded-xl overflow-hidden mx-10 my-10 h-60">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80" />

      {/* ✅ Dùng Image thay vì img */}
      <div className="absolute inset-0">
        <Image
          src="/images/cta-bg.jpg"
          alt="CTA Background"
          fill
          className="object-cover opacity-20"
        />
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-between px-10">
        <div>
          <h2 className="text-4xl font-bold text-white">Start your free trial today!</h2>
          <p className="text-gray-300 mt-2 max-w-lg">
            This is a clear and concise call to action that encourages users to sign up for a free trial of StreamVibe.
          </p>
        </div>
        <button className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-semibold shadow-lg">
          Start a Free Trial
        </button>
      </div>
    </section>
  );
}
