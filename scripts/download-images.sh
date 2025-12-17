#!/bin/bash

# GiorBaliTour Image Download Script
# Downloads all required assets from giorbalitour.com

echo "🖼️  GiorBaliTour Image Downloader"
echo "================================="

# Create required directories
echo "📁 Creating directories..."
mkdir -p public/images/hero
mkdir -p public/images/about  
mkdir -p public/images/cars

echo "✅ Directories created successfully!"

# Download Hero images
echo ""
echo "🏛️  Downloading Hero images..."

curl -L -o "public/images/hero/barong-statue.jpg" "https://www.giorbalitour.com/images/hero/barong-statue.jpg"
if [ $? -eq 0 ]; then
    echo "✅ Downloaded: barong-statue.jpg"
else
    echo "❌ Failed to download: barong-statue.jpg"
fi

curl -L -o "public/images/hero/kedonganan-sunset.jpg" "https://www.giorbalitour.com/images/hero/kedonganan-sunset.jpg"
if [ $? -eq 0 ]; then
    echo "✅ Downloaded: kedonganan-sunset.jpg"
else
    echo "❌ Failed to download: kedonganan-sunset.jpg"
fi

curl -L -o "public/images/hero/nusa-penida-beach.jpg" "https://www.giorbalitour.com/images/hero/nusa-penida-beach.jpg"
if [ $? -eq 0 ]; then
    echo "✅ Downloaded: nusa-penida-beach.jpg"
else
    echo "❌ Failed to download: nusa-penida-beach.jpg"
fi

# Download About images
echo ""
echo "🏝️  Downloading About images..."

curl -L -o "public/images/about/bali-island.jpg" "https://www.giorbalitour.com/images/about/bali-island.jpg"
if [ $? -eq 0 ]; then
    echo "✅ Downloaded: bali-island.jpg"
else
    echo "❌ Failed to download: bali-island.jpg"
fi

curl -L -o "public/images/about/bali-nature.jpg" "https://www.giorbalitour.com/images/about/bali-nature.jpg"
if [ $? -eq 0 ]; then
    echo "✅ Downloaded: bali-nature.jpg"
else
    echo "❌ Failed to download: bali-nature.jpg"
fi

curl -L -o "public/images/about/bali-tari-kecak.jpg" "https://www.giorbalitour.com/images/about/bali-tari-kecak.jpg"
if [ $? -eq 0 ]; then
    echo "✅ Downloaded: bali-tari-kecak.jpg"
else
    echo "❌ Failed to download: bali-tari-kecak.jpg"
fi

# Download Cars images
echo ""
echo "🚗 Downloading Cars images..."

curl -L -o "public/images/cars/all-new-avanza.png" "https://www.giorbalitour.com/images/cars/all-new-avanza.png"
if [ $? -eq 0 ]; then
    echo "✅ Downloaded: all-new-avanza.png"
else
    echo "❌ Failed to download: all-new-avanza.png"
fi

curl -L -o "public/images/cars/avanza.png" "https://www.giorbalitour.com/images/cars/avanza.png"
if [ $? -eq 0 ]; then
    echo "✅ Downloaded: avanza.png"
else
    echo "❌ Failed to download: avanza.png"
fi

curl -L -o "public/images/cars/hiace-commuter.png" "https://www.giorbalitour.com/images/cars/hiace-commuter.png"
if [ $? -eq 0 ]; then
    echo "✅ Downloaded: hiace-commuter.png"
else
    echo "❌ Failed to download: hiace-commuter.png"
fi

curl -L -o "public/images/cars/hiace-premio.png" "https://www.giorbalitour.com/images/cars/hiace-premio.png"
if [ $? -eq 0 ]; then
    echo "✅ Downloaded: hiace-premio.png"
else
    echo "❌ Failed to download: hiace-premio.png"
fi

curl -L -o "public/images/cars/innova-reborn.webp" "https://www.giorbalitour.com/images/cars/innova-reborn.webp"
if [ $? -eq 0 ]; then
    echo "✅ Downloaded: innova-reborn.webp"
else
    echo "❌ Failed to download: innova-reborn.webp"
fi

curl -L -o "public/images/cars/toyota-alphard.png.webp" "https://www.giorbalitour.com/images/cars/toyota-alphard.png.webp"
if [ $? -eq 0 ]; then
    echo "✅ Downloaded: toyota-alphard.png.webp"
else
    echo "❌ Failed to download: toyota-alphard.png.webp"
fi

curl -L -o "public/images/cars/toyota-vellfire.png" "https://www.giorbalitour.com/images/cars/toyota-vellfire.png"
if [ $? -eq 0 ]; then
    echo "✅ Downloaded: toyota-vellfire.png"
else
    echo "❌ Failed to download: toyota-vellfire.png"
fi

curl -L -o "public/images/cars/xpander.png" "https://www.giorbalitour.com/images/cars/xpander.png"
if [ $? -eq 0 ]; then
    echo "✅ Downloaded: xpander.png"
else
    echo "❌ Failed to download: xpander.png"
fi

# Summary
echo ""
echo "📊 Download Summary:"
echo "===================="

hero_count=$(ls -1 public/images/hero/ 2>/dev/null | wc -l)
about_count=$(ls -1 public/images/about/ 2>/dev/null | wc -l)  
cars_count=$(ls -1 public/images/cars/ 2>/dev/null | wc -l)

echo "🏛️  Hero images: $hero_count/3"
echo "🏝️  About images: $about_count/3"
echo "🚗 Cars images: $cars_count/8"
echo "📁 Total images: $((hero_count + about_count + cars_count))/14"

if [ $((hero_count + about_count + cars_count)) -eq 14 ]; then
    echo ""
    echo "🎉 All images downloaded successfully!"
    echo "📂 Images are ready in public/images/"
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Start development: bun run dev"
    echo "   2. Visit: http://localhost:3000"
    echo "   3. Images will be available at:"
    echo "      - /images/hero/ (3 images)"
    echo "      - /images/about/ (3 images)" 
    echo "      - /images/cars/ (8 images)"
else
    echo ""
    echo "⚠️  Some images failed to download."
    echo "   Please check your internet connection and try again."
    echo "   You can also download manually from: https://www.giorbalitour.com/images/"
fi

echo ""
echo "✨ Image download completed!"