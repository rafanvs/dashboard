import { NextResponse } from "next/server";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Variável de ambiente ${name} não definida`);
  return value;
}

export async function POST(req: Request) {
  const backendUrl = requireEnv("BACKEND_URL").replace(/\/$/, "");
  const body = await req.json();

  const res = await fetch(`${backendUrl}/users`, {
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


