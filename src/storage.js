import { supabase } from "./supabaseClient";

const TABLE = "cobranza_kv";

export const storage = {
  async get(key) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("value")
      .eq("key", key)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;
    return { key, value: data.value };
  },

  async set(key, value) {
    const { error } = await supabase
      .from(TABLE)
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });

    if (error) throw error;
    return { key, value };
  },
};
