export const config = { matcher: "/((?!_vercel).*)" };

export default function middleware(request) {
    const auth = request.headers.get("authorization");

    if (auth) {
        const [scheme, encoded] = auth.split(" ");
        if (scheme === "Basic") {
            const [, password] = atob(encoded).split(":");
            if (password === process.env.SITE_PASSWORD) return new Response(null, { headers: { "x-middleware-next": "1" } });
        }
    }

    return new Response("Authentication required", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Shirley Awards"' },
    });
}