import { NextResponse } from "next/server";
import resolveUser from "@/helpers/resolveUser";
import prisma from "../../../../../../../../prisma";

export const GET = async (
  request: Request,
  { params }: { params: { address: string; id: string } }
) => {
  try {
    //get listing
    const listing = await prisma.listing.findUnique({
      where: {
        uid: params.id,
      },
    });

    if (!listing) {
      throw Error("invalid listing");
    }

    const payments = await prisma.listingPayment.findMany({
      where: {
        listingId: listing?.id,
      },
    });

    const totalAmount = payments.reduce((acc, item) => acc + item.amount, 0);

    return NextResponse.json({ payments, totalAmount });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "Bad Request" }, { status: 500 });
  }
};
