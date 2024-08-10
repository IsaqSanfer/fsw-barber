"use server"

import { db } from "../_lib/prisma";

interface GetBookingsProps {
    serviceId: string;
    date: DateConstructor    
}

export const getBookings = ({ date}: GetBookingsProps) => {
    return db.booking.findMany({
        // where
    })
}
