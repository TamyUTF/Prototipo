export interface Planner {
    id: string;
    name: string;
    types: [string];
    charge: string;
    start: Date;
    end: Date;
    belongsTo: string;
    details: {
      description: string;
      involveds: [string],
      price: number
    };
}
