"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

export const deleteBooking = async (bookingId: string) => {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  })

  //força o recarregamento da página (e não do navegador) para atualizar as informações
  revalidatePath("/bookings")
}