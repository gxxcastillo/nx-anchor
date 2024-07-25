import { ExecutorContext } from '@nx/devkit';
import { describe, it, expect } from 'vitest';

import { TestExecutorSchema } from './schema';
import executor from './executor';

const options: TestExecutorSchema = {};
const context: ExecutorContext = {
  projectName: 'pname',
  workspace: { 
    version: 123,
    projects: { pname: { root: 'proot'}} },
  root: '',
  cwd: process.cwd(),
  isVerbose: false,
};

describe('Test Executor', () => {
  it('can run', async () => {
    // @TODO - this test will fail until I stub out "spawn"
    const output = await executor(options, context);
    expect(output.success).toBe(true);
  });
});
