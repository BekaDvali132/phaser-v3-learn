import PlinkoHeader from "./components/PlinkoHeader.tsx";
import PlinkoFooter from "./components/PlinkoFooter.tsx";
import PlinkoControls from "./components/PlinkoControls.tsx";

interface Props {
    children: React.ReactNode;
}

function PlinkoLayout({children}: Props) {
    return (
        <div className={'flex h-screen w-screen flex-col relative items-center'}>
            <PlinkoHeader></PlinkoHeader>
            <main className={'h-full w-full absolute left-0 top-0'}>
                {children}
            </main>
            <PlinkoControls />
            <PlinkoFooter/>
        </div>
    );
}

export default PlinkoLayout;