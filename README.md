# Portfolio Website

A modern, responsive portfolio website built with Next.js, Tailwind CSS, and Framer Motion. Showcases projects, skills, and a contact form with smooth animations and dark mode support.

---

## 🚀 Features

- **Next.js** for server-side rendering, routing, and performance optimizations
- **Tailwind CSS** for utility-first, responsive styling
- **Framer Motion** for fluid animations and interactions
- Dark mode toggle using `next-themes`
- Hero section
- About section
- Skills section
- Projects carousel
- Contact form powered by `react-hook-form` and client-side validation
- SEO-friendly meta tags (Open Graph, Twitter Card)
- Clean, modular component structure following SOLID principles

---

## 📦 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS, ShadCN UI components
- **Animations:** Framer Motion
- **Theming:** next-themes
- **Forms:** React Hook Form

---

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser** at [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Configuration

- **Theme:** Toggle light/dark mode using the button in the header. Preference is stored in `localStorage`.
- **Meta:** Edit `app/page.tsx` metadata for title, description, and Open Graph images.
- **Projects:** Update the `src/data/projects.ts` file with your own projects and images.
- **Skills:** Edit `src/data/skills.ts` to add/remove skills and categories.

---

## 🧩 Folder Structure

```
├── app/                # Next.js App Router pages & metadata
├── components/         # Reusable UI components (Hero, About, Skills, etc.)
├── src/lib/            # Utilities, hooks, and animation variants
├── src/constants/      # Static data (skills, projects)
├── public/             # Static assets (images, favicon)
└── styles/             # Global CSS and theme overrides
```

## 📄 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
