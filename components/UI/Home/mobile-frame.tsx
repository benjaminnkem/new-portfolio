import Image from "next/image";

interface MobileFrameProps {
  src: string;
  alt: string;
}

const MobileFrame = ({ src, alt }: MobileFrameProps) => (
  <div className="shrink-0 w-[168px] sm:w-[188px] md:w-[204px]">
    <div className="relative rounded-[2.25rem] border-[5px] border-[#1f1f1f] bg-[#141414] p-[3px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.65)]">
      <div
        className="pointer-events-none absolute left-1/2 top-[10px] z-10 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-black"
        aria-hidden
      />
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.85rem] bg-black">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="204px"
          loading="lazy"
        />
      </div>
    </div>
  </div>
);

export default MobileFrame;