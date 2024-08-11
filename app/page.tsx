import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOptions } from "./_constants/search";
import BookingItem from "./_components/booking-item";
import Search from "./_components/search";
//import { useSession } from "next-auth/react";

const Home = async () => {
  //chamando sessão, capturar username
  //const { data } = useSession()
  // chamando banco temporariamente
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc"
    }
  })

  return (
    <div>
      {/* HEADER */}
      <Header />
      <div className="p-5">
        {/* WELCOME */}
        {/* <h2 className="text-xl font-bold">Olá{data?.user ? `, ${data.user.name}!` : "! Bem vindo!"}</h2> */}
        <h2 className="text-xl font-bold">Olá, Miguelito!</h2>
        <p>Segunda-feira, 05 de agosto</p>

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
        <BookingItem />

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

export default Home;