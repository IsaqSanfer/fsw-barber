import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarFallback, AvatarImage } from "./ui/avatar"
import { quickSearchOptions } from "../_constants/search"
import Image from "next/image"

const SidebarSheet = () => {
    return (
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>

              <div className="flex items-center gap-3 py-5 border-b border-solid">
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>US</AvatarFallback>
                </Avatar>

                <div className="text-start">
                    <p className="font-bold">Isaq Sanfer</p>
                    <p className="text-xs">Isael Ferreira</p>
                </div>
              </div>
            </SheetHeader>

            <div className="flex flex-col gap-4 border-b border-solid p-5 py-5">
                <SheetClose asChild>
                    <Button className="justify-start gap-2" variant={"ghost"}>
                        <HomeIcon size={18} /> Início
                    </Button>
                </SheetClose>
                <Button className="justify-start gap-2" variant={"ghost"}>
                    <CalendarIcon size={18} /> Agendamentos
                </Button>
            </div>

            <div className="flex flex-col gap-4 border-b border-solid p-5 py-5">
              {quickSearchOptions.map((option) => (
                <Button key={option.title} className="justify-start gap-2" variant={"ghost"}>
                  <Image width={18} height={18} src={option.imageUrl} alt={option.title} />
                  {option.title}
                </Button>
              ))}
            </div>

            <div className="flex flex-col gap-4 border-b border-solid p-5 py-5">
              <Button className="justify-start gap-2" variant={"ghost"}>
                <LogOutIcon size={18} /> Sair da Conta
              </Button>
            </div>
          </SheetContent>
    )
}

export default SidebarSheet