import { GiftTopIcon } from '@heroicons/react/24/outline';
import { roboto } from '@/app/ui/fonts';

export default function HCHLogo() {
    return (
      <div className={`${roboto.className} flex flex-row items-center leading-none text-white`}>
        <GiftTopIcon className="h-32 w-32 mr-2 flex-shrink-0" /> {/* Define o tamanho do ícone diretamente */}
        <p className="text-[26px]">Handcrafted Haven</p> {/* Define o tamanho do texto diretamente */}
      </div>
    );
  }
