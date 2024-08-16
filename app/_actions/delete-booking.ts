"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

export const deleteBooking = async (bookingId: string) => {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  })

  //força que, no post, atualize as informações
  revalidatePath("/bookings")
}