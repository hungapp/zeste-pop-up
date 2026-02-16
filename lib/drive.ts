import { google } from "googleapis";
import { Readable } from "stream";

export async function uploadToDrive(
  accessToken: string,
  file: File,
  fileName: string
) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({ access_token: accessToken });

  const drive = google.drive({ version: "v3", auth: oauth2Client });

  // Convert File to Buffer then to Stream
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const stream = Readable.from(buffer);

  // Upload file to Drive
  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: process.env.GOOGLE_DRIVE_FOLDER_ID
        ? [process.env.GOOGLE_DRIVE_FOLDER_ID]
        : undefined,
    },
    media: {
      mimeType: file.type,
      body: stream,
    },
    fields: "id, webViewLink, webContentLink, mimeType",
  });

  const fileId = response.data.id;

  if (!fileId) {
    throw new Error("Failed to upload file");
  }

  // Use our proxy API route to serve the image
  // This works on Vercel and handles authentication
  const publicUrl = `/api/image/${fileId}`;

  return {
    fileId,
    publicUrl,
    webViewLink: response.data.webViewLink,
  };
}

export async function downloadFromDrive(fileId: string) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  // Use service account or refresh token here
  // For now, we'll make the folder public and access without auth
  const drive = google.drive({ version: "v3" });

  const response = await drive.files.get(
    {
      fileId: fileId,
      alt: "media",
    },
    { responseType: "arraybuffer" }
  );

  return {
    data: response.data as ArrayBuffer,
    mimeType: response.headers["content-type"] || "image/jpeg",
  };
}
