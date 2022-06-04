import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  
  //! se podria poner esta validacion para evitar un armado de carpeta
  
//   if (req.page.name === "/api/entries") return NextResponse.next();

  const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

  const id = req.page.params?.id || "";

  if (!checkMongoIDRegExp.test(id)) {
    return new Response(JSON.stringify({ message: "Id Mongo invalid" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return NextResponse.next();
}
