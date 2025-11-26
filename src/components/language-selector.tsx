'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { translations, Language } from '@/lib/translations';

const languageFlags = {
  english: '🇺🇸',
  chinese: '🇨🇳',
  korean: '🇰🇷',
  arabic: '🇸🇦',
  turkish: '🇹🇷',
  russian: '🇷🇺',
  portuguese: '🇧🇷',
  indonesian: '🇮🇩'
};

const languageNames = {
  english: 'English',
  chinese: '中文',
  korean: '한국어',
  arabic: 'العربية',
  turkish: 'Türkçe',
  russian: 'Русский',
  portuguese: 'Português',
  indonesian: 'Bahasa Indonesia'
};

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span className="text-lg">{languageFlags[currentLanguage]}</span>
          <span className="hidden sm:inline">{languageNames[currentLanguage]}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(languageFlags).map(([lang, flag]) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => onLanguageChange(lang as Language)}
            className="flex items-center gap-3"
          >
            <span className="text-lg">{flag}</span>
            <span>{languageNames[lang as Language]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}