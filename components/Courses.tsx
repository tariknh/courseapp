import React from "react";
import Card from "./Card";

function Courses() {
  return (
    <div className="mt-12 flex p-6 flex-col min-h-screen bg-accent rounded-t-3xl">
      <h1 className="my-6 text-left font-bold  text-white max-w-4xl lg:text-8xl text-5xl">
        de nyeste kursene
      </h1>
      <section className="mt-8 place-content-center gap-2 flex flex-wrap items-center">
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
    </div>
  );
}

export default Courses;
