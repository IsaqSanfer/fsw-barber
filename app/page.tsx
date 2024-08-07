import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Avatar, AvatarImage } from "./_components/ui/avatar";
import { Badge } from "./_components/ui/badge";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";

const Home = async () => {
  // chamando banco temporariamente
  const barbershops = await db.barbershop.findMany({})
  console.log({ barbershops })

  return (
    <div>
      {/* HEADER */}
      <Header />
      <div className="p-5">
        {/* WELCOME */}
        <h2 className="text-xl font-bold">Olá, Miguelito!</h2>
        <p>Segunda-feira, 05 de agosto</p>

        {/* BUSCA */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
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
        <Card className="mt-3">
          <CardContent className="flex justify-between p-0">
            {/* LEFT ITEM */}
            <div className="flex flex-col gap-2 p-5 pr-0">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">Barbearia FSW</p>
              </div>
            </div>

            {/* RIGHT ITEM */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">20:00</p>
            </div>
          </CardContent>
        </Card>

        {/* BARBEARIAS */}
        <h2 className="mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home;