import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

export type SlideDirection = "forward" | "back";

interface Props {
  stepKey: string | number;
  direction?: SlideDirection;
  children: ReactNode;
}

interface Outgoing {
  key: string;
  node: ReactNode;
  direction: SlideDirection;
}

const SPEED = 380;

const StepSwiper = ({ stepKey, direction = "forward", children }: Props) => {
  const key = String(stepKey);
  const swiperRef = useRef<SwiperType | null>(null);
  const lastRef = useRef<{ key: string; node: ReactNode }>({
    key,
    node: children,
  });
  const [shownKey, setShownKey] = useState(key);
  const [outgoing, setOutgoing] = useState<Outgoing | null>(null);

  if (shownKey !== key) {
    setShownKey(key);
    setOutgoing({
      key: lastRef.current.key,
      node: lastRef.current.node,
      direction,
    });
  }

  lastRef.current = { key, node: children };

  useLayoutEffect(() => {
    const swiper = swiperRef.current;

    if (!swiper) {
      return;
    }

    if (!outgoing) {
      swiper.update();
      swiper.slideTo(0, 0, false);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOutgoing(null);
      return;
    }

    const forward = outgoing.direction === "forward";

    swiper.update();
    swiper.slideTo(forward ? 0 : 1, 0, false);

    const frame = requestAnimationFrame(() => {
      swiper.slideTo(forward ? 1 : 0, SPEED);
    });

    const fallback = window.setTimeout(() => setOutgoing(null), SPEED + 200);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
    };
  }, [outgoing]);

  const current = (
    <SwiperSlide key={key} style={{ height: "auto" }}>
      {children}
    </SwiperSlide>
  );

  const leaving = outgoing ? (
    <SwiperSlide
      key={outgoing.key}
      style={{ height: "auto", pointerEvents: "none" }}
      aria-hidden="true"
    >
      {outgoing.node}
    </SwiperSlide>
  ) : null;

  const slides = !leaving
    ? [current]
    : outgoing?.direction === "forward"
      ? [leaving, current]
      : [current, leaving];

  return (
    <Swiper
      className="w-full"
      allowTouchMove={false}
      speed={SPEED}
      onSwiper={(instance) => {
        swiperRef.current = instance;
      }}
      onSlideChangeTransitionEnd={() => setOutgoing(null)}
    >
      {slides}
    </Swiper>
  );
};

export default StepSwiper;