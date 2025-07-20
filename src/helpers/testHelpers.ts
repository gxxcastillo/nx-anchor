import { ExecutorContext } from '@nx/devkit';

export function getContextFixture(): ExecutorContext {
  const workspaceRoot = process.env.NX_WORKSPACE_ROOT
  const projectName = process.env.NX_TASK_TARGET_PROJECT;
  const projectRoot = '/';
  return {
    projectName,
    projectsConfigurations: {
      version: 123,
      projects: { [projectName]: { root: projectRoot } }
    },
    nxJsonConfiguration: {},
    projectGraph: { nodes: {}, dependencies: {} },
    root: workspaceRoot,
    cwd: process.cwd(),
    isVerbose: false,
  };  
}