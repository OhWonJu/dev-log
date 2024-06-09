const MainPage = () => {
  return (
    <div className="h-full flex justify-center items-center gap-x-12">
      <div className="flex flex-col">
        <div className="w-[5rem] h-[5rem] rounded-full bg-symbol-500" />
        <div className="w-[5rem] h-[5rem] rounded-full bg-symbol-300" />
        <div className="w-[5rem] h-[5rem] rounded-full bg-symbol-100" />
        <div className="w-[5rem] h-[5rem] rounded-full bg-primary" />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-symbol-500 font-Pacifico text-[10rem]">Recipe</p>
        <p className="text-symbol-500 font-Kenwave text-[1.5rem] mt-6">
          Portfolio & Devlog
        </p>
        <p className="font-Libre_Barcode_39 mt-10 text-6xl text-primary">
          Recipe
        </p>
      </div>
    </div>
  );
};

export default MainPage;
