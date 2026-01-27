type PromoCardProps = {
  title: string;
  subtitle: string;
  discount: string;
  image: string;
};

const PromoCard = ({ title, subtitle, discount, image }: PromoCardProps) => {
  return (
    <div className="group relative rounded h-52 overflow-hidden cursor-pointer">

      {/* Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSipCrv2-VPpDBQY_DYhQRBCF0DRQwPP5UjpA&s)` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/80 transition group-hover:bg-white/70" />

      {/* Content */}
      <div className="relative z-10 h-full p-6 flex flex-col justify-center">
        <p className="text-sm text-primary font-semibold">{title}</p>

        <h3 className="text-xl font-bold mb-1">{discount}</h3>

        <p className="text-sm text-gray-600 mb-4">{subtitle}</p>

        <button className="w-fit px-4 py-2 bg-primary text-white text-sm transition-all duration-300 group-hover:translate-x-1">
          SHOP NOW →
        </button>
      </div>
    </div>
  );
};

export default PromoCard;
