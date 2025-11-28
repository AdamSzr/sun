// lib/geo-cord-manager.ts
import { GeoCord } from '@prisma/client'
import { prisma } from '@/lib/prisma';

export type GeoCordsPayload = Pick< GeoCord, 'pathId'|'lat'|'long' >



export class GeoCordManager {
  getAll() {
    return prisma.geoCord.findMany();
  }

  create({ pathId = 1, ...cords }: GeoCordsPayload) {
    return prisma.geoCord.create({
      data: {
        ...cords,
        path: { connect: { id: pathId} }, // zakładam, że zawsze do path id=1
      },
    });
  }

  deleteAll() {
    return prisma.geoCord.deleteMany();
  }

  delete(id: number) {
    return prisma.geoCord.delete({ where: { id } });
  }
}

export const geoCordManager = new GeoCordManager();
