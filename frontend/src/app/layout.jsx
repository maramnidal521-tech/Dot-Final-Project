import "./globals.css";
import "../styles/components.css";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
<<<<<<< HEAD
  title: "FoundIt JO",
  description: "Lost and Found Platform",
=======
  title: "FounIt JO",
  description: "منصة FounIt JO",
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
