import Image from 'next/image';

export default function LogoSantaAna() {
    return (
        <div className={` flex flex-col justify-center items-center leading-none text-white`}>
            {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
            <Image src={'/logoSantaAna.png'} width={100} height={100}  alt='logo-ingenio' />
            <p className="text-[40px] text-center">Santa Ana</p>
        </div>
    );
}