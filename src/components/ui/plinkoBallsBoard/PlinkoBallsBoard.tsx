
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
            className={'mt-[17px] bg-[#0f002ab2] p-3 border border-solid border-[#ffffff1a] rounded-3xl w-[118px] grid grid-cols-2 gap-1'}>
            {plinkoBallsList.map(
                item => <div className={'flex flex-col gap-[2px] items-center'} key={item.multiplier}>
                    <img
                        src={item.img}
                        alt={item.alt}
                        width={32}
                        height={32}
                    />
                    <p className={'font-bold text-white text-[16px] leading-[19px]'}>{item.multiplier}x</p>
                </div>
            )}
        </div>
    );
}

export default PlinkoBallsBoard;