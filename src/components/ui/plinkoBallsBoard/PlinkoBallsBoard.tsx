
function PlinkoBallsBoard() {
    const plinkoBallsList = [
        {
            img: '/plinkoGameAssets/plinkoCherry.png',
            multiplier: 2,
            alt: 'Plinko Cherry',
        },
        {
            img: '/plinkoGameAssets/plinkoBanana.png',
            multiplier: 4,
            alt: 'Plinko Banana',
        },
        {
            img: '/plinkoGameAssets/plinkoLemon.png',
            multiplier: 2,
            alt: 'Plinko Lemon',
        },
        {
            img: '/plinkoGameAssets/plinkoMelon.png',
            multiplier: 10,
            alt: 'Plinko Melon',
        },
        {
            img: '/plinkoGameAssets/plinkoOrange.png',
            multiplier: 2,
            alt: 'Plinko Orange',
        },
        {
            img: '/plinkoGameAssets/plinkoGrape.png',
            multiplier: 10,
            alt: 'Plinko Grape',
        },
        {
            img: '/plinkoGameAssets/plinkoPlum.png',
            multiplier: 4,
            alt: 'Plinko Plum',
        },
        {
            img: '/plinkoGameAssets/plinkoStar.png',
            multiplier: 10,
            alt: 'Plinko Star',
        },
    ]
    return (
        <div
            className={`md:mt-[17px] bg-[#0f002ab2] p-[5.53px] md:p-3 border border-solid border-[#ffffff1a] rounded-[13.05px] md:rounded-3xl w-[63.08px] md:w-[118px] h-full max-h-[137.53px] md:max-h-[248px] grid grid-cols-2 gap-[2px] backdrop-blur-[8px] md:gap-1 `}>
            {plinkoBallsList.map(
                item => <div className={'flex flex-col gap-[2px] items-center h-[29.49px] md:h-[53px]'} key={item.img}>
                    <img
                        className={'md:w-[32px] w-[17.4px]'}
                        src={item.img}
                        alt={item.alt}
                        width={32}
                        height={32}
                    />
                    <p className={'font-bold text-white text-[8.7px] md:text-[16px] leading-[11px] md:leading-[19px]'}>{item.multiplier}x</p>
                </div>
            )}
        </div>
    );
}

export default PlinkoBallsBoard;