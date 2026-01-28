type PromoCardProps = {
  title: string;
  subtitle: string;
  discount: string;
  image: string;
};

const PromoCard = ({ title, subtitle, discount, image }: PromoCardProps) => {
  return (
    <div className="group relative rounded-lg h-56 overflow-hidden cursor-pointer bg-white shadow-md hover:shadow-lg transition-shadow">

      {/* Background with Image and Overlay */}
      <div className="absolute inset-0">
        {/* Image - using object-cover for better scaling */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 to-white/70 group-hover:from-white/90 group-hover:to-white/60 transition" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full p-4 sm:p-6 flex flex-col justify-center">
        <p className="text-xs sm:text-sm text-blue-600 font-bold uppercase tracking-wide">{title}</p>

        <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{discount}</h3>

        <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">{subtitle}</p>

        <button className="w-fit px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-600 text-white text-xs sm:text-sm font-bold rounded transition-all duration-300 hover:bg-blue-700 hover:translate-x-1">
          SHOP NOW →
        </button>
      </div>
    </div>
  );
};

export default PromoCard;
