export interface ShiftDto {
  idShift: number;
  userDocument: string | null;
  branchName: string;
  branchAddress: string;
  scheduledDateTime: Date;
  expirationTime: Date;
  isActive: boolean;
  dateAssociation: Date | null;
}