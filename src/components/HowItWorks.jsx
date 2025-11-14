import burgerDrink from "../assets/burgers-11.webp";
import friesHotdog from "../assets/55555.webp";
import pizzaBox    from "../assets/121.webp";

function IconCircleImg({ src, alt }) {
  return (
    <div className="mx-auto mb-6 w-36 h-36 md:w-44 md:h-44 rounded-full bg-orange-300/70 flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        className="w-24 h-24 md:w-28 md:h-28 object-contain"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="border-t bg-base-100">
      <div className="container mx-auto px-3 py-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
          HOW IT WORKS
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          {/* 1 */}
          <div className="text-center px-4">
            <IconCircleImg src={burgerDrink} alt="Select your food" />
            <h3 className="text-xl font-bold">Select your food</h3>
            <p className="mt-2 text-sm opacity-70">
              Pick favorites from top-rated local reviews.
            </p>
          </div>

          {/* 2 */}
          <div className="text-center px-4">
            <IconCircleImg src={friesHotdog} alt="Pay with card or cash" />
            <h3 className="text-xl font-bold">Pay with card or cash</h3>
            <p className="mt-2 text-sm opacity-70">
              Simple checkout — no fuss, no queue.
            </p>
          </div>

          {/* 3 */}
          <div className="text-center px-4">
            <IconCircleImg src={pizzaBox} alt="Pickup or delivery" />
            <h3 className="text-xl font-bold">Pickup or delivery</h3>
            <p className="mt-2 text-sm opacity-70">
              Get it fast — collect or send to your door.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
