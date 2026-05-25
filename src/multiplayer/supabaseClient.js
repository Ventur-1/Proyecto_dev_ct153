import { createClient } from '@supabase/supabase-js';

// Reemplaza esto con los datos reales que sacaste de Supabase
const supabaseUrl = 'https://kazhehcybwvuugbqjtut.supabase.co';
const supabaseKey = 'sb_publishable_yu-XKplwHXlK1bLu2fTN-A_y47tAgk3';

export const supabase = createClient(supabaseUrl, supabaseKey);