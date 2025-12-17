#!/bin/bash

# D1 Database Management Script untuk GiorBaliTour

echo "🗄️  GiorBaliTour D1 Database Management"
echo "======================================"

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI tidak terinstall. Jalankan: bunx wrangler auth login"
    exit 1
fi

echo "✅ Wrangler CLI terdeteksi"

# Database info
DB_NAME="tourbalidbgior"
DB_ID="807c8495-fd0f-432f-be9c-050c0f527d18"

echo "📋 Database Info:"
echo "   Name: $DB_NAME"
echo "   ID: $DB_ID"
echo ""

# Menu
case "$1" in
    "init")
        echo "🔧 Inisialisasi database lokal..."
        mkdir -p db
        touch "./db/tourbalitour.db"
        echo "✅ Database lokal siap di ./db/tourbalitour.db"
        ;;
    
    "migrate-local")
        echo "🚀 Migrate database lokal..."
        bun run db:push
        echo "✅ Migrasi database lokal selesai"
        ;;
    
    "migrate-remote")
        echo "🌐 Migrate database D1 (remote)..."
        bun run db:d1:migrate
        echo "✅ Migrasi D1 selesai"
        ;;
    
    "info")
        echo "ℹ️  Database Information:"
        npx wrangler d1 info $DB_NAME
        ;;
    
    "backup")
        echo "💾 Backup database D1..."
        npx wrangler d1 export $DB_NAME --output "./db/backup-$(date +%Y%m%d-%H%M%S).sql"
        echo "✅ Backup selesai"
        ;;
    
    *)
        echo "Usage: $0 {init|migrate-local|migrate-remote|info|backup}"
        echo ""
        echo "Commands:"
        echo "  init          - Buat database lokal"
        echo "  migrate-local - Migrate database lokal"
        echo "  migrate-remote- Migrate database D1"
        echo "  info          - Tampilkan info database"
        echo "  backup        - Backup database D1"
        exit 1
        ;;
esac