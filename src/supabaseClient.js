import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://muvxafwfxstdvhxavgdl.supabase.co";

const supabaseKey =
  "sb_publishable_oKpQG_OmM0HfusYoGF_Y7g_6PRJLEIE";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);