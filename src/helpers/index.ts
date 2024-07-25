import { spawn } from 'node:child_process';
import { type ExecutorContext } from "@nx/devkit";

interface BuildAnchorExecutorOptions {
  command: 'build' | 'test'
}

export function executeAnchorCommand(options: BuildAnchorExecutorOptions, context: ExecutorContext) {
  return new Promise<{ success: boolean }>((resolve, reject) => {
    const projectName = context?.projectName;
    if (!projectName) {
      throw new Error('A projectName must be defined');
    }
  
    const projectRoot = context?.workspace?.projects[projectName].root;
    if (!projectName) {
      throw new Error('Unable to determine project root');
    }
  
    let output = '';
    const child = spawn('anchor', [options.command], { cwd: projectRoot, stdio: 'pipe' });

    process.stdout.setEncoding('utf8');
    child.stdout.on('data', (data) => {
      output += data.toString();
      process.stdout.write(data);
    });

    process.stderr.setEncoding('utf8');
    child.stderr.on('data', (data) => {
      output += data.toString();
      process.stderr.write(data);
    });
    
    child.on('close', (code) => {
      const failed = options.command === 'test' ? output.includes('fail') : output.includes('error');

      if (code === 0) {
        resolve({ success: true });
      } else if (failed) {
        resolve({ success: false });
      } else {
        resolve({ success: true });
      }
    });

    child.on('error', (error) => {
      reject(new Error(`"anchor ${options.command} Failed": ${error}`));
    });
  })  
}