import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const getOneUser = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (user) {
    return user;
  } else {
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({ where: { email } });
  if (user) {
    return user;
  } else {
    return null;
  }
};

export const addNewUser = async (dataUser: User) => {
  const user = await prisma.user.create({ data: { ...dataUser } });
  if (user) {
    return user;
  } else {
    return null;
  }
};

export const updateUser = async (id: string, dataUser: User) => {
  const user = await prisma.user.update({
    where: { id },
    data: dataUser,
  });
  if (user) {
    return user;
  } else {
    return null;
  }
};

export const deleteUser = async (id: string) => {
  const user = await prisma.user.delete({ where: { id } });
  if (user) {
    return user;
  }
  return null;
};
