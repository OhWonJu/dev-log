import { Pacifico, Libre_Barcode_39, Knewave } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--pacifico",
});

const libre_barcode_39 = Libre_Barcode_39({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--libre_barcode_39",
});

const kenwave = Knewave({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--kenwave",
});

export { pacifico, libre_barcode_39, kenwave };
