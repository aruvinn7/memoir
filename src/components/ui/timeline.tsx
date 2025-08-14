"use client";

import Image from "next/image";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

type TimelineEntry = {
  title: string | React.ReactNode;
  content: React.ReactNode;
  image?: string | string[];
};

interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [imageDimensions, setImageDimensions] = useState<Map<string, ImageDimensions>>(new Map());

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (ref.current) {
        setHeight(ref.current.offsetHeight);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Fungsi untuk mendeteksi dimensi gambar
  const getImageDimensions = (src: string): Promise<ImageDimensions> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => {
        const dimensions = {
          width: img.naturalWidth,
          height: img.naturalHeight,
          aspectRatio: img.naturalWidth / img.naturalHeight
        };
        setImageDimensions(prev => new Map(prev.set(src, dimensions)));
        resolve(dimensions);
      };
      img.src = src;
    });
  };

  // Fungsi untuk menentukan layout grid berdasarkan orientasi gambar
  const getGridLayout = (images: string[]) => {
    const dimensions = images.map(src => imageDimensions.get(src));
    
    // Jika belum ada dimensi, gunakan default
    if (dimensions.some(dim => !dim)) {
      images.forEach(src => {
        if (!imageDimensions.has(src)) {
          getImageDimensions(src);
        }
      });
      return "grid-cols-1"; // Default sementara
    }

    const portraits = dimensions.filter(dim => dim && dim.aspectRatio < 1).length;
    const landscapes = dimensions.filter(dim => dim && dim.aspectRatio >= 1).length;
    
    // Logic untuk menentukan grid:
    if (images.length === 1) {
      const dim = dimensions[0];
      if (dim) {
        // Single image - gunakan aspect ratio asli
        return dim.aspectRatio < 0.8 ? "grid-cols-1" : "grid-cols-2";
      }
    } else if (images.length === 2) {
      // Dua gambar - cek orientasi
      if (portraits === 2) {
        return "grid-cols-2"; // Dua portrait sejajar
      } else if (landscapes === 2) {
        return "grid-cols-1"; // Dua landscape bertumpuk
      } else {
        return "grid-cols-2"; // Mix - sejajar
      }
    } else if (images.length === 3) {
      if (portraits >= 2) {
        return "grid-cols-2"; // Portrait dominan
      } else {
        return "grid-cols-2"; // Grid 2x2 dengan satu kosong
      }
    } else {
      return "grid-cols-2"; // Default untuk banyak gambar
    }
    
    return "grid-cols-1";
  };

  // Fungsi untuk menentukan aspect ratio container
  const getImageAspectClass = (src: string, isInGrid: boolean, gridCols: string): string => {
    const dim = imageDimensions.get(src);
    if (!dim) return "aspect-[16/9]"; // Default
    
    if (!isInGrid) {
      // Single image container
      if (dim.aspectRatio < 0.8) {
        return "aspect-[3/4]"; // Portrait
      } else if (dim.aspectRatio > 1.5) {
        return "aspect-[16/9]"; // Wide landscape
      } else {
        return "aspect-square"; // Square-ish
      }
    } else {
      // Grid layout
      if (gridCols.includes("grid-cols-2")) {
        if (dim.aspectRatio < 0.8) {
          return "aspect-[3/4]"; // Portrait dalam grid
        } else {
          return "aspect-[4/3]"; // Landscape dalam grid
        }
      } else {
        // Single column grid
        if (dim.aspectRatio < 0.8) {
          return "aspect-[3/4]";
        } else if (dim.aspectRatio > 1.5) {
          return "aspect-[16/9]";
        } else {
          return "aspect-square";
        }
      }
    }
  };

  // Load semua dimensi gambar saat component mount
  useEffect(() => {
    data.forEach(item => {
      if (Array.isArray(item.image)) {
        item.image.forEach(src => getImageDimensions(src));
      } else if (item.image) {
        getImageDimensions(item.image);
      }
    });
  }, [data]);

  const renderImages = (item: TimelineEntry) => {
    if (!item.image) return null;

    if (Array.isArray(item.image)) {
      const images = item.image;
      
      // Selalu gunakan grid 2 kolom untuk konsistensi ukuran
      return (
        <div className="grid grid-cols-2 gap-4 max-w-4xl">
          {images.map((src, i) => (
            <div key={i} className="relative overflow-hidden rounded-lg">
              <Image
                src={src}
                alt={`${typeof item.title === 'string' ? item.title : 'Timeline image'} - ${i + 1}`}
                width={600}
                height={400}
                className={`w-full object-cover shadow-sm ${getImageAspectClass(src, true, "grid-cols-2")}`}
              />
            </div>
          ))}
          {/* Fill empty slots untuk menjaga layout grid */}
          {Array.from({ length: Math.max(0, 2 - (images.length % 2 || 2)) }, (_, i) => (
            <div
              key={`empty-${i}`}
              className="w-full aspect-[4/3] rounded-lg bg-transparent"
            />
          ))}
        </div>
      );
    } else {
      // Single image - gunakan grid 2 kolom dengan slot kosong
      const src = item.image;
      return (
        <div className="grid grid-cols-2 gap-4 max-w-4xl">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={src}
              alt={typeof item.title === 'string' ? item.title : 'Timeline image'}
              width={600}
              height={400}
              className={`w-full object-cover shadow-sm ${getImageAspectClass(src, true, "grid-cols-2")}`}
            />
          </div>
          <div className="w-full aspect-[4/3] rounded-lg bg-transparent" />
        </div>
      );
    }
  };

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-4xl mx-auto py-10 px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black dark:text-white">
          Memory Lane
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-md mx-auto">
          This is what i mean bury everything about us,
          may your next love give you a genuine and warm love yaa livvvvv
        </p>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">Hope It Brings U Warms :D</p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-20 md:gap-6">
            {/* Kiri: Titik & Judul */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
            </div>

            {/* Kanan: Konten dan Gambar */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              {/* Judul untuk mobile */}
              <h3 className="md:hidden block text-xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>

              {/* Konten (di atas gambar) */}
              <div className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
                {item.content}
              </div>

              {/* Gambar dengan layout fleksibel */}
              {renderImages(item)}
            </div>
          </div>
        ))}

        {/* Garis timeline */}
        <div
          style={{ height: `${height}px` }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent via-neutral-200 dark:via-neutral-700 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};