import Navbar from "./Navbar";

export default function MainLayout({ children }) {
  return (
<<<<<<< HEAD
    <div className="layout">
      <Navbar />

      <main className="mainContent">
        {children}
      </main>
    </div>
  );
}
=======
    <div className="layoutRoot">
      <Navbar />
      <main className="shell pageWrap">{children}</main>
    </div>
  );
}
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
