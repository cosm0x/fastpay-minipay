import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

//get Listing for payment
export const GET = async (
  request: Request,
  { params }: { params: { uid: string } }
) => {
  try {
    const listing = await prisma.listing.findFirst({
      where: {
        uid: params.uid,
      },
    });

    return NextResponse.json(listing);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "Bad Request" }, { status: 500 });
  }
};

//update Listing Payment
export const POST = async (
  request: Request,
  { params }: { params: { uid: string } }
) => {
  const { txn_hash } = await request.json();

  try {
    const listing = await prisma.listing.update({
      where: {
        uid: params.uid,
      },
      data: {
        status: 1,
      },
    });

    await prisma.listingPayment.create({
      data: {
        listingId: listing.id,
        txn_hash,
      },
    });

    return NextResponse.json(listing);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "Bad Request" }, { status: 500 });
  }
};
