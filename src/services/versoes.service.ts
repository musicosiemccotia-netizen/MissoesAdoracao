import { supabase } from '../lib/supabase'

export async function buscarVersoes(hinoId: string) {
  const { data, error } = await supabase
    .from('versoes')
    .select('*')
    .eq('hino_id', hinoId)
    .order('nome_versao')

  if (error) {
    throw error
  }

  return data
}