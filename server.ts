import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());

// OAuth configurado com variáveis de ambiente (seguro, não vai pro bundle)
const oauth = new OAuth({
  consumer: {
    key: process.env.CONSUMER_KEY,
    secret: process.env.CONSUMER_SECRET,
  },
  signature_method: "HMAC-SHA1",
  hash_function: (baseString, key) => crypto.createHmac("sha1", key).update(baseString).digest("base64"),
});

// Proxy — assina com OAuth e repassa para a API externa
app.use("/api-proxy", async (req, res) => {
  const targetUrl = `${process.env.BASE_URL}${req.url}`;
  const method = req.method.toUpperCase();

  const token = {
    key: process.env.ACCESS_TOKEN,
    secret: process.env.TOKEN_SECRET,
  };

  const authHeader = oauth.toHeader(oauth.authorize({ url: targetUrl, method }, token));

  try {
    const response = await axios({
      method,
      url: targetUrl,
      headers: {
        ...authHeader,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: req.body,
    });

    res.json(response.data);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Erro no proxy:", err.message);
      return res.status(500).json({ error: "Erro no servidor proxy" });
    }

    res.status(500).json({ error: "Erro no servidor proxy" });
  }
});

// Serve o React
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "dist", "index.html")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
