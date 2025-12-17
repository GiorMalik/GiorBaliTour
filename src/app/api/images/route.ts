import { NextRequest, NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import path from 'path';

interface ImageInfo {
  name: string;
  path: string;
  size: number;
  type: string;
}

export async function GET() {
  try {
    console.log('🖼️  Getting available images...');
    
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    
    // Get all images from subdirectories
    const heroImages = await getImagesFromDir(path.join(imagesDir, 'hero'));
    const aboutImages = await getImagesFromDir(path.join(imagesDir, 'about'));
    const carsImages = await getImagesFromDir(path.join(imagesDir, 'cars'));
    
    const allImages = {
      hero: heroImages,
      about: aboutImages,
      cars: carsImages,
      total: heroImages.length + aboutImages.length + carsImages.length,
    };
    
    return NextResponse.json({
      success: true,
      data: allImages,
      message: 'GiorBaliTour images loaded successfully',
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('❌ Error getting images:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Failed to load images',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

async function getImagesFromDir(dirPath: string): Promise<ImageInfo[]> {
  try {
    const files = await readdir(dirPath);
    const images: ImageInfo[] = [];
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = await stat(filePath);
      
      images.push({
        name: file,
        path: `/images/${path.relative(path.join(process.cwd(), 'public', 'images'), dirPath)}/${file}`,
        size: stats.size,
        type: getFileType(file),
      });
    }
    
    return images.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
}

function getFileType(filename: string): string {
  const ext = filename.toLowerCase().split('.').pop();
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
}