import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

type CurrentUser = Awaited<ReturnType<typeof currentUser>>;

export async function getSessionUser(): Promise<{
  clerkUser: CurrentUser;
  dbUser: Awaited<ReturnType<typeof prisma.user.findUnique>> | null;
}> {
  const { userId } = auth();
  if (!userId) {
    return { clerkUser: null, dbUser: null };
  }

  const clerkUser = await currentUser();
  const dbUser = await prisma.user.findUnique({ where: { id: userId } });

  return { clerkUser, dbUser };
}

export async function ensureUserRecord() {
  const { userId } = auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  const name = `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() || null;

  const dbUser = await prisma.user.upsert({
    where: { id: userId },
    update: { name, email: email ?? undefined },
    create: {
      id: userId,
      name,
      email: email ?? `${userId}@placeholder.local`,
    },
  });

  return dbUser;
}

export async function requireAdmin() {
  const { clerkUser, dbUser } = await getSessionUser();

  const isAdminFromClerk = clerkUser?.privateMetadata?.role === "admin";
  const isAdminFromDb = dbUser?.role === "ADMIN";

  if (!isAdminFromClerk && !isAdminFromDb) {
    throw new Error("Admin access required");
  }
}
