import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
    return (
        <Card>
            <CardContent className="p-5 flex flex-row items-center justify-between">
                <Image width={120} height={18} alt="FSW Barber" src={"/logo.png"} />
                <Button size={"icon"} variant={"outline"}>
                    <MenuIcon />
                </Button>
            </CardContent>
        </Card>
    );
}

export default Header;