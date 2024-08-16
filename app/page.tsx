import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const Home = async () => {
  //chamando sessão, capturar username
  //const { data } = useSession()
  // chamando banco temporariamente
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const confirmedBookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session?.user as any).id,
          date: {
            gte: new Date()
          }
        },
        include: {
          service: {
            include: { barbershop: true },
          },
        },
        orderBy: {
          date: 'asc'
        },
      })
    : []

  return (
    <div>
      {/* HEADER */}
      <Header />
      <div className="p-5">
        {/* WELCOME */}
        <h2 className="text-xl font-bold">Olá{session?.user ? `, ${session.user.name}!` : "! Bem vindo!"}</h2>        
        <p><span className="capitalize">{format(new Date(), "EEEE, ", { locale: ptBR })}</span>
          {format(new Date(), "dd 'de' MMMM", { locale: ptBR })}
        </p>

        {/* BUSCA */}
        <div className="mt-6">
          <Search />
        </div>

        {/* BUSCA RÁPIDA */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button variant={"secondary"} className="gap-2" key={option.title}>
              <Image
                width={16}
                height={16}
                src={option.imageUrl}
                alt={option.title}
              />
              {option.title}
            </Button>
          ))}
        </div>

        {/* BANNER */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            className="rounded-xl object-cover"
            fill
            alt="Agende nos melhores"
            src={"/banner-01.png"}
          />
        </div>

        {/* AGENDAMENTO */}
        <h2 className="mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        {/* BARBEARIAS */}
        <h2 className="mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/* BARBEARIAS (ORDENADAS) */}
        <h2 className="mt-6 text-xs font-bold uppercase text-gray-400">
          Mais Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
