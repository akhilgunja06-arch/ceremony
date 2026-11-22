import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

const DB_NAME = 'tanusha-mahesh-wedding';
const STORE_NAME = 'photos';
const DB_VERSION = 1;

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB is not available'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Could not open photo store'));
  });
}

async function readAllPhotos(): Promise<Map<string, Blob>> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const result = new Map<string, Blob>();
    const cursorRequest = store.openCursor();
    cursorRequest.onsuccess = () => {
      const cursor = cursorRequest.result;
      if (cursor) {
        if (cursor.value instanceof Blob) result.set(String(cursor.key), cursor.value);
        cursor.continue();
      } else {
        resolve(result);
      }
    };
    cursorRequest.onerror = () => reject(cursorRequest.error);
  });
}

async function writePhoto(id: string, blob: Blob): Promise<void> {
  const db = await openDatabase();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(blob, id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function removePhotoRecord(id: string): Promise<void> {
  const db = await openDatabase();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

interface PhotoLibraryValue {
  overrides: Record<string, string>;
  ready: boolean;
  saving: string | null;
  error: string | null;
  save: (id: string, file: File) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

const PhotoLibraryContext = createContext<PhotoLibraryValue | null>(null);

export function PhotoLibraryProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const urls = useRef<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;

    readAllPhotos()
      .then((photos) => {
        if (cancelled) return;
        const next: Record<string, string> = {};
        photos.forEach((blob, id) => {
          next[id] = URL.createObjectURL(blob);
        });
        urls.current = next;
        setOverrides(next);
      })
      .catch(() => {
        if (!cancelled) setError('Photo uploads are unavailable in this browser. Files in /public/photos still work.');
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
      Object.values(urls.current).forEach((url) => URL.revokeObjectURL(url));
      urls.current = {};
    };
  }, []);

  const save = useCallback(async (id: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.');
      return;
    }
    setSaving(id);
    setError(null);
    try {
      await writePhoto(id, file);
      const url = URL.createObjectURL(file);
      const previous = urls.current[id];
      urls.current = { ...urls.current, [id]: url };
      setOverrides((current) => ({ ...current, [id]: url }));
      if (previous) URL.revokeObjectURL(previous);
    } catch {
      setError('Could not save that photo. Try a smaller image.');
    } finally {
      setSaving(null);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    setSaving(id);
    setError(null);
    try {
      await removePhotoRecord(id);
      const previous = urls.current[id];
      if (previous) URL.revokeObjectURL(previous);
      const { [id]: _removed, ...rest } = urls.current;
      urls.current = rest;
      setOverrides(rest);
    } catch {
      setError('Could not remove that photo.');
    } finally {
      setSaving(null);
    }
  }, []);

  const value = useMemo(
    () => ({ overrides, ready, saving, error, save, remove }),
    [overrides, ready, saving, error, save, remove],
  );

  return <PhotoLibraryContext.Provider value={value}>{children}</PhotoLibraryContext.Provider>;
}

export function usePhotoLibrary(): PhotoLibraryValue {
  const context = useContext(PhotoLibraryContext);
  if (!context) throw new Error('usePhotoLibrary must be used inside PhotoLibraryProvider');
  return context;
}
