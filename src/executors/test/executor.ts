import { ExecutorContext } from '@nx/devkit';
import { executeAnchorCommand } from '../../helpers';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TestAnchorExecutorOptions {}

export default async function runExecutor(
  options: TestAnchorExecutorOptions,
  context: ExecutorContext
) {
  return executeAnchorCommand({ command: 'test' }, context)
}