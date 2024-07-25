import { describe, it, expect, vi } from 'vitest';

import { executeAnchorCommand } from '../../helpers';
import { getContextFixture } from '../../helpers/testHelpers';
import { BuildExecutorSchema } from './schema';
import executor from './executor';

const options: BuildExecutorSchema = {};
const context = getContextFixture();

vi.mock('../../helpers', () => ({
  executeAnchorCommand: vi.fn()
}));

describe('Build Executor', () => {
  it('can build', async () => {
    // @TODO - this test will fail until I stub out "spawn"
    await executor(options, context);
    expect(executeAnchorCommand).toHaveBeenCalled();
  });
});
