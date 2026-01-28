import PlinkoHeader from "./components/PlinkoHeader.tsx";

interface Props {
    children: React.ReactNode;
}

function PlinkoLayout({children}: Props) {
    return (
        <div className={'flex h-screen w-screen flex-col relative'}>
            <PlinkoHeader></PlinkoHeader>
            <main className={'h-full w-full absolute left-0 top-0'}>
                {children}
            </main>
        </div>
    );
}

export default PlinkoLayout;