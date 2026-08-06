// Fill these in after you create your Supabase project.
// Project Settings -> API -> Project URL / anon public key
window.SUPABASE_URL = "https://zqdbotjfimozzztourqh.supabase.co";
window.SUPABASE_ANON_KEY = "sb_publishable_wZq6TUBs5ww7aA3zEZHulA_Wnmf-ItV";

// Simple client-side gate for the admin page. This is NOT real security —
// anyone who reads the JS can see it — it just keeps casual visitors out.
// Fine for a 2-day art project; don't put anything truly sensitive behind it.
window.ADMIN_PASSWORD = "chicken-noodle-soup";

// Center point + zoom for the map on first load
window.MAP_CENTER = [34.0522, -118.2437]; // Los Angeles
window.MAP_ZOOM = 11;

window.SOCIAL_LINKS = [
  {
    label: "instagram",
    url: "https://instagram.com/aspenjade.vox"
  },
  {
    label: "tiktok",
    url: "https://tiktok.com/@aspenjademusic"
  },
  {
    label: "listen :)",
    url: "https://linktr.ee/aspenjadeofficial?utm_source=linktree_profile_share&ltsid=b4a78cf7-bddb-42be-bc16-8101c18e980c"
  }
];