import { describe, it, expect, vi } from 'vitest';

import { getContextFixture } from '../../helpers/testHelpers';
import { executeAnchorCommand } from '../../helpers';
import { TestExecutorSchema } from './schema';
import executor from './executor';

const options: TestExecutorSchema = {};
const context = getContextFixture()

vi.mock('../../helpers', () => ({
  executeAnchorCommand: vi.fn()
}));

describe('Test Executor', () => {
  it('can run', async () => {
    // @TODO - this test will fail until I stub out "spawn"
    await executor(options, context);
    expect(executeAnchorCommand).toHaveBeenCalled();
  });
});
