import React from "react";
import Card from "./Card";

function Courses() {
  return (
    <div className="mt-12 md:p-40 flex p-6 flex-col min-h-screen bg-offblack rounded-t-3xl">
      <h1 className="my-6 text-left font-bold  text-white max-w-4xl lg:text-8xl text-5xl">
        featured courses
      </h1>
      <section className="mt-8 place-content-center gap-2 flex flex-wrap items-center">
        <Card image="/courseimg/art.jpg" price="2499" />
        <Card image="/courseimg/food.jpg" price="2499" />
        <Card image="/courseimg/tavle.jpg" price="2499" />
        <Card image="/courseimg/bakery.png" price="2499" />
      </section>
    </div>
  );
}

export default Courses;
