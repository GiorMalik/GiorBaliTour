#!/bin/bash

cd /workspaces/NewGiorTour/public/images

echo "🚀 Mengorganisir ulang struktur images..."

# Move hero images
echo "📸 Memindahkan images ke hero/"
mv barong-statue.jpg hero/ 2>/dev/null || echo "✓ barong-statue.jpg"
mv nusa-penida-beach.jpg hero/ 2>/dev/null || echo "✓ nusa-penida-beach.jpg"
mv kedonganan-sunset.jpg hero/ 2>/dev/null || echo "✓ kedonganan-sunset.jpg"

# Move car images to cars folder
echo "🚗 Memindahkan images ke cars/"
mv all-new-avanza.png cars/ 2>/dev/null || echo "✓ all-new-avanza.png"
mv avanza.png cars/ 2>/dev/null || echo "✓ avanza.png"
mv hiace-commuter.png cars/ 2>/dev/null || echo "✓ hiace-commuter.png"
mv hiace-premio.png cars/ 2>/dev/null || echo "✓ hiace-premio.png"
mv innova-reborn.webp cars/ 2>/dev/null || echo "✓ innova-reborn.webp"
mv toyota-alphard.png.webp cars/ 2>/dev/null || echo "✓ toyota-alphard.png.webp"
mv toyota-vellfire.png cars/ 2>/dev/null || echo "✓ toyota-vellfire.png"
mv xpander.png cars/ 2>/dev/null || echo "✓ xpander.png"

# Delete unnecessary files
echo "🗑️  Menghapus file yang tidak perlu..."
rm -f README.md
rm -f copy-images.sh
rm -f ../../../IMAGE_SETUP.md 2>/dev/null || true

echo ""
echo "📊 Struktur images setelah reorganisasi:"
echo ""
echo "public/images/"
echo "├── hero/"
ls -1 hero/ 2>/dev/null
echo "├── cars/"
ls -1 cars/ 2>/dev/null
echo "└── about/"
ls -1 about/ 2>/dev/null

echo ""
echo "✅ Reorganisasi selesai!"
