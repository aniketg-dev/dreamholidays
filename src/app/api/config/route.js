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
      message: 'Config file updated successfully',
      data: data
    });
  } catch (error) {
    console.error('Error writing config file:', error);
    return NextResponse.json(
      { error: 'Failed to write config file' },
      { status: 500 }
    );
  }
}

// PUT - Complete replacement of config
export async function PUT(request) {
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
      message: 'Config file replaced successfully',
      data: data
    });
  } catch (error) {
    console.error('Error writing config file:', error);
    return NextResponse.json(
      { error: 'Failed to write config file' },
      { status: 500 }
    );
  }
}

// PATCH - Partial update of specific section
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { section, data: sectionData } = body;

    if (!section || !sectionData) {
      return NextResponse.json(
        { error: 'Section and data are required' },
        { status: 400 }
      );
    }

    // Read current config
    const configData = fs.readFileSync(CONFIG_FILE_PATH, 'utf8');
    const config = JSON.parse(configData);

    // Update specific section
    config[section] = sectionData;

    // Write back to file
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2), 'utf8');

    return NextResponse.json({
      success: true,
      message: `Section '${section}' updated successfully`,
      data: config
    });
  } catch (error) {
    console.error('Error updating config section:', error);
    return NextResponse.json(
      { error: 'Failed to update config section' },
      { status: 500 }
    );
  }
}

// DELETE - Delete specific section or reset to defaults
export async function DELETE(request) {
  try {
    const body = await request.json();
    const { section } = body;

    if (!section) {
      return NextResponse.json(
        { error: 'Section name is required' },
        { status: 400 }
      );
    }

    // Read current config
    const configData = fs.readFileSync(CONFIG_FILE_PATH, 'utf8');
    const config = JSON.parse(configData);

    // Delete the section
    if (config[section]) {
      delete config[section];
      
      // Write back to file
      fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2), 'utf8');

      return NextResponse.json({
        success: true,
        message: `Section '${section}' deleted successfully`,
        data: config
      });
    } else {
      return NextResponse.json(
        { error: `Section '${section}' not found` },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error deleting config section:', error);
    return NextResponse.json(
      { error: 'Failed to delete config section' },
      { status: 500 }
    );
  }
}
