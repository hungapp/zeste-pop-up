import { auth } from "@/lib/auth";
import { uploadToDrive } from "@/lib/drive";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session || !session.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const menuType = formData.get("menuType") as string; // "dessert" or "drink"

    if (!file || !menuType) {
      return NextResponse.json(
        { error: "Missing file or menu type" },
        { status: 400 }
      );
    }

    if (!["dessert", "drink"].includes(menuType)) {
      return NextResponse.json({ error: "Invalid menu type" }, { status: 400 });
    }

    // Upload to Google Drive
    const fileName = `${menuType}_menu_${Date.now()}.jpg`;
    const result = await uploadToDrive(
      session.accessToken,
      file,
      fileName
    );

    // Update menu config
    const configPath = path.join(process.cwd(), "lib", "menu-config.json");
    const configData = JSON.parse(await fs.readFile(configPath, "utf-8"));

    const configKey = menuType === "dessert" ? "dessertMenu" : "drinkMenu";
    configData[configKey] = result.publicUrl;
    configData.lastUpdated = new Date().toISOString();

    await fs.writeFile(configPath, JSON.stringify(configData, null, 2));

    return NextResponse.json({
      success: true,
      url: result.publicUrl,
      fileId: result.fileId,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
