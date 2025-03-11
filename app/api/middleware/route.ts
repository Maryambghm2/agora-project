import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface MyJwtPayload extends JwtPayload {
    id_user: string;
}

export function withAuth(handler: (req: any, params?: any) => Promise<Response>) {
    return async (req: any) => {
        const token = req.headers.get("authorization")?.split(" ")[1];
        if (!token) return NextResponse.json({ error: "Accés non autorizé" }, { status: 401 });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as MyJwtPayload;
            req.user = {id_user : decoded.id_user};
            
            return handler(req);
        } catch (error) {
            return NextResponse.json({ error: "Token invalide" }, { status: 403 });
        }
    }
}