import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';
import { useFloating, offset, shift, arrow, FloatingArrow } from '@floating-ui/react';
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
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipTimeout, setTooltipTimeout] = useState<NodeJS.Timeout | null>(null);
  const arrowRef = useRef(null);
  
  const {refs, floatingStyles, context} = useFloating({
    open: showTooltip,
    onOpenChange: setShowTooltip,
    middleware: [
      offset(10),
      shift(),
      arrow({ element: arrowRef })
    ],
  });

  useEffect(() => {
    if (isExpanded && cardRef.current && isDesktop) {
      const card = cardRef.current;
      const cardRect = card.getBoundingClientRect();
      const scrollOffset = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const buffer = 100;
      
      let targetScroll = scrollOffset;
      
      if (cardRect.top < buffer) {
        targetScroll = scrollOffset + cardRect.top - buffer;
      }
      else if (cardRect.bottom > windowHeight - buffer) {
        if (cardRect.height < windowHeight - buffer * 2) {
          targetScroll = scrollOffset + cardRect.top - ((windowHeight - cardRect.height) / 2);
        } else {
          targetScroll = scrollOffset + cardRect.top - buffer;
        }
      }
      
      if (targetScroll !== scrollOffset) {
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  }, [isExpanded, isDesktop]);

  const handleMouseEnter = () => {
    if (!isExpanded) {
      const timeout = setTimeout(() => {
        setShowTooltip(true);
      }, 300); // 300ms delay
      setTooltipTimeout(timeout);
    }
  };

  const handleMouseLeave = () => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
    }
    setShowTooltip(false);
  };

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
                className="w-auto h-full max-w-full object-contain rounded-lg"
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
              className="w-auto h-full max-w-full object-contain "
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
        ${isExpanded 
          ? isDesktop 
            ? 'p-6 relative z-10 border-primary-brown' 
            : 'p-4 relative z-10 h-auto border-primary-brown'
          : 'flex flex-col '
        }
        `}
      style={{
        position: 'relative',
        backgroundColor: isExpanded ? 'rgb(17, 17, 17)' : undefined,
        gridColumn: isDesktop && isExpanded ? '1 / -1' : undefined,
        transform: 'none',
        zIndex: isExpanded ? 10 : 1,
        transition: 'all 1s ease-in-out',
      }}
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
            transition={{ delay: 0.5 }}
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
          ref={refs.setReference}
          layout
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`font-normal !text-gray-500 ${
            isExpanded 
              ? `mb-6 ${isDesktop ? 'max-h-[9rem]' : 'max-h-[50vh]'} overflow-y-auto custom-scrollbar` 
              : 'mb-6 flex-grow cursor-help'
          }`}
        >
          {isExpanded ? longDescription : truncateText(desc, 145)}
        </motion.p>

        <AnimatePresence>
          {showTooltip && !isExpanded && (
            <motion.div
              ref={refs.setFloating}
              style={floatingStyles}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              className="z-50 max-w-md p-4 border border-gray-700 rounded-lg bg-primary-black shadow-lg"
            >
              <FloatingArrow
                ref={arrowRef}
                context={context}
                className="fill-primary-black"
                stroke="rgb(55, 65, 81)"
                strokeWidth={1}
              />
              {desc}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          layout 
          className={`${isExpanded ? "flex justify-end" : "mt-auto"}`}
        >
          <motion.button
            layout
            onClick={(e) => {
              e.stopPropagation();
              onClick();
              
              if (!isDesktop && !isExpanded) {
                setTimeout(() => {
                  cardRef.current?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'nearest'
                  });
                }, 100);
              }
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
