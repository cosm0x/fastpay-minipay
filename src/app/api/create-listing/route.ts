import { NextResponse } from "next/server";
import resolveUser from "@/helpers/resolveUser";
import prisma from "../../../../prisma";
import getUniqueId from "@/helpers/uidGenerator";

export const POST = async (request: Request) => {
  const { seller, title, description, amount, quantity } = await request.json();

  console.log(seller);

  try {
    //resolve user
    const user = await resolveUser(seller);
    const uid = await getUniqueId();

    const link = await prisma.listing.create({
      data: {
        title,
        description,
        quantity,
        amount: parseFloat(amount),
        uid,
        sellerId: user.id,
      },
    });
    console.log(link);
    return NextResponse.json(link);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "Bad Request" }, { status: 500 });
  }
};
