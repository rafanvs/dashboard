import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
        return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const res = await fetch(`${process.env.BACKEND_URL}/telegram-bots`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
        return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();

    const res = await fetch(`${process.env.BACKEND_URL}/telegram-bots`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}
