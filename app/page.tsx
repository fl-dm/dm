import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <HowItWorks />
      <Contact />
      <footer className="bg-black border-t border-gray-900 py-8 px-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} — Building AI that works.
      </footer>
    </main>
  );
}
