import type { StolenCaseRecord } from "@/lib/registry/request-meta";
export type IncidentReview = {id:string;type:"STOLEN"|"MISSING";state:"PENDING_REVIEW"|"ACTIVE"|"RESOLVED";version:number;evidenceIds:string[];reportedAt:string;resolvedAt:string|null};
export type ReviewCommand = {incidentId:string;expectedVersion:number;reviewedEvidenceIds:string[];reviewNote:string;commandKey:string;recoveryEvidenceId?:string;reason?:"RECOVERED"|"NOT_SUBSTANTIATED"|"WITHDRAWN"|"CORRECTED"};
export function privateCaseProjection(v:StolenCaseRecord|null,i:IncidentReview|null):StolenCaseRecord|null {
 if(!v) return null;
 // Explicit allowlist; client props never include stored internal notes or actor identities.
 return {caseReference:v.caseReference,assetReference:v.assetReference,registrationReference:v.registrationReference,
  isStolen:i ? i.state === "ACTIVE" : v.isStolen,status:i ? i.state === "ACTIVE"?"open":i.state === "RESOLVED"?"resolved":"pending_review":v.status,
  previousRegistryStatus:v.previousRegistryStatus,previousMachineStatus:null,policeReportNumber:v.policeReportNumber,
  policeReportDate:v.policeReportDate,country:v.country,cityRegion:v.cityRegion,incidentDate:v.incidentDate,
  incidentDescription:v.incidentDescription,supportingDocumentReferences:[],caseNotes:null,createdBy:"",updatedBy:"",resolvedBy:null,
  resolvedAt:i?.resolvedAt ?? null,createdAt:i?.reportedAt ?? v.createdAt,updatedAt:v.updatedAt,evidenceFiles:[],policeReportFiles:[]};
}
