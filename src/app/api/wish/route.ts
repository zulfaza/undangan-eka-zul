import { db } from '@/lib/firebase';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
  const q = query(
    collection(db, 'wishes'),
    orderBy('date', 'desc'),
    limit(100)
  );
  const data = await getDocs(q);
  const fomattedData = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return Response.json({ data: fomattedData });
}
