import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAdminClient } from "@/lib/supabase/server";

const VALID_STATUS = [
  "new",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

export async function PATCH(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = getAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "Supabase configured nahi hai" },
      { status: 503 }
    );
  }

  const { id, status } = await request.json();
  if (!id || !VALID_STATUS.includes(status)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { error } = await admin
    .from("orders")
    .update({ status })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
