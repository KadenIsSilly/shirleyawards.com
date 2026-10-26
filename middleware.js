export const config = { 
    matcher: "/((?!_vercel|src/assets/images/logo.png).*)" 
};

const hash = async (text) => {
    const data = new TextEncoder().encode(text);
    const buffer = await crypto.subtle.digest("SHA-256", data);
    const bytes = Array.from(new Uint8Array(buffer));

    return bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

const getPage = (wrong) => {
    const error = wrong ? '<p class="error">Password is incorrect</p>' : "";

    const html = 
    `
        <!DOCTYPE html>
        <html lang="en-GB">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="color-scheme" content="dark">
                <title>The Shirley Awards &bullet; Coming Soon</title>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
                <style>
                    * { 
                        margin: 0; 
                        padding: 0; 
                        box-sizing: border-box; 
                    }

                    :root {
                        --background: #051123;
                        --border: #f7ce84;
                        --title: #ffffff;
                        --text: #d1d3d7;
                        --subtext: #ced0d3;
                        --accent: #dfb04f;
                        --accent-dimmed: #dfaf4f36;
                    }
                    
                    body { 
                        min-height: 100vh; 
                        display: flex; 
                        flex-direction: column; 
                        align-items: center; 
                        justify-content: center; 
                        gap: 12px; 
                        background: var(--background); 
                        color: var(--text); 
                        font-family: 'Poppins', sans-serif; 
                        font-weight: 500; 
                        text-align: center; 
                    }

                    img { 
                        width: 300px; 
                        height: 300px; 
                    }

                    h1 { 
                        color: var(--accent); 
                        letter-spacing: 2px; 
                    }

                    form { 
                        margin-top: 32px; 
                        display: flex; 
                        gap: 8px; 
                        opacity: 0.6; 
                    }

                    input, button { 
                        padding: 8px 12px; 
                        font: inherit; 
                        font-size: 14px; 
                        color: var(--text); 
                        background: var(--background); 
                        border: 1px solid var(--accent-dimmed); 
                        border-radius: 8px; 
                    }

                    button { 
                        color: var(--accent); 
                        cursor: pointer; 
                    }

                    .error { 
                        color: #ff6b6b; 
                        font-size: 14px; 
                    }
                </style>
            </head>
            <body>
                <img src="/src/assets/images/logo.png" alt="The Shirley Awards' Logo" draggable="false">
                <h1>COMING SOON</h1>

                <form method="POST">
                    <input type="password" name="password" placeholder="Password" required>
                    <button type="submit">Enter</button>
                </form>
                
                ${error}
            </body>
        </html>
    `;

    return new Response(html, {
        status: 503,
        headers: { "Content-Type": "text/html; charset=utf-8" }
    });
}

export default async function middleware(request) {
    const host = new URL(request.url).hostname;

    if (host === "localhost" || host === "127.0.0.1") {
        return new Response(null, { headers: { "x-middleware-next": "1" } });
    }

    const password = process.env.SITE_PASSWORD;
    const token = await hash(password);
    const cookies = request.headers.get("cookie") || "";

    if (cookies.includes("access=" + token)) {
        return new Response(null, { headers: { "x-middleware-next": "1" } });
    }

    if (request.method === "POST") {
        const form = await request.formData();

        if (form.get("password") === password) {
            return new Response(null, {
                status: 303,
                headers: {
                    "Location": new URL(request.url).pathname,
                    "Set-Cookie": "access=" + token + "; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000"
                }
            });
        }

        return getPage(true);
    }

    return getPage(false);
}