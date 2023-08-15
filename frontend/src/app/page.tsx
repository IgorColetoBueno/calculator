import Main from "@/components/body";
import Calculator from "@/components/calculator";
import Navbar from "@/components/navbar";
import Typography from "@/components/typography";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <Main>
        <Calculator />
      </Main>
    </>
  );
}
