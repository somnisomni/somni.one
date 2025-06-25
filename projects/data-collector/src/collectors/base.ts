import type { DataType, Prisma, PrismaClient } from "@prisma/client";

export default abstract class DataCollectorBase<TData> {
  /**
   * The minimum period (in seconds) before the next recollection is allowed.
   */
  public abstract readonly recollectMinimumPeriod: number;

  /**
   * The type of data being collected.
   */
  public abstract readonly dataType: DataType;

  /**
   * The unique identifier for the data being collected.
   */
  protected abstract get dataId(): string;

  /**
   * Get the existing data from the database.
   * @param db - The Prisma client instance.
   * @param where - Optional conditions to filter the data.
   * @returns A promise that resolves to the existing data (of type `TData`) or null if not found.
   */
  public async getExisting(db: PrismaClient, where?: Prisma.DataWhereInput): Promise<TData | null> {
    const existing = await db.data.findFirst({
      where: {
        ...where,
        dataType: this.dataType,
        dataId: this.dataId,
      },
    });

    if(!existing || !existing.data) {
      return null;
    }

    return JSON.parse(existing.data) as TData;
  }

  /**
   * Check if the data should be recollected.
   * @param db - The Prisma client instance.
   * @returns A promise that resolves to a boolean indicating whether the data should be recollected.
   */
  public async shouldRecollect(db: PrismaClient): Promise<boolean> {
    // Calculate the threshold date for recollection
    const dateThresholdToRecollect = new Date(Date.now() - (this.recollectMinimumPeriod * 1000));

    // Try to get the existing data entry with conditions
    const existing = await this.getExisting(db, {
      updatedAt: {
        gte: dateThresholdToRecollect,
      },
    });

    // If no existing data is found, data should be recollected
    return !existing;
  }

  /**
   * Collect, insert data into DB and return it.
   * @param db - The Prisma client instance.
   * @returns A promise that resolves to the collected data (of type `TData` which was successfully inserted into DB).
   */
  public abstract collect(db: PrismaClient): Promise<TData>;

  /**
   * Create or update data in the database.
   * @param db - The Prisma client instance.
   * @param data - The data to update (of type `TData`).
   * @returns A promise that resolves to the created/updated row entry.
   */
  protected async createOrUpdateData(db: PrismaClient, data: TData): Promise<ReturnType<typeof db.data.upsert> | null> {
    try {
      const updated = await db.data.upsert({
        where: {
          dataType: this.dataType,
          dataId: this.dataId,
        },
        create: {
          dataType: this.dataType,
          dataId: this.dataId,
          data: JSON.stringify(data),
        },
        update: {
          data: JSON.stringify(data),
        },
      });

      if(updated && updated.data) {
        return updated;
      }
    } catch(error) {
      console.error("Failed to create or update data in the database:", error);

      // Optionally, you can rethrow the error or handle it as needed
      throw error;
    }

    return null;
  }
}
