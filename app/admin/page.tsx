import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import MenuUploadForm from "./upload-form";
import JdClicksPanel from "./jd-clicks-panel";
import { getMenuConfig } from "@/lib/menu-store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const menuConfig = await getMenuConfig();

  return (
    <div className="min-h-screen bg-[#fefdf9] text-[#2f2f2f]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Suis logo"
              width={80}
              height={48}
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-xl font-semibold text-[#2144c0]">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600">{session.user?.email}</p>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Current Menu Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#2144c0] mb-4">
            Current Menu
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Dessert Menu
              </h3>
              <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={menuConfig.dessertMenu}
                  alt="Current Dessert Menu"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Drink Menu
              </h3>
              <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={menuConfig.drinkMenu}
                  alt="Current Drink Menu"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>

        {/* Upload New Menu Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#2144c0] mb-4">
            Upload New Menu
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <MenuUploadForm menuType="dessert" />
            <MenuUploadForm menuType="drink" />
          </div>
        </section>

        {/* Job Description Clicks */}
        <section>
          <h2 className="text-2xl font-semibold text-[#2144c0] mb-1">
            Job Description Clicks
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            How many people opened each JD from the careers page.{" "}
            <Link href="/admin/diagnostics" className="text-[#2144c0] hover:underline">
              Run Firestore diagnostics
            </Link>{" "}
            if the numbers look wrong.
          </p>
          <Suspense
            fallback={
              <div className="rounded-xl bg-white p-6 shadow-lg text-sm text-gray-500">
                Loading click stats…
              </div>
            }
          >
            <JdClicksPanel />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
