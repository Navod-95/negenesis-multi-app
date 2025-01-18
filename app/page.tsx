import Link from "next/link";

export default function Home() {
  return (
    <>
      <ul className="flex gap-10 p-8 bg-blue-500 text-white">
        <li><Link href="/palm-reading">Palm-Reading</Link></li>
        <li><Link href="/coffee-cup-reading">Coffee-cup-reading</Link></li>
        <li><Link href="/asterology">Asterology</Link></li>
        <li><Link href="/dream-analyser">Dream-Analyser</Link></li>
        <li><Link href="/numerology">Numerology</Link></li>
      </ul>
    </>
  );
}
