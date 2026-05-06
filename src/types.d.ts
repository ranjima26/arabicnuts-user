import type { StaticImageData } from "next/image";

declare module "@/assets/*" {
  const value: StaticImageData;
  export default value;
}
