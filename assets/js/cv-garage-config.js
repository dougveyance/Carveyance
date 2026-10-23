/* ============================================================
   CARVEYANCE GARAGE: connection settings
   ============================================================
   Fill these two in once, from Supabase > Project Settings > API.
   Both are meant to be public: what visitors can and can't do is
   decided by the rules in tools/garage/schema.sql, not by hiding
   these. NEVER paste the "service_role" or "secret" key here.

   Until both are filled in, the car pages say the Garage is
   getting ready instead of breaking.
   ============================================================ */
window.CV_GARAGE = {
  supabaseUrl: "",   // e.g. "https://abcdefghijklmnop.supabase.co"
  supabaseKey: ""    // the "anon public" key (newer projects: "publishable" key, starts sb_publishable_)
};
