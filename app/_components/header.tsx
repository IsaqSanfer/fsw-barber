import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import SidebarSheet from "./sidebar-sheet"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { MenuIcon } from "lucide-react"
import { Button } from "./ui/button"

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

          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
