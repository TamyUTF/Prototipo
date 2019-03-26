export interface Planner {
    id: string;
    name: string;
    type: [string];
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
