"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"

interface CreateBookingParams {
  //userId: string  --não receber como parâmetro
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  const user = await getServerSession(authOptions)
  if (!user) {
    throw new Error("Usuário não autenticado")
  }
  // capturar o userid da sessão do usuário logado pq não há possibilidade de agendamentos para outros usuários
  await db.booking.create({
    data: { ...params, userId: (user.user as any).id },
  })
  revalidatePath("/barbershops/[id]")
  revalidatePath("/bookings")
}
