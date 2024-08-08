import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image width={120} height={18} alt="FSW Barber" src={"/logo.png"} />

        <Sheet>
          <SheetTrigger asChild>
            <Button size={"icon"} variant={"outline"} aria-label="Open Menu">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>

              <div className="flex items-center gap-3 py-5 border-b border-solid">
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>US</AvatarFallback>
                </Avatar>

                <div>
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
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
