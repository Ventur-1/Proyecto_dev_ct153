import { createClient } from '@supabase/supabase-js';

// NOTA PARA MÁS ADELANTE: Aquí pondremos las claves que sacaste de Supabase
const supabaseUrl = '[https://TU-URL.supabase.co](https://TU-URL.supabase.co)';
const supabaseKey = 'TU-LLAVE-PUBLICA';

// Si no hay URL, no creamos cliente para evitar que StackBlitz marque error ahorita.
export const supabase = supabaseUrl.includes('TU-URL')
  ? null
  : createClient(supabaseUrl, supabaseKey);
