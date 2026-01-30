import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { getSupabaseClient } from '../lib/supabaseClient';

describe('Supabase Client Integration', () => {
  let supabase = getSupabaseClient();
  let insertedId: number | null = null;

  beforeAll(() => {
    // Setup tasks if any before tests run
  });

  afterAll(async () => {
    // Cleanup inserted test row if any
    if (insertedId !== null) {
      const { error } = await supabase
        .from('test')
        .delete()
        .eq('id', insertedId);

      if (error) {
        console.error('Failed to clean up test row:', error);
      }
    }
  });

  it('should read rows from the test table', async () => {
    const { data, error } = await supabase
      .from('test')
      .select('*')
      .limit(5);

    expect(error).toBeNull();
    expect(data).toBeInstanceOf(Array);
  });

  it('should insert a row into the test table', async () => {
    const { data, error } = await supabase
      .from('test')
      .insert([{ title: 'Vitest Supabase Insert Test' }])
      .select();

    expect(error).toBeNull();
    expect(data).toBeInstanceOf(Array);
    expect(data && data.length).toBeGreaterThan(0);
    expect(data && data[0]).toHaveProperty('id');
    expect(data && data[0].title).toBe('Vitest Supabase Insert Test');

    if (data && data[0] && data[0].id) {
      insertedId = data[0].id;
    }
  });
});
