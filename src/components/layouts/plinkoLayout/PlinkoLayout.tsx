interface Props {
    children: React.ReactNode;
}

function PlinkoLayout({children}: Props) {
    return (
        <div className={'flex h-screen w-screen flex-col relative'}>
            <main className={'h-full w-full absolute z-10 left-0 top-0'}>
                {children}
            </main>
        </div>
    );
}

export default PlinkoLayout;