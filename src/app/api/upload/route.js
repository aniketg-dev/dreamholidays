import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('image');
    const folder = data.get('folder') || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create filename with timestamp to avoid conflicts
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${originalName}`;

    // Create the upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', folder);
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    // Write the file
    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return the public URL
    const publicUrl = `/${folder}/${filename}`;

    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      path: publicUrl,
      filename: filename 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' }, 
      { status: 500 }
    );
  }
}
