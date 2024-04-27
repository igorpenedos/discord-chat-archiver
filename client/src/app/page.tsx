import Image from "next/image";
import { Parser } from "./components/Parser/Parser";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center font-mono">
      <div className="text-8xl mt-24 mb-12 text-center">
        Discord Chat Archiver
      </div>
      <div className="mb-6">
        <span>
          Add to your server:{" "}
          <a
            href="https://discord.com/oauth2/authorize?client_id=1229268973032312883"
            className="hover:text-blue-600 bg-neutral-800 p-2 rounded"
            target="_blank"
          >
            https://discord.com/oauth2/authorize?client_id=1229268973032312883
          </a>
        </span>
      </div>
      <Parser />
    </main>
  );
}
