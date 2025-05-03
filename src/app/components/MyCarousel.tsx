// components/ui/general-carousel/GeneralCarousel.tsx
'use client';

import React, { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

interface GeneralCarouselProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  autoplayDelay?: number;
  itemsPerView?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  navigationButtonsClass?: string;
  className?: string;
  loop?: boolean;
  carouselContentClass?: string;
}

export default function MyCarousel<T>({
  data,
  renderItem,
  autoplayDelay = 4000,
  itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
  navigationButtonsClass = 'absolute bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200',
  className = 'w-full',
  loop = true,
  carouselContentClass = '-ml-4',
}: GeneralCarouselProps<T>) {
  const plugin = useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: true })
  );

  // Generate the className for carousel items based on itemsPerView
  const getItemClassName = () => {
    const { tablet, desktop } = itemsPerView;

    // Calculate the appropriate basis classes
    const mobileClass = 'basis-full';
    let tabletClass = `sm:basis-1/${tablet}`;
    let desktopClass = `lg:basis-1/${desktop}`;

    // Handle special cases for common fractions
    if (tablet === 2) tabletClass = 'sm:basis-1/2';
    if (tablet === 3) tabletClass = 'sm:basis-1/3';
    if (tablet === 4) tabletClass = 'sm:basis-1/4';

    if (desktop === 2) desktopClass = 'lg:basis-1/2';
    if (desktop === 3) desktopClass = 'lg:basis-1/3';
    if (desktop === 4) desktopClass = 'lg:basis-1/4';

    return `pl-4 ${mobileClass} ${tabletClass} ${desktopClass}`;
  };

  return (
    <Carousel
      plugins={autoplayDelay > 0 ? [plugin.current] : []}
      className={className}
      opts={{
        align: 'start',
        loop,
      }}
      onMouseEnter={() => autoplayDelay > 0 && plugin.current.stop()}
      onMouseLeave={() => autoplayDelay > 0 && plugin.current.reset()}
    >
      <CarouselContent className={carouselContentClass}>
        {data.map((item, index) => (
          <CarouselItem key={index} className={getItemClassName()}>
            {renderItem(item, index)}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className={`${navigationButtonsClass} left-[-15px] sm:left-[-25px] top-1/2 -translate-y-1/2 z-10`}
      />
      <CarouselNext
        className={`${navigationButtonsClass} right-[-15px] sm:right-[-25px] top-1/2 -translate-y-1/2 z-10`}
      />
    </Carousel>
  );
}
