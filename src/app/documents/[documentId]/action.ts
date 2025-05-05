'use server';

import { ConvexHttpClient } from 'convex/browser';
import { auth, clerkClient } from '@clerk/nextjs/server';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getDocuments(ids: Id<'documents'>[]) {
  return await convex.query(api.documents.getByIds, { ids });
}

export type SessionClaims = {
  azp: string;
  exp: number;
  fva: number[];
  iat: number;
  iss: string;
  nbf: number;
  o?: {
    id: string;
    rol: string;
    slg: string;
  };
  sid: string;
  sub: string;
  v: number;
};

export async function getUsers() {
  const { sessionClaims } = await auth();
  const clerk = await clerkClient();

  const claims = sessionClaims as SessionClaims;
  const organizationId = claims.o?.id;

  if (!organizationId) {
    throw new Error('Organization ID not found in session claims.');
  }

  const response = await clerk.users.getUserList({
    organizationId: [organizationId],
  });

  const users = response.data.map((user) => ({
    id: user.id,
    name:
      user.fullName ?? user.primaryEmailAddress?.emailAddress ?? 'Anonymous',
    avatar: user.imageUrl,
    color: '',
  }));

  return users;
}
