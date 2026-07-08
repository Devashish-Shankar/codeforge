import { prisma } from "@codeforge/database";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function findUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function createUser(data: {
  username: string;
  email: string;
  password: string;
}) {
  return prisma.user.create({
    data,
  });
}

export async function saveRefreshToken(data: {
  token: string;
  userId: string;
  expiresAt: Date;
}) {
  return prisma.refreshToken.create({
    data,
  });
}

export async function findRefreshToken(token: string) {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
    include: {
      user: true,
    },
  });
}

export async function revokeRefreshToken(token: string) {
  return prisma.refreshToken.update({
    where: {
      token,
    },
    data: {
      revoked: true,
    },
  });
}

export async function deleteUserRefreshTokens(userId: string) {
  return prisma.refreshToken.deleteMany({
    where: {
      userId,
    },
  });
}

export async function revokeRefreshTokenById(id: string) {
  return prisma.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
}

export async function saveEmailVerificationToken(data: {
  token: string;
  userId: string;
  expiresAt: Date;
}) {
  return prisma.emailVerificationToken.create({
    data,
  });
}

export async function findEmailVerificationToken(
  token: string
) {
  return prisma.emailVerificationToken.findUnique({
    where: {
      token,
    },
    include: {
      user: true,
    },
  });
}

export async function verifyUserEmail(userId: string) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isVerified: true,
    },
  });
}

export async function savePasswordResetToken(data: {
  token: string;
  userId: string;
  expiresAt: Date;
}) {
  return prisma.passwordResetToken.create({
    data,
  });
}

export async function findPasswordResetToken(
  token: string
) {
  return prisma.passwordResetToken.findUnique({
    where: {
      token,
    },
    include: {
      user: true,
    },
  });
}

export async function updateUserPassword(
  userId: string,
  password: string
) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password,
    },
  });
}

export async function deletePasswordResetToken(
  token: string
) {
  return prisma.passwordResetToken.delete({
    where: {
      token,
    },
  });
}