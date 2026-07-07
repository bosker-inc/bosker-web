import { request } from '@/lib/api';

export interface FavoriteTechnician {
  technician_id: string;
  name: string;
  avatar: string | null;
  status: string;
  averageRating: number;
  totalReviews: number;
  created_at: string;
}

const FAVORITE_FIELDS = `technician_id name avatar status averageRating totalReviews created_at`;

export async function getFavorites(): Promise<FavoriteTechnician[]> {
  const data = await request<{ getFavorites: FavoriteTechnician[] }>(`{ getFavorites { ${FAVORITE_FIELDS} } }`);
  return data.getFavorites;
}

export async function addFavorite(technicianId: string): Promise<FavoriteTechnician[]> {
  const data = await request<{ addFavorite: FavoriteTechnician[] }>(
    `mutation ($technicianId: String!) { addFavorite(technicianId: $technicianId) { ${FAVORITE_FIELDS} } }`,
    { technicianId }
  );
  return data.addFavorite;
}

export async function removeFavorite(technicianId: string): Promise<boolean> {
  const data = await request<{ removeFavorite: { deleted: boolean } }>(
    `mutation ($technicianId: String!) { removeFavorite(technicianId: $technicianId) { deleted } }`,
    { technicianId }
  );
  return data.removeFavorite.deleted;
}
