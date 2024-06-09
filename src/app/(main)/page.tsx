const MainPage = () => {
  return (
    <div className="h-full flex justify-center gap-x-28">
      <div className="flex flex-col mt-[10rem] relative w-[5rem]">
        <div className="absolute w-[6rem] h-[6rem] rounded-full bg-symbol-500 top-0" />
        <div className="absolute w-[6rem] h-[6rem] rounded-full bg-symbol-300 top-[3rem]" />
        <div className="absolute w-[6rem] h-[6rem] rounded-full bg-symbol-100 top-[6rem]"  />
        <div className="absolute w-[6rem] h-[6rem] rounded-full bg-primary top-[9rem]" />
      </div>
      <div className="flex flex-col items-center relative">
        <p className="text-symbol-500 font-Pacifico text-[10rem] pt-[10rem]">Recipe</p>
        <p className="text-symbol-500 font-Kenwave text-[1.5rem] mt-6">
          Portfolio & Devlog
        </p>
        <p className="absolute font-Libre_Barcode_39 text-6xl text-primary bottom-10 right-0">
          Recipe
        </p>
      </div>
    </div>
  );
};

export default MainPage;
