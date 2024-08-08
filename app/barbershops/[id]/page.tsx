import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon,  MapPinIcon,  MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

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
        },
        include: {
            services: true
        }
    })

    if (!barbershop) {
        return notFound()
    }

    return (
      <div>
        {/* IMAGEM */}
        <div className="relative h-[250px] w-full">
          <Image
            layout="fill"
            className="object-cover"
            src={barbershop?.imageUrl}
            alt={barbershop?.name}
          />

          <Button
            size={"icon"}
            variant={"secondary"}
            className="absolute left-4 top-4"
            asChild
          >
            <Link href={"/"}>
              <ChevronLeftIcon />
            </Link>
          </Button>

          <Button
            size={"icon"}
            variant={"secondary"}
            className="absolute right-4 top-4"
          >
            <MenuIcon />
          </Button>
        </div>

        {/* TÍTULO */}
        <div className="border-b border-solid p-5">
          <h1 className="mb-3 text-xl font-bold">{barbershop?.name}</h1>

          {/* ENDEREÇO */}
          <div className="mb-2 flex items-center gap-2">
            <MapPinIcon size={18} className="text-primary" />
            <p className="text-sm">{barbershop?.address}</p>
          </div>

          {/* RANKING */}
          <div className="flex items-center gap-2">
            <StarIcon size={18} className="fill-primary text-primary" />
            <p className="text-sm">5,0 (889 avaliações)</p>
          </div>
        </div>

        {/* DESCRIÇÃO */}
        <div className="space-y-3 border-b border-solid p-5">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Sobre Nós
          </h2>
          <p className="text-justify text-sm">{barbershop?.description}</p>
        </div>

        {/* SERVIÇOS */}
        <div className="space-y-3 border-b border-solid p-5">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Serviços
          </h2>
          {barbershop.services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>

        {/* DESCRIÇÃO */}
        <div className="space-y-3 border-b border-solid p-5">
            <h2 className="text-xs font-bold uppercase text-gray-400">
                Contatos
            </h2>
            {barbershop.phones.map((phone) => (
                <PhoneItem key={phone} phone={phone} />
            ))}
        </div>
      </div>
    ) 
}

export default BarbershopPage