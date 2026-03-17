import { NextResponse } from "next/server";
import { getCurrentLoggedInMember, createWixOrdersAppClient } from "@/lib/wix/member-auth";

function formatAmount(amount: string | number | null | undefined) {
  const numericAmount = typeof amount === "number" ? amount : Number.parseFloat(amount ?? "");

  if (!Number.isFinite(numericAmount)) {
    return null;
  }

  return `₹${Math.round(numericAmount).toLocaleString("en-IN")}`;
}

export async function GET() {
  try {
    const member = await getCurrentLoggedInMember();

    if (!member?._id) {
      return NextResponse.json(
        { success: false, message: "You must be signed in to view order history" },
        { status: 401 }
      );
    }

    const wixClient = createWixOrdersAppClient();
    const response: any = await wixClient.orders.searchOrders({
      filter: {
        "buyerInfo.memberId": {
          $eq: member._id,
        },
      },
      sort: [{ fieldName: "_createdDate", order: "DESC" }],
      cursorPaging: { limit: 20 },
    });

    const items = (response?.orders ?? []).map((order: any) => ({
      id: order?._id ?? "",
      number: order?.number ?? order?.orderNumber ?? "",
      createdDate: order?.createdDate ?? "",
      status: order?.status ?? "UNKNOWN",
      paymentStatus: order?.paymentStatus ?? "UNKNOWN",
      fulfillmentStatus: order?.fulfillmentStatus ?? "UNKNOWN",
      total:
        order?.priceSummary?.total?.formattedAmount ??
        formatAmount(order?.priceSummary?.total?.amount) ??
        "",
      items: (order?.lineItems ?? []).map((lineItem: any) => ({
        id: lineItem?._id ?? "",
        name: lineItem?.productName?.original ?? lineItem?.productName ?? "Item",
        quantity: lineItem?.quantity ?? 1,
      })),
    }));

    return NextResponse.json({ success: true, orders: items });
  } catch (error) {
    return NextResponse.json({
      success: true,
      orders: [],
      message:
        process.env.NODE_ENV !== "production"
          ? error instanceof Error
            ? error.message
            : "Failed to load order history"
          : undefined,
    });
  }
}
