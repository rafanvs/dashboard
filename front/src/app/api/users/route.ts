import { NextResponse } from "next/server";



export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${process.env.BACKEND_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const contentType = res.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? await res.json()
    : await res.text();

  return NextResponse.json(payload, { status: res.status });
}

export async function GET() {
  const res = await fetch(`${process.env.BACKEND_URL}/users`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const contentType = res.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? await res.json()
    : await res.text();

  return NextResponse.json(payload, { status: res.status });
}


