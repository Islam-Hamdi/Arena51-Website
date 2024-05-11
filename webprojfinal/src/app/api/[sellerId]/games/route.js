// api/seller/[sellerId]/route.js

import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";


    export async function GET(request, { params }) {
      try {
        const sellerId = params.sellerId;
        const games = await  
  
               prisma.Game.findMany({
                  where: { sellerId: sellerId }
              })
              return Response.json(games, { status: 200 })
      }catch (error) {
        console.error("An error occurred:", error);
        return NextResponse.error("Something went wrong", { status: 500 });
      }
    }