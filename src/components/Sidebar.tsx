import { Cloud, MapPin, Settings, UserCircle } from "lucide-react";

export function Sidebar() {
  const menuItems = [
    { name: "Weather", icon: Cloud, active: true },
    { name: "Map", icon: MapPin },
    { name: "Settings", icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <UserCircle size={28} color="#2e86eb" strokeWidth={1.5} />
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`sidebar-btn ${item.active ? "active" : ""}`}
            aria-label={item.name}
          >
            <item.icon size={20} strokeWidth={1.5} />
            <span className="btn-text">{item.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
