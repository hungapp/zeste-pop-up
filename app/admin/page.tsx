import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import MenuUploadForm from "./upload-form";
import fs from "fs/promises";
import path from "path";

async function getMenuConfig() {
  const configPath = path.join(process.cwd(), "lib", "menu-config.json");
  const configData = await fs.readFile(configPath, "utf-8");
  return JSON.parse(configData);
}

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
          <p className="text-sm text-gray-500 mt-4">
            Last updated:{" "}
            {new Date(menuConfig.lastUpdated).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </section>

        {/* Upload New Menu Section */}
        <section>
          <h2 className="text-2xl font-semibold text-[#2144c0] mb-4">
            Upload New Menu
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <MenuUploadForm menuType="dessert" />
            <MenuUploadForm menuType="drink" />
          </div>
        </section>
      </main>
    </div>
  );
}
