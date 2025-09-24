import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONFIG_FILE_PATH = path.join(process.cwd(), 'site-config.json');

export async function GET() {
  try {
    // Check if config file exists
    if (!fs.existsSync(CONFIG_FILE_PATH)) {
      return NextResponse.json(
        { error: 'Config file not found' },
        { status: 404 }
      );
    }

    // Read the config file
    const configData = fs.readFileSync(CONFIG_FILE_PATH, 'utf8');
    const config = JSON.parse(configData);

    return NextResponse.json({
      success: true,
      data: config
    });
  } catch (error) {
    console.error('Error reading config file:', error);
    return NextResponse.json(
      { error: 'Failed to read config file' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { data } = body;

    if (!data) {
      return NextResponse.json(
        { error: 'No data provided' },
        { status: 400 }
      );
    }

    // Write the updated config to file
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');

    return NextResponse.json({
      success: true,
      message: 'Config file updated successfully'
    });
  } catch (error) {
    console.error('Error writing config file:', error);
    return NextResponse.json(
      { error: 'Failed to write config file' },
      { status: 500 }
    );
  }
}
