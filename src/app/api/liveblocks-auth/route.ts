import { auth, currentUser } from '@clerk/nextjs/server';
import { Liveblocks } from '@liveblocks/node';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';

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

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});
export async function POST(req: Request) {
  const { sessionClaims } = await auth();
  const claims = sessionClaims as SessionClaims;

  if (!sessionClaims) {
    return new Response('Not authorized', { status: 401 });
  }

  // Use Clerk to get more details about the current user.
  const user = await currentUser();
  if (!user) {
    return new Response('Not authorized', { status: 401 });
  }

  // Parse the task ID from the request and query it from the database
  const { room } = await req.json();

  const document = await convex.query(api.documents.getById, { id: room });
  if (!document) {
    return new Response('Not authorized', { status: 401 });
  }

  // If the task was not created by the user or within the organization,
  // send back a 401
  const isOwner = document.ownerId === user.id;
  const isOrganizationMember = !!(
    document.organizationId && document.organizationId === claims.o?.id
  );

  if (!isOwner && !isOrganizationMember) {
    return new Response('Not authorized', { status: 401 });
  }

  const name =
    user.fullName ?? user.primaryEmailAddress?.emailAddress ?? 'Anonymous';
  const nameToNumber = name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = Math.abs(nameToNumber) % 360;
  const color = `hsl(${hue}, 80%, 60%)`;

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name,
      avatar: user.imageUrl,
      color,
    },
  });
  session.allow(room, session.FULL_ACCESS);
  const { body, status } = await session.authorize();

  // Return the response
  return new Response(body, { status });
}
