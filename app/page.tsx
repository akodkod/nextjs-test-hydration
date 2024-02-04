import TestHydrationInvalid from "@/components/TestHydrationInvalid"
import TestHydrationValid from "@/components/TestHydrationValid"
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-96 p-14 mx-auto space-y-4">
      <h1 className="text-lg font-medium text-center">TestHydration</h1>

      <TestHydrationInvalid />
    </main>
  );
}
