# Project Name

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Geist, a new font family for Vercel.

## Multi-Language Support

This project includes a multi-language setup that allows different components or pages to load translations dynamically based on the user's selected language. Here's a step-by-step guide on how to use and extend the multi-language functionality.

### Setting Up the Language Context

The project uses a LanguageContext to manage the current language and translations throughout the application. The LanguageProvider component wraps the application, providing access to language-related values and functions.

Context Definition: LanguageContext manages the current language, the setLanguage function, and getTranslations, a helper function to load translations dynamically.
Language Files: Translation files are stored as JSON files next to each component, e.g., components/NavBar.json.
Adding Translations for Components
To add translations for a new component, follow these steps:

## Create Translation Files

In the component's folder, create JSON files for each language. For example:

components/NavBar.json

Inside NavBar.json, structure translations by language, e.g.:
```json
{
  "en": {
    "home": "Home",
    "about": "About",
    "services": "Services",
    "contact": "Contact"
  },
  "fr": {
    "home": "Accueil",
    "about": "À propos",
    "services": "Services",
    "contact": "Contact"
  },
  "zh": {
    "home": "主页",
    "about": "关于我们",
    "services": "服务",
    "contact": "联系"
  }
}
```

### Using getTranslations in Your Component:

Import useAppLanguage from LanguageContext.
Use getTranslations to load translations dynamically for the component based on the current language.
Example usage in NavBar.tsx:

```typescript

import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useAppLanguage } from '../context/LanguageContext';

const NavBar: React.FC = () => {
  const { language, setLanguage, getTranslations } = useAppLanguage();
  const [translations, setTranslations] = useState({ home: "Home", about: "About", services: "Services", contact: "Contact" });

  useEffect(() => {
    const loadTranslations = async () => {
      const loadedTranslations = await getTranslations('components/NavBar', translations);
      setTranslations(loadedTranslations);
    };
    loadTranslations();
  }, [language]);

  return (
    <Navbar>
      <Nav>
        <Nav.Link href="#home">{translations.home}</Nav.Link>
        <Nav.Link href="#about">{translations.about}</Nav.Link>
        <Nav.Link href="#services">{translations.services}</Nav.Link>
        <Nav.Link href="#contact">{translations.contact}</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
Changing Language: Use setLanguage in your components to allow users to switch languages. This function updates the current language in LanguageContext, causing translations to reload across the app.
```

Example Directory Structure
Your directory structure should look like this for a component with translations:

```css
src/
├── components/
│   ├── NavBar.tsx
│   ├── NavBar.json
│   └── ...
└── context/
    └── LanguageContext.tsx
```

## Project Tree and Dynamic Background

This project implemented a simple project tree and dynamic background logic(see each component in the component folder), to allow users add their project and orgnize dynamically base on user device, when you move your mouse above the project card, the background will be changed into the project image.

## Troubleshooting
If the translation file is missing, a warning will appear in the console, and the application will fall back to default translations defined within the component.

## Learn More
To learn more about Next.js, take a look at the following resources:

Next.js Documentation - learn about Next.js features and API.
Learn Next.js - an interactive Next.js tutorial.
You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.
