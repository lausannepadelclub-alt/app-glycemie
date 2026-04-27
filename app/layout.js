export const metadata = {
  title: 'Mon Guide Glycémie',
  description: 'App pour gérer sa glycémie au quotidien',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
