import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProjectCardProps {
  img: string;
  title: string;
  desc: string;
  onClick: () => void;
  isExpanded?: boolean;
  images?: string[];
  longDescription?: string;
}
const truncateText = (text: string, limit: number = 200) => {
  if (text.length <= limit) return text;
  return text.slice(0, limit).trim() + '...';
};

export function ProjectCard({ 
  img, 
  title, 
  desc, 
  onClick, 
  isExpanded, 
  images = [], 
  longDescription 
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const allImages = [img, ...images];

  useEffect(() => {
    if (isExpanded && cardRef.current) {
      const card = cardRef.current;
      const cardRect = card.getBoundingClientRect();
      const scrollOffset = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const buffer = 100; // pixels from top/bottom of viewport
      
      // Calculate optimal scroll position
      let targetScroll = scrollOffset;
      
      // If card is too high
      if (cardRect.top < buffer) {
        targetScroll = scrollOffset + cardRect.top - buffer;
      }
      // If card is too low
      else if (cardRect.bottom > windowHeight - buffer) {
        // Try to center it if it's smaller than viewport
        if (cardRect.height < windowHeight - buffer * 2) {
          targetScroll = scrollOffset + cardRect.top - ((windowHeight - cardRect.height) / 2);
        } else {
          // If card is taller than viewport, align to top with buffer
          targetScroll = scrollOffset + cardRect.top - buffer;
        }
      }
      
      // Only scroll if necessary
      if (targetScroll !== scrollOffset) {
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  }, [isExpanded]);

  const ImageSlider = ({ fullscreen = false }) => (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      speed={1000}
      navigation={fullscreen}
      autoplay={fullscreen ? { delay: 1500 } : false}
      pagination={fullscreen ? { clickable: true } : false}
      className={`w-full bg-black ${fullscreen ? 'h-[50vh] max-h-[500px]' : 'h-48'}`}
      allowTouchMove={fullscreen}
      style={{ backgroundColor: 'black' }}
    >
      {fullscreen ? (
        allImages.map((image, idx) => (
          <SwiperSlide 
            key={idx} 
            className="bg-black h-full"
            style={{ backgroundColor: 'black' }}
          >
            <div className="w-full h-full flex items-center justify-center bg-black">
              <Image
                src={image}
                alt={`${title} image ${idx + 1}`}
                width={1920}
                height={1080}
                className="w-auto h-full max-w-full object-contain"
                style={{ 
                  maxHeight: '50vh',
                  backgroundColor: 'black'
                }}
              />
            </div>
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide 
          className="bg-black h-full"
          style={{ backgroundColor: 'black' }}
        >
          <div className="w-full h-full flex items-center justify-center bg-black">
            <Image
              src={img}
              alt={title}
              width={1920}
              height={1080}
              className="w-auto h-full max-w-full object-contain"
              style={{ backgroundColor: 'black' }}
            />
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );

  return (
    <motion.div
      ref={cardRef}
      layout
      className={`border border-gray-700 rounded-lg overflow-hidden shadow-lg transition-shadow
        ${isExpanded ? 'p-6' : 'lg:min-h-[30rem] lg:max-h-[30rem] flex flex-col'}`}
    >
      <motion.div 
        layout 
        className={isExpanded ? "" : "mx-0 mt-0 mb-6 h-48"}
      >
        {isExpanded ? (
          <motion.div 
            layout
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ImageSlider fullscreen={true} />
          </motion.div>
        ) : (
          <ImageSlider />
        )}
      </motion.div>

      <motion.div 
        layout 
        className={isExpanded ? "" : "p-4 flex flex-col flex-grow"}
      >
        <motion.h5 
          layout
          className={`font-semibold !text-primary-brown ${
            isExpanded ? 'mb-4 text-2xl' : 'mb-2 text-lg'
          }`}
        >
          {title}
        </motion.h5>
        
        <motion.p 
          layout
          className={`font-normal !text-gray-500  ${
            isExpanded ? 'mb-6 max-h-[9rem] overflow-y-auto custom-scrollbar' : 'mb-6 flex-grow'
          }`}
        >
          {isExpanded ? longDescription : truncateText(desc, 160)}
        </motion.p>

        <motion.div 
          layout 
          className={isExpanded ? "flex justify-end" : "mt-auto"}
        >
          <motion.button
            layout
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="bg-primary-brown text-white text-sm px-4 py-2 rounded h-auto hover:bg-primary-brown/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? "Close" : "see details"}
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
