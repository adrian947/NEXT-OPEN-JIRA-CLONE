interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData  = {
  entries: [
    {
      description: "pending: una linea",
      createdAt: Date.now(),
      status: "pending",
    },
    {
      description: "inProgress: dos lineas",
      createdAt: Date.now(),
      status: "inProgress",
    },
    {
      description: "Complete: tres lineas",
      createdAt: Date.now(),
      status: "complete",
    },
  ],
};
