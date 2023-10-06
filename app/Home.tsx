export default function Hero() {
  return (
    <section>
      <video
        className="absolute w-screen h-screen object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/fjell.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <section className="p-8 justify-start h-screen grid bg-destructive">
        <div className="z-10 place-self-end grid gap-8">
          <h1 className="max-w-[16rem] text-balance font-bold text-6xl font-sans text-white">
            the ideal dose of nature
          </h1>
          <button className="px-8 py-4 font-bold text-xl border rounded-full bg-white max-w-fit text-black p-8">
            build your box
          </button>
        </div>
      </section>
    </section>
  );
}
