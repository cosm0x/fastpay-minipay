"use server";

import { NextResponse } from "next/server";
import prisma from "../../prisma";
import resolveUser from "@/helpers/resolveUser";
import getUniqueId from "@/helpers/uidGenerator";

export async function createListing(prevState: any, formData: FormData) {
  const listingData = {
    title: formData.get("title"),
    rate: formData.get("rate"),
    description: formData.get("description"),
    quantity: formData.get("quantity"),
    address: formData.get("address"),
  };

  try {
    //@ts-ignore resolve user
    const user = await resolveUser(listingData.address);
    const uid = await getUniqueId();

    const listing = await prisma.listing.create({
      data: {
        title: listingData.title,
        description: listingData.description,
        rate: parseFloat(listingData.rate),
        uid,
        sellerId: user.id,
      },
    });

    console.log(listing);
    return listing;
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "Bad Request" }, { status: 500 });
  }
}
