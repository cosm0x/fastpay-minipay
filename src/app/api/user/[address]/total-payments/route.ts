import { NextResponse } from "next/server";
import resolveUser from "@/helpers/resolveUser";
import prisma from "../../../../../../prisma";

//@ts-ignore
function sumPayments(listings) {
  //@ts-ignore
  return listings.map((listing) => {
    // Compute the total amount for payments
    const totalAmount = listing.payments.reduce(
      //@ts-ignore
      (acc, payment) => acc + payment.amount,
      0
    );

    return totalAmount;
  });
}

export const GET = async (
  request: Request,
  { params }: { params: { address: string } }
) => {
  try {
    //resolves user
    const user = await resolveUser(params.address);

    //get listing
    const listings = await prisma.listing.findMany({
      where: {
        sellerId: user?.id,
      },
      include: {
        payments: true,
      },
    });

    if (!listings) {
      throw Error("invalid listing");
    }

    const [total] = sumPayments(listings);
    let totalAmount;

    if (total == undefined) {
      totalAmount = 0;
    } else {
      totalAmount = total;
    }
    console.log(totalAmount);
    return NextResponse.json(totalAmount);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "Bad Request" }, { status: 500 });
  }
};
