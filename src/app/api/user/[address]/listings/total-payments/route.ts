import { NextResponse } from "next/server";
import resolveUser from "@/helpers/resolveUser";
import prisma from "../../../../../../../prisma";

export const GET = async (
  request: Request,
  { params }: { params: { address: string } }
) => {
  try {
    //resolves user
    const user = await resolveUser(params.address);

    const payments = await prisma.listingPayment.findMany({
      where: {
        seller: user.address,
      },
    });

    //sum payment amount
    console.log(payments);

    //return total
    return NextResponse.json({ payments: 0 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "Bad Request" }, { status: 500 });
  }
};
