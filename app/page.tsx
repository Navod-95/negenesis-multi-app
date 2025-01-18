import AstrologyApp from "./components/astrologyApp/astrology-app";
import CoffeeReader from "./components/coffeeCupReadingAnalysisApp/CoffeeReader";
import DreamAnalyzer from "./components/dreamAnalysisApp/DreamAnalyzer";
import NumerologyApp from "./components/numerologyApp/NumerologyAnalysisApp";
import PalmReader from "./components/palmReadingApp/PalmReadingAnalysisApp";

export default function Home() {
  return (
    <>
      <h1>Test</h1>
      <PalmReader></PalmReader>
      <AstrologyApp></AstrologyApp>
      <CoffeeReader></CoffeeReader>
      <DreamAnalyzer></DreamAnalyzer>
      <NumerologyApp></NumerologyApp>
    </>
  );
}
