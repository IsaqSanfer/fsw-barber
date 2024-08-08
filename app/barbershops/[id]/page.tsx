import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon,  MapPinIcon,  MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BarbershopPageProps {
    params: {
        id: string
    }
}

const BarbershopPage = async ({ params } : BarbershopPageProps) => {
    //dando get no banco
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id
        }
    })

    return <div>
        {/* IMAGEM */}
        <div className="relative w-full h-[250px]">
            <Image layout="fill" className="object-cover" src={barbershop?.imageUrl} alt={barbershop?.name} />

            <Button size={"icon"} variant={"secondary"} className="absolute left-4 top-4" asChild>
                <Link href={"/"}>
                    <ChevronLeftIcon />
                </Link>                
            </Button>
            
            <Button size={"icon"} variant={"secondary"} className="absolute right-4 top-4">
                <MenuIcon />
            </Button>
        </div>

        {/* TÍTULO */}
        <div className="p-5 border-b border-solid">
            <h1 className="mb-3 text-xl font-bold">{barbershop?.name}</h1>
            {/* ENDEREÇO */}
            <div className="mb-2 flex items-center gap-1">
                <MapPinIcon size={18} className="text-primary" />
                <p className="text-sm">{barbershop?.address}</p>
            </div>
            {/* RANKING */}
            <div className="flex items-center gap-1">
                <StarIcon size={18} className="text-primary fill-primary" />
                <p className="text-sm">5,0 (889 avaliações)</p>
            </div>
        </div>

        {/* DESCRIÇÃO */}
        <div className="p-5 border-b border-solid space-y-3">
            <h2 className="text-xs text-gray-400 font-bold uppercase">Sobre Nós</h2>
            <p className="text-sm text-justify">{barbershop?.description}</p>
        </div>
    </div> 
}

export default BarbershopPage