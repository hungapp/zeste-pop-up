import { google } from "googleapis";

export interface MenuConfig {
  dessertMenu: string;
  drinkMenu: string;
  lastUpdated: string;
}

const FALLBACK_CONFIG: MenuConfig = {
  dessertMenu: "/dessert_menu.jpg",
  drinkMenu: "/drink_menu.jpg",
  lastUpdated: new Date().toISOString(),
};

/**
 * Fetches the current menu config by listing files in the Google Drive folder.
 * Looks for the most recent file matching each prefix (dessert_menu_, drink_menu_)
 * and returns proxy URLs. No filesystem writes needed.
 */
export async function getMenuConfig(): Promise<MenuConfig> {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!folderId || !apiKey) {
    console.warn("menu-store: Missing GOOGLE_DRIVE_FOLDER_ID or GOOGLE_API_KEY, using fallback config");
    return FALLBACK_CONFIG;
  }

  try {
    const drive = google.drive({ version: "v3", auth: apiKey });

    // List all image files in the folder, sorted by createdTime descending
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false and (name contains 'dessert_menu_' or name contains 'drink_menu_')`,
      fields: "files(id, name, createdTime)",
      orderBy: "createdTime desc",
      pageSize: 50,
    });

    const files = response.data.files || [];

    let dessertMenu = FALLBACK_CONFIG.dessertMenu;
    let drinkMenu = FALLBACK_CONFIG.drinkMenu;
    let lastUpdated: string | null = null;

    // Find most recent file for each menu type (already sorted by createdTime desc)
    for (const file of files) {
      if (!file.id || !file.name) continue;

      if (file.name.startsWith("dessert_menu_") && dessertMenu === FALLBACK_CONFIG.dessertMenu) {
        dessertMenu = `/api/image/${file.id}`;
        if (file.createdTime && (!lastUpdated || file.createdTime > lastUpdated)) {
          lastUpdated = file.createdTime;
        }
      }

      if (file.name.startsWith("drink_menu_") && drinkMenu === FALLBACK_CONFIG.drinkMenu) {
        drinkMenu = `/api/image/${file.id}`;
        if (file.createdTime && (!lastUpdated || file.createdTime > lastUpdated)) {
          lastUpdated = file.createdTime;
        }
      }

      // Stop early if we found both
      if (dessertMenu !== FALLBACK_CONFIG.dessertMenu && drinkMenu !== FALLBACK_CONFIG.drinkMenu) {
        break;
      }
    }

    return { dessertMenu, drinkMenu, lastUpdated: lastUpdated || new Date().toISOString() };
  } catch (error) {
    console.error("menu-store: Failed to list Drive files:", error);
    return FALLBACK_CONFIG;
  }
}
