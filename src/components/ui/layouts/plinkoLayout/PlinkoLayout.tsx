import PlinkoHeader from "./components/PlinkoHeader.tsx";
import PlinkoFooter from "./components/PlinkoFooter.tsx";
import PlinkoControls from "./components/PlinkoControls.tsx";
import PlinkoHistory from "../../plinkoHistory/PlinkoHistory.tsx";
import PlinkoBallsBoard from "../../plinkoBallsBoard/PlinkoBallsBoard.tsx";
import { useEffect, useState } from "react";
import { gameEvents } from "../../../../utils/gameEvents.ts";
import PlinkoRiskLevelsList from "../../plinkoRiskLevel/PlinkoRiskLevelsList.tsx";
import { GameEventsEnum } from "../../../../utils/enums/gameEvents.enum.ts";

interface Props {
  children: React.ReactNode;
}

function PlinkoLayout({ children }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleGameLoaded = () => {
      setShow(true);
    };

    gameEvents.on(GameEventsEnum.GAME_LOADED, handleGameLoaded);

    return () => {
      gameEvents.off(GameEventsEnum.GAME_LOADED, handleGameLoaded);
    };
  }, []);

  const handleStartGame = () => {
    if (!show) {
      gameEvents.emit(GameEventsEnum.START_GAME);
    }
  };

  return (
    <div
      className={"flex min-h-screen w-screen flex-col relative items-center"}
      onClick={handleStartGame}
    >
      <PlinkoHeader
        className={`${show ? "opacity-100 z-10" : "opacity-0 pointer-events-none"}`}
      />
      <main className={"h-full w-full absolute left-0 top-0"}>{children}</main>
    {show && <div className={"h-[350px]"}></div>}
      <div
        className={`w-full my-container absolute flex justify-between top-[72px] md:top-[170px] px-[60px] duration-300 ease-out ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <PlinkoHistory className={"lg:flex hidden"} />
        <div className="flex gap-12 lg:w-fit w-full lg:justify-normal justify-between">
          <PlinkoBallsBoard />
          <PlinkoRiskLevelsList />
        </div>
      </div>
      <PlinkoControls
        className={`${show ? "opacity-100 z-10" : "opacity-0 pointer-events-none"}`}
      />
      <PlinkoFooter />
    </div>
  );
}

export default PlinkoLayout;

