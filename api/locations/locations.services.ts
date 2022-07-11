import { PrismaClient, location } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllLocations = async () => {
    const locations = await prisma.location.findMany();
    if (!locations) {
        return null;
    } else {
        return locations;
    }
}

export const getOneLocation = async (id: string) => {
    const location = await prisma.location.findUnique({
        where: {
            id
        }
    });
    if (!location) {
        return null;
    } else {
        return location;
    }
}

export const addLocation = async (location: location) => {
    const newLocation = await prisma.location.create({ data: {...location}  });
    if (!newLocation) {
        return null;
    } else {
        return newLocation;
    }
}

export const updateLocation = async (id: string, location: location) => {
    const updatedLocation = await prisma.location.update({
        where: {
            id
        },
        data: {
            ...location
        }
    });
    if (!updatedLocation) {
        return null;
    } else {
        return updatedLocation;
    }
}

export const deleteLocation = async (id: string) => {
    const deletedLocation = await prisma.location.delete({
        where: {
            id
        }
    });
    if (!deletedLocation) {
        return null;
    } else {
        return deletedLocation;
    }
}
