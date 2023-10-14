import React from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Card from "./Card";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <Card />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
