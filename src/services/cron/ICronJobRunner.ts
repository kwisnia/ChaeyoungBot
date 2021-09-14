export interface ICronJobRunner {
  runAllJobs(): Promise<void>;
}
