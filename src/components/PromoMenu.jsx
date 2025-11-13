import { Link } from "react-router-dom";
import beefImg from "../assets/beef.webp";
import chickenImg from "../assets/chicken.webp";
import classicImg from "../assets/classic.webp";

const items = [
  {
    title: "BEEF",
    subtitle: "MADCHEF DOUBLE CHEESE", // real-style item
    price: 499, // BDT
    img: beefImg,
  },
  {
    title: "CHICKEN",
    subtitle: "CHEEZ CRISPY CHICKEN",
    price: 349, // BDT
    img: chickenImg,
  },
  {
    title: "CLASSIC",
    subtitle: "TAKEOUT CLASSIC",
    price: 299, // BDT
    img: classicImg,
  },
];

function PromoRow({ item, reverse }) {
  return (
    <div
      className={`flex flex-col ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center gap-6 py-10 border-b last:border-none`}
    >
      {/* Image */}
      <div className="w-full lg:w-1/2">
        <div className="relative w-full h-72 md:h-80 bg-base-200 rounded-md overflow-hidden">
          <img
            src={item.img}
            alt={item.subtitle}
            className="absolute inset-0 w-full h-full object-contain"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.src =
                "https://dummyimage.com/800x600/efefef/aaaaaa.jpg&text=Image+not+available";
            }}
          />
        </div>
      </div>

      {/* Text block */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          {item.title}
        </h2>
        <p className="mt-1 text-lg tracking-wide font-medium text-base-content/70">
          {item.subtitle}
        </p>

        <div className="mt-5 flex items-center gap-5 text-sm text-base-content/60">
          <span>🔥 Spicy</span>
          <span>🍔 345g</span>
          <span>⭐ Popular</span>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <div className="text-3xl sm:text-4xl font-black text-primary">
            ৳{item.price}
          </div>
          <Link to="/reviews" className="btn btn-warning normal-case">
            Buy Now
          </Link>
        </div>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-base-content/70">
          Quisque nec libero ut sapien dictum commodo. Nam ac felis id libero
          rutrum pharetra eu non lacus.
        </p>
      </div>
    </div>
  );
}

export default function PromoMenu() {
  return (
    <section className="container mx-auto px-3">
      <PromoRow item={items[0]} />
      <PromoRow item={items[1]} reverse />
      <PromoRow item={items[2]} />
    </section>
  );
}
