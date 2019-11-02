export interface SimulationDTO {
  coupon: string;
  dueDate: number;
  financedAmount: number;
  matrixCode: string;
  terms: number;
}
export interface PostProposalRequest {
  simulationDTO: SimulationDTO;
  uuid: string;
}
