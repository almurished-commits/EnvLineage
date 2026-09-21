export type SourceKind = 'code'|'template'|'dockerfile'|'compose'|'github-actions';
export type Relation = 'consumer'|'documentation'|'provider'|'interpolator'|'default'|'dynamic';
export type Requirement = 'required'|'defaulted'|'dynamic'|'unknown';
export type Severity = 'error'|'warning'|'info';
export interface Location { path:string; line:number; column:number }
export interface Observation { variable:string; source:SourceKind; relation:Relation; location:Location; context:string; requirement?:Requirement; detail?:string }
export interface Diagnostic { level:'warning'|'error'; code:string; message:string; location?:Location }
export interface Finding { id:'ENV001'|'ENV002'|'ENV003'|'ENV004'|'ENV005'; name:string; variable:string; severity:Severity; message:string; explanation:string; location:Location; related:Location[]; context:string; confidence:'high'|'medium'; fingerprint:string }
export interface VariableRecord { name:string; consumers:Observation[]; documentation:Observation[]; providers:Observation[]; observations:Observation[]; findings:Finding[]; analysisState:'resolved'|'partial'|'unknown' }
export interface ScanResult { schemaVersion:'1'; tool:{name:'envlineage';version:string}; scan:{root:string;status:'complete'|'partial';filesScanned:number}; variables:VariableRecord[]; findings:Finding[]; diagnostics:Diagnostic[]; summary:{errors:number;warnings:number;info:number} }
export interface ScanOptions { root:string; includeEnvFiles?:boolean }
