import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    if (!session?.accessToken) {
        return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const res = await fetch(`${process.env.BACKEND_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
        },
    });

    if (!res.ok) {
        const error = await res.text();
        return NextResponse.json({ message: error || "Erro ao deletar usuário" }, { status: res.status });
    }

    return NextResponse.json({ message: "Usuário deletado com sucesso" });
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    if (!session?.accessToken) {
        return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();

    const res = await fetch(`${process.env.BACKEND_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const error = await res.text();
        return NextResponse.json({ message: error || "Erro ao atualizar usuário" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
}
