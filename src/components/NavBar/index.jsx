import { ScrollBar } from "../ScrollBar"
import { ContactButton } from '@/components/button/ContactButton';
import { WaveButton } from '@/components/button/WaveButton';
import logo from '@/assets/imgs/logo.svg'
// import mainPic from '@/assets/imgs/page_1.svg'
export const NavBar = () => {
  return (
    <nav className="fixed z-50 top-[3.125vw] left-[3.125vw] right-[3.125vw] flex items-end justify-between pt-[1vw]">
      <img src={logo} className="select-none w-[210px] h-[38px] cursor-pointer"/>
      <ScrollBar />
      <div className="flex gap-[14px]">
        <ContactButton />
        <WaveButton />
      </div>
    </nav>
  )
}
