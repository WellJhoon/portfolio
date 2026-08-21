import { createClient } from "@supabase/supabase-js";

export interface PixelArtEntry {
  id: string;
  authorName: string;
  authorSocial?: string;
  pixels: string[];
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !key) return null;
  return createClient(url, key);
}

const memoryStore: PixelArtEntry[] = [
  {
    id: "demo-1",
    authorName: "Jhon Medina",
    authorSocial: "https://github.com/WellJhoon",
    pixels: [
      "#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000",
      "#000000","#000000","#e11d48","#e11d48","#000000","#000000","#000000","#000000","#000000","#000000","#e11d48","#e11d48","#000000","#000000","#000000","#000000",
      "#000000","#e11d48","#f43f5e","#f43f5e","#e11d48","#000000","#000000","#000000","#000000","#e11d48","#f43f5e","#f43f5e","#e11d48","#000000","#000000","#000000",
      "#000000","#e11d48","#f43f5e","#ffffff","#f43f5e","#e11d48","#000000","#000000","#e11d48","#f43f5e","#f43f5e","#f43f5e","#e11d48","#000000","#000000","#000000",
      "#000000","#e11d48","#f43f5e","#f43f5e","#f43f5e","#f43f5e","#e11d48","#e11d48","#f43f5e","#f43f5e","#f43f5e","#f43f5e","#e11d48","#000000","#000000","#000000",
      "#000000","#000000","#e11d48","#f43f5e","#f43f5e","#f43f5e","#f43f5e","#f43f5e","#f43f5e","#f43f5e","#f43f5e","#e11d48","#000000","#000000","#000000","#000000",
      "#000000","#000000","#000000","#e11d48","#f43f5e","#f43f5e","#f43f5e","#f43f5e","#f43f5e","#f43f5e","#e11d48","#000000","#000000","#000000","#000000","#000000",
      "#000000","#000000","#000000","#000000","#e11d48","#f43f5e","#f43f5e","#f43f5e","#f43f5e","#e11d48","#000000","#000000","#000000","#000000","#000000","#000000",
      "#000000","#000000","#000000","#000000","#000000","#e11d48","#f43f5e","#f43f5e","#e11d48","#000000","#000000","#000000","#000000","#000000","#000000","#000000",
      "#000000","#000000","#000000","#000000","#000000","#000000","#e11d48","#e11d48","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000",
      "#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000",
      "#000000","#38bdf8","#38bdf8","#000000","#000000","#000000","#10b981","#10b981","#000000","#000000","#000000","#f59e0b","#f59e0b","#000000","#000000","#000000",
      "#000000","#38bdf8","#38bdf8","#000000","#000000","#000000","#10b981","#10b981","#000000","#000000","#000000","#f59e0b","#f59e0b","#000000","#000000","#000000",
      "#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000",
      "#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000",
      "#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"
    ],
    status: "approved",
    createdAt: new Date().toISOString()
  }
];

export async function getApprovedEntries(): Promise<PixelArtEntry[]> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("guestbook")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (!error && data) {
        if (data.length === 0) {
          return memoryStore.filter((e) => e.status === "approved");
        }
        return data.map((item: any) => ({
          id: item.id,
          authorName: item.author_name || item.authorName,
          authorSocial: item.author_social || item.authorSocial,
          pixels: typeof item.pixels === "string" ? JSON.parse(item.pixels) : item.pixels,
          status: item.status,
          createdAt: item.created_at || item.createdAt
        }));
      }
    } catch {}
  }
  return memoryStore.filter((e) => e.status === "approved");
}

export async function getAllEntries(): Promise<PixelArtEntry[]> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        if (data.length === 0) {
          return memoryStore;
        }
        return data.map((item: any) => ({
          id: item.id,
          authorName: item.author_name || item.authorName,
          authorSocial: item.author_social || item.authorSocial,
          pixels: typeof item.pixels === "string" ? JSON.parse(item.pixels) : item.pixels,
          status: item.status,
          createdAt: item.created_at || item.createdAt
        }));
      }
    } catch {}
  }
  return memoryStore;
}

export async function createEntry(entry: Omit<PixelArtEntry, "id" | "status" | "createdAt">): Promise<PixelArtEntry> {
  const newEntry: PixelArtEntry = {
    id: `art_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    authorName: entry.authorName.slice(0, 30),
    authorSocial: entry.authorSocial ? entry.authorSocial.slice(0, 100) : undefined,
    pixels: entry.pixels,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from("guestbook").insert({
        id: newEntry.id,
        author_name: newEntry.authorName,
        author_social: newEntry.authorSocial,
        pixels: newEntry.pixels,
        status: newEntry.status,
        created_at: newEntry.createdAt
      });
    } catch {}
  }

  memoryStore.unshift(newEntry);
  return newEntry;
}

export async function updateEntryStatus(id: string, status: "approved" | "rejected"): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase
        .from("guestbook")
        .update({ status })
        .eq("id", id);
    } catch {}
  }

  const found = memoryStore.find((e) => e.id === id);
  if (found) {
    found.status = status;
    return true;
  }
  return false;
}
