import { NextResponse } from "next/server";
import resolveUser from "@/helpers/resolveUser";
import prisma from "../../../../prisma";
import getUniqueId from "@/helpers/uidGenerator";

export const POST = async (request: Request) => {
  const { seller, title, description, rate, quantity } = await request.json();

  //console.log(seller, title, description, rate, quantity);

  try {
    //resolve user
    const user = await resolveUser(seller);
    const uid = await getUniqueId();

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        rate: parseFloat(rate),
        uid,
        sellerId: user.id,
      },
    });

    console.log(listing);
    return NextResponse.json(listing);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "Bad Request" }, { status: 500 });
  }
};
