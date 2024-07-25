import { ExecutorContext } from '@nx/devkit';
import { executeAnchorCommand } from '../../helpers';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BuildAnchorExecutorOptions {}

export default async function runExecutor(
  options: BuildAnchorExecutorOptions,
  context: ExecutorContext
) {
  return executeAnchorCommand({ command: 'build' }, context)
}