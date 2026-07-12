import Sheet01TitleBlock from "@/components/sheets/sheet-01-title-block";
import Sheet02Drawings from "@/components/sheets/sheet-02-drawings";
import Sheet03Bom from "@/components/sheets/sheet-03-bom";
import Sheet04Revisions from "@/components/sheets/sheet-04-revisions";

export default function Home() {
  return (
    <>
      <Sheet01TitleBlock />
      <Sheet02Drawings />
      <Sheet03Bom />
      <Sheet04Revisions />
    </>
  );
}
